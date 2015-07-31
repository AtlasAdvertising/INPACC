var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    ftp = require('gulp-ftp'),
    rename = require('gulp-rename');

// defines path to sass
var sassRoot = 'build/scss/';

// compile Sass to CSS
gulp.task('sass-to-css', function () {
    return gulp.src(sassRoot + 'main.scss')
        //.pipe(sass())		// non-compressed
        .pipe(sass({
            style: 'compressed'
        })) // compressed
        //.pipe(prefix("last 3 versions"))		// non-compressed
        .pipe(rename({
            suffix: '.min'
        })) // compressed
        .pipe(gulp.dest('public/css'));
});

// CSS ftp task
//gulp.task('ftp-css', ['sass-to-css'], function () {
//    return gulp.src('public/css/*')
//        .pipe(ftp({
//            host: '66.241.194.6',
//            user: 'craigs',
//            pass: 'aacraigs',
//            remotePath: 'INPACC/css'
//        }));
//});


gulp.task('ftp-css', ['sass-to-css'], function () {
    return gulp.src('public/css/*')
        .pipe(ftp({
            host: '66.241.194.6',
            user: 'cshannon',
            pass: 'aacraigs',
            remotePath: 'INPACC/css'
        }));
});


// watch
gulp.task('watch', function () {
    // what to watch
    gulp.watch('build/scss/*.scss', ['ftp-css']);
});