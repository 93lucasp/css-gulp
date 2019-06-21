const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

gulp.task('css', function (cb) {
    return gulp.src('./src/assets/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename(function(path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('./public/assets/css/'))
        .pipe(browserSync.stream());
})
gulp.task('html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./public/'));
})
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    })
})

gulp.watch('./src/assets/css/**/*.scss', gulp.task('css'));
gulp.watch('./src/*.html', gulp.task('html')).on('change', browserSync.reload);


gulp.task('build', gulp.parallel('css', 'html', 'serve'));