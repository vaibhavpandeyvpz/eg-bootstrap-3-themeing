const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver');

/**
 * @desc Compiles LESS -> CSS
 */
gulp.task('css', () => {
    return gulp.src('source/less/bootstrap.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(gulp.dest('wwwroot/css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('wwwroot/css'));
});

/**
 * @desc Builds/assembles all static assets
 */
gulp.task('default', ['css', 'fonts', 'js']);

/**
 * @desc Copies bootstrap fonts to web root
 */
gulp.task('fonts', () => {
    return gulp.src('bower_components/bootstrap/fonts/*')
        .pipe(gulp.dest('wwwroot/fonts'));
});

/**
 * @desc Copy bootstrap *.js files to web root
 */
gulp.task('js', () => {
    let src = [
        'bower_components/jquery/dist/jquery*js',
        'bower_components/bootstrap/dist/js/bootstrap*js',
    ];
    return gulp.src(src)
        .pipe(gulp.dest('wwwroot/js'));
});

/**
 * @desc Watches *.less files for changes
 */
gulp.task('watch', () => gulp.watch('source/less/*.less', ['css']));

/**
 * @desc Runs the development webserver
 */
gulp.task('server', ['default'], () => {
    return gulp.src('wwwroot')
        .pipe(webserver());
});
