const gulp = require('gulp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const gulpLess = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const merge = require('merge2');
const del = require('del');
const through = require('through2');
const svgr = require('@svgr/core').default;

const dist = path.join(__dirname, 'dist');
const esPath = path.join(dist, 'es');
const libPath = path.join(dist, 'lib');

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('clean:index', () => {
    return del('src/index.ts');
});

gulp.task('svg', () => {
    return gulp.src('src/**/*.svg')
        .pipe(svgToReact())
        .pipe(gulp.dest(esPath))
        .pipe(gulp.dest(libPath));
});

gulp.task('less', () => {
    return gulp.src('src/**/*.less')
        .pipe(importLessGulp())
        .pipe(gulpLess({
            paths: [path.join(__dirname, 'src')],
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(esPath))
        .pipe(gulp.dest(libPath));
});

gulp.task('ts', () => {
    const result = gulp.src(['src/**/*.{tsx,ts}', '!src/**/*.test.{tsx,ts}', './typings/*.d.ts'])
        .pipe(ts({
            rootDir: './src',
            noUnusedParameters: true,
            noUnusedLocals: true,
            strictNullChecks: true,
            target: 'es6',
            jsx: 'preserve',
            moduleResolution: 'node',
            declaration: true,
            allowSyntheticDefaultImports: true,
        }))

    return merge(
        result.dts
            .pipe(gulp.dest(esPath))
            .pipe(gulp.dest(libPath)),
        result.js
            .pipe(babel({
                presets: [
                    '@babel/react'
                ],
                plugins: [
                    require.resolve('@babel/plugin-transform-object-assign'),
                    require.resolve('@babel/plugin-proposal-class-properties'),
                    require.resolve('@babel/plugin-proposal-object-rest-spread'),
                    require.resolve('@babel/plugin-transform-runtime'),
                    require.resolve('@babel/plugin-transform-classes'),
                    require.resolve('@babel/plugin-transform-block-scoping'),
                    ['module-resolver', {
                        root: './src'
                    }],
                    require.resolve('babel-plugin-inline-react-svg'),
                ]
            }))
            .pipe(tranformLess())
            .pipe(gulp.dest(esPath))
            .pipe(removeCss())
            .pipe(babel({
                presets: [
                    ["@babel/env", {
                        "useBuiltIns": "entry"
                    }]
                ]
            }))
            .pipe(gulp.dest(libPath))
    );
});

gulp.task('main', done => {
    const files = glob.sync('src/components/**/*.{tsx,ts}', {
        ignore: 'src/**/*.test.{tsx,ts}'
    });

    fs.writeFile(path.join(__dirname, 'src', 'index.ts'), generateIndex(files), err => {
        if (err) {
            throw err;
        }

        done();
    });
});

gulp.task('build', gulp.series(
    gulp.parallel('clean', 'clean:index'),
    'main',
    gulp.parallel('ts', 'less', 'svg'),
    'clean:index'
));

function generateIndex(files) {
    const ext = '.tsx';
    const components = files.map(file => {
        return {
            path: file.replace('src/', './'),
            name: path.basename(file, ext)
        }
    });
    const collator = new Intl.Collator();
    const sorted = components.sort((a, b) => collator.compare(a.name, b.name));
    const imports = sorted.map(component => {
        return `export { default as ${component.name} } from '${component.path.replace(ext, '')}';`;
    });

    return `${imports.join('\n')}`;
}

function tranformLess() {
    return through.obj(function (file, encoding, next) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(content.replace(/\.less/g, '.css'));
        this.push(file);
        next();
    });
}

function importLessGulp() {
    return through.obj(function (file, encoding, next) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(content.replace(/\~styles/g, 'styles'));
        this.push(file);
        next();
    });
}

function svgToReact() {
    return through.obj(function (file, encoding, next) {
        const content = file.contents.toString(encoding);
        const name = path.basename(file.path, '.svg')
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join('');

        svgr(content, { icon: true }, { componentName: `${name}Svg` }).then(jsCode => {
            file.contents = Buffer.from(jsCode);
            file.path = file.path.replace(/.svg/, '.js');
            this.push(file);
            next();
        });
    });
}

function removeCss() {
    return through.obj(function (file, encoding, next) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(
            content.split('\n').filter(c => c.search('.css') === -1).join('\n')
        );
        this.push(file);
        next();
    });
}
