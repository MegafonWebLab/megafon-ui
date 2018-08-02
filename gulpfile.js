const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const gulpLess = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const merge = require('merge2');
const del = require('del');

const dist = path.join(__dirname, 'dist', 'es');

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('less', () => {
    return gulp.src('src/**/*.less')
        .pipe(gulpLess({
            paths: [path.join(__dirname, 'src')],
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(dist))
});

gulp.task('ts', () => {
    const result = gulp.src(['src/**/*.{tsx,ts}', './typings/*.d.ts'])
        .pipe(ts({
            rootDir: './src',
            experimentalDecorators: true,
            jsx: 'preserve',
            moduleResolution: 'node',
            declaration: true
        }))

    return merge([
        result.dts.pipe(gulp.dest(dist)),
        result.js.pipe(babel({
            presets: [
                "env",
                "react"
            ]
        })).pipe(gulp.dest(dist))
    ]);
});

gulp.task('pic', () => {
    return gulp.src('src/**/*.{png,svg}')
        .pipe(gulp.dest(dist))
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('less', 'ts', 'pic')
));
