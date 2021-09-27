const fs = require('fs');
const glob = require('glob');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const gulpLess = require('gulp-less');
const imagemin = require('gulp-imagemin');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const merge = require('merge2');
const del = require('del');
const through = require('through2');
const svgr = require('@svgr/core').default;

const dest = gulp.dest;

const dist = path.join(__dirname, 'dist');
const esPath = path.join(dist, 'es');
const libPath = path.join(dist, 'lib');
const srcPath = path.join(__dirname, 'src');
const indexTs = path.join(srcPath, 'index.ts');

const doczReg = 'src/**/*.docz.{tsx,ts}';
const testsReg = 'src/**/*.test.{tsx,ts}';
const typesReg = 'src/**/types.ts';

/**
 * CONFIG
 */
const lessConfig = { paths: [srcPath], plugins: [autoprefix] };
const tsConfig = {
    baseUrl: './src',
    noUnusedParameters: true,
    noUnusedLocals: true,
    strictNullChecks: true,
    target: 'es6',
    jsx: 'preserve',
    moduleResolution: 'node',
    declaration: true,
    allowSyntheticDefaultImports: true
};
const babelEsConfig = {
    presets: [
        '@babel/react',
        ['@babel/env', {
            modules: false,
            useBuiltIns: 'usage',
            corejs: '3.6'
        }]
    ],
    plugins: [
        '@babel/plugin-transform-object-assign',
        '@babel/plugin-transform-runtime',
        ['module-resolver', {
            root: ['./src'],
            alias: {
                constants: './src/constants'
            }
        }],
    ]
};
const babelLibConfig = {
    presets: [
        ['@babel/env', {
            modules: 'commonjs'
        }]
    ]
};

/**
 * Tasks
 */
gulp.task('clean', () => del('dist'));
gulp.task('clean:index', () => del('src/index.ts'));

gulp.task('image', () => {
    return gulp
        .src('src/**/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest(esPath))
        .pipe(gulp.dest(libPath));
});

gulp.task('less', () => {
    return gulp
        .src('src/**/*.less')
        .pipe(replaceContent(/\~@megafon/g, '@megafon'))
        .pipe(gulpLess(lessConfig))
        .pipe(dest(esPath))
        .pipe(dest(libPath));
});

gulp.task('ts', () => {
    const result = gulp
        .src([
            'src/**/*.{tsx,ts}',
            `!${doczReg}`,
            `!${testsReg}`,
            './typings/*.d.ts'
        ])
        .pipe(ts(tsConfig));

    return merge(
        result.dts.pipe(dest(esPath)).pipe(dest(libPath)),
        result.js
        .pipe(inlineSvgToReact())
        .pipe(babel(babelEsConfig))
        .pipe(replaceContent(/\.less/g, '.css'))
        .pipe(dest(esPath))
        .pipe(removeCss())
        .pipe(babel(babelLibConfig))
        .pipe(dest(libPath))
    );
});

gulp.task('main', done => {
    const files = glob.sync('src/components/**/*.{tsx,ts}', {
        ignore: [testsReg, doczReg, typesReg]
    });
    fs.writeFile(indexTs, generateIndex(files), done);
});

gulp.task(
    'build',
    gulp.series(
        gulp.parallel('clean', 'clean:index'),
        'main',
        gulp.parallel('ts', 'less', 'image'),
        'clean:index'
    )
);

/**
 * Helpers
 */
const generateIndex = files => {
    const components = files.map(file => {
        const parsed = path.parse(file);
        return {
            path: file.replace('src/', './'),
            name: parsed.name,
            ext: parsed.ext
        }
    });
    const collator = new Intl.Collator();
    const sorted = components.sort((a, b) => collator.compare(a.name, b.name));
    const imports = sorted.map(({ name, path: cPath, ext }) => {
        return `export { default as ${name} } from '${cPath.replace(
            ext,
            ""
        )}';`;
    });

    return `${imports.join("\n")}`;
};

const changePipe = fn =>
    through.obj(async function(file, encoding, next) {
        await fn.call(this, file, encoding);
        next();
    });

const replaceContent = (regExp, newStr) =>
    changePipe(function(file, encoding) {
        const content = file.contents.toString(encoding);

        file.contents = Buffer.from(content.replace(regExp, newStr));
        this.push(file);
    });

const inlineSvgToReact = () => changePipe(async function (file, encoding) {
    const regExpSvg = /(?<key>import)\s+(?:(?:\s*(?<alias>[\w\r\n\t,{}\s\* ]+)\s*)\s*from)?\s*(?:["']?(?<ref>[@\w\s\\\/\-\.]+\.svg)["']?)/gi;
    const regExpImport = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
    const svgImports = file.contents.toString(encoding).match(regExpSvg);
    let components = '';

    if (Array.isArray(svgImports) && svgImports.length) {
        for (const svgImport of svgImports) {
            const [importName, importPath] = svgImport.split('from');
            const svgImportPath = importPath.replace(/'/g, '').trim();
            const componentName =  importName.replace('import', '').trim();

            let absolutePath;
            if (/^\.\//g.test(svgImportPath)) {
                absolutePath = path.resolve(path.dirname(file.path), svgImportPath);
            } else {
                absolutePath = require.resolve(svgImportPath);
            }

            const data = fs.readFileSync(absolutePath);
            let code;

            try {
                code = await svgr(data, {
                    svgo: true,
                    svgoConfig: {
                        plugins: [
                            {
                                prefixIds: {
                                    prefix: componentName
                                }
                            }
                        ]
                    },
                }, { componentName });

            } catch (e) {
                throw new Error(e)
            }

            components += code.replace(/import React from ['|"]react['|"];/g, '').replace(`export default ${componentName};`, '');
            file.contents = Buffer.from(file.contents.toString(encoding).replace(`${svgImport};`, ''));
        }

        const imports = file.contents.toString(encoding).match(regExpImport);
        const indexToPaste = file.contents.toString(encoding).lastIndexOf(imports[imports.length - 1]) + imports[imports.length - 1].length;

        file.contents = Buffer.from(`${file.contents.toString(encoding).slice(0, indexToPaste)}\n${components}${file.contents.toString(encoding).slice(indexToPaste)}`);
    }

    this.push(file)
});

const removeCss = () =>
    changePipe(function(file, encoding) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(
            content
            .split("\n")
            .filter(c => c.search('.css') === -1)
            .join("\n")
        );
        this.push(file);
    });
