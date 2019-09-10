const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    purgecss = require('gulp-purgecss'),
    browserSync = require('browser-sync').create();

function css() {
    return gulp.src('./src/assets/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(
            purgecss({
                content: ['public/**/*.html']
            })
        )
        .pipe(gulp.dest('./public/assets/css/'))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./public/'));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    })
}

gulp.watch('./src/assets/css/**/*.scss', css);
gulp.watch('./src/*.html', html).on('change', browserSync.reload);

exports.default = gulp.parallel(html, css, serve);