const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const gulpLess = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const merge = require('merge2');
const del = require('del');
const through = require('through2');

const dist = path.join(__dirname, 'dist');
const esPath = path.join(dist, 'es');
const libPath = path.join(dist, 'lib');

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('less', () => {
    return gulp.src('src/**/*.less')
        .pipe(gulpLess({
            paths: [path.join(__dirname, 'src')],
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(esPath))
        .pipe(gulp.dest(libPath));
});

gulp.task('ts', () => {
    const result = gulp.src(['src/**/*.{tsx,ts}', './typings/*.d.ts'])
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
                    require.resolve('babel-plugin-inline-react-svg'),
                ]
            }))
            .pipe(tranformLess())
            .pipe(gulp.dest(esPath))
            .pipe(babel({
                presets: ['@babel/env']
            }))

            .pipe(gulp.dest(libPath))
    );
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('less', 'ts', 'pic')
));

function tranformLess() {
    return through.obj(function (file, encoding, next) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(content.replace(/\.less/g, '.css'));
        this.push(file);
        next();
    });
}
