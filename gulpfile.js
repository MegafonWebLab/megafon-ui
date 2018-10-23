const fs = require('fs');
const glob = require('glob');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const gulpLess = require('gulp-less');
const svgmin = require('gulp-svgmin');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const merge = require('merge2');
const del = require('del');
const through = require('through2');
const svgr = require('@svgr/core').default;
const babelCore = require('@babel/core');

const sep = path.sep;
const dest = gulp.dest;

const dist = path.join(__dirname, 'dist');
const esPath = path.join(dist, 'es');
const libPath = path.join(dist, 'lib');
const srcPath = path.join(__dirname, 'src');
const iconsPath = path.join(srcPath, 'icons');
const indexTs = path.join(srcPath, 'index.ts');

const testsReg = 'src/**/*.test.{tsx,ts}';
const iconsReg = 'src/**/Icons.{tsx,ts}';

/**
 * CONFIG
 */
const lessConfig = { paths: [srcPath], plugins: [autoprefix] };
const tsConfig = {
    rootDir: './src',
    noUnusedParameters: true,
    noUnusedLocals: true,
    strictNullChecks: true,
    target: 'es6',
    jsx: 'preserve',
    moduleResolution: 'node',
    declaration: true,
    allowSyntheticDefaultImports: true,
};
const babelPlugins = [
    require.resolve('@babel/plugin-transform-object-assign'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-transform-runtime'),
    require.resolve('@babel/plugin-transform-classes'),
    require.resolve('@babel/plugin-transform-block-scoping')
];
const babelPresets = [
    '@babel/react',
    ['@babel/env', {
        useBuiltIns: 'entry'
    }]
];
const babelEsConfig = {
    presets: [
        '@babel/react',
        ['@babel/env', {
            modules: false,
            'useBuiltIns': 'entry'
        }]
    ],
    plugins: [
        ...babelPlugins,
        ['module-resolver', {
            root: './src'
        }],
        require.resolve('babel-plugin-inline-react-svg')
    ]
};
const babelLibConfig = {
    presets: [
        ['@babel/env', {
            useBuiltIns: 'entry'
        }]
    ]
};

/**
 * Tasks
 */
gulp.task('clean', () => del('dist'));
gulp.task('clean:index', () => del('src/index.ts'));

gulp.task('svg', () => {
    return gulp.src('src/**/*.svg')
        // .pipe(svgmin(svgoStylesToAttr))
        .pipe(svgmin(file => getSvgrConfig(file.path).svgoConfig))
        .pipe(svgToReact())
        .pipe(dest(dist));
});

gulp.task('less', () => {
    return gulp.src('src/**/*.less')
        .pipe(replaceContent(/\~styles/g, 'styles'))
        .pipe(gulpLess(lessConfig))
        .pipe(dest(esPath))
        .pipe(dest(libPath));
});

gulp.task('ts', () => {
    const result = gulp.src(['src/**/*.{tsx,ts}', `!${testsReg}`, `!${iconsReg}`, './typings/*.d.ts'])
        .pipe(ts(tsConfig))

    return merge(
        result.dts
            .pipe(dest(esPath))
            .pipe(dest(libPath)),
        result.js
            .pipe(babel(babelEsConfig))
            .pipe(replaceContent(/\.less/g, '.css'))
            .pipe(dest(esPath))
            .pipe(removeCss())
            .pipe(babel(babelLibConfig))
            .pipe(dest(libPath))
    );
});

gulp.task('main', done => {
    const files = glob.sync('src/components/**/*.{tsx,ts}', { ignore: testsReg });
    fs.writeFile(indexTs, generateIndex(files), done);
});

gulp.task('build', gulp.series(
    gulp.parallel('clean', 'clean:index'),
    'main',
    gulp.parallel('ts', 'less', 'svg'),
    'clean:index'
));

/**
 * Helpers
 */
const generateIndex = files => {
    const ext = '.tsx';
    const components = files.map(file => ({
        path: file.replace('src/', './'),
        name: path.basename(file, ext)
    }));
    const collator = new Intl.Collator();
    const sorted = components.sort((a, b) => collator.compare(a.name, b.name));
    const imports = sorted.map(({ name, path: cPath }) => {
        return `export { default as ${name} } from '${cPath.replace(ext, '')}';`;
    });

    return `${imports.join('\n')}`;
};

const changePipe = fn => through.obj(async function (file, encoding, next) {
    await fn.call(this, file, encoding);
    next();
});

const replaceContent = (regExp, newStr) => changePipe(function (file, encoding) {
    const content = file.contents.toString(encoding);

    file.contents = Buffer.from(content.replace(regExp, newStr));
    this.push(file);
});

const svgToReact = () => changePipe(async function (file, encoding) {
    const name = file.path
        .replace(iconsPath + sep, '')
        .toLowerCase()
        .replace('.svg', '')
        .replace(new RegExp(sep, 'g'), '-')
        .replace(/[^a-z0-9-]+/g, '_');

    const jsFile = await generateEs6js(file, encoding, name);
    const moduleFile = generateModulejs(jsFile, encoding, name);
    const packageJson = generatePackageJson(file, name);

    file.path = `${iconsPath}${sep}${name}.svg`;

    this.push(file);
    this.push(jsFile);
    this.push(moduleFile);
    this.push(packageJson);
});

const generateEs6js = async (file, encoding, name) => {
    const jsFile = file.clone();
    const content = file.contents.toString(encoding);
    const svgrAttrs = [content, getSvgrConfig(file.path), { componentName: `Svg${getComponentName(file.path)}` }];
    const jsCode = await svgr(...svgrAttrs);

    jsFile.contents = Buffer.from(jsCode);
    jsFile.path = `${getIconFolder(name)}index.es6.js`;

    return jsFile;
};

const generateModulejs = (jsFile, encoding, name) => {
    const file = jsFile.clone();
    const content = file.contents.toString(encoding);
    const babelOptions = { presets: babelPresets, plugins: babelPlugins };
    const jsModuleCode = babelCore.transformSync(content, babelOptions);

    file.contents = Buffer.from(jsModuleCode.code);
    file.path = `${getIconFolder(name)}index.module.js`;

    return file;
};

const generatePackageJson = (file, name) => {
    const packageJson = file.clone();
    packageJson.contents = Buffer.from(JSON.stringify({ main: './index.es6.js', module: './index.module.js' }));
    packageJson.path = `${getIconFolder(name)}package.json`;

    return packageJson;
};

const getIconFolder = name => `${iconsPath}${sep}${name}${sep}`;

const removeCss = () => changePipe(function (file, encoding) {
    const content = file.contents.toString(encoding);
    file.contents = Buffer.from(
        content.split('\n').filter(c => c.search('.css') === -1).join('\n')
    );
    this.push(file);
});

const getSvgrConfig = filePath => ({
    icon: true,
    svgoConfig: {
        plugins: [{
            cleanupIDs: { prefix: `svg-${path.basename(filePath, '.svg')}` },
        },
        {
            inlineStyles: { onlyMatchedOnce: false }
        }]
    }
});

const svgoStylesToAttr = () => ({
    plugins: [{
        inlineStyles: { onlyMatchedOnce: false },
    }]
});

const getComponentName = filePath => {
    return path.basename(filePath, '.svg')
        .replace('+', '-')
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join('');
};
