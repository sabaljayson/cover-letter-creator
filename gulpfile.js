var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    fileinclude = require('gulp-file-include');

// styles - compile SASS, autoprefixer, minify
gulp.task('styles', function() {
    gulp.src('src/assets/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('target/assets/styles'))
        .pipe(livereload());
});

// scripts - JS hint, concat, minify
gulp.task('scripts', function() {
    gulp.src([
            './src/assets/scripts/lib/jquery.js',
            './src/assets/scripts/lib/*.js',
            './src/assets/scripts/src/*.js'
        ])
        .pipe(jshint.reporter('jshint-summary', {
            verbose: true,
            reasonCol: 'blue,bold',
            positionCol: 'grey',
            statistics: true
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('target/assets/scripts'))
        .pipe(livereload());
    gulp.src('./src/assets/scripts/lib/modernizr.js')
        .pipe(gulp.dest('target/assets/scripts'));
});

// fonts
gulp.task('fonts', function() {
    gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('target/assets/fonts'));
});

// templates
gulp.task('templates', function() {
    gulp.src('src/templates/**/*')
        .pipe(gulp.dest('target/templates'));
});

// images - compress images
gulp.task('images', function() {
    gulp.src('src/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('target/assets/images'));
});

// copyfiles - re-copy any changed files to dest directory
gulp.task('copyfiles', function() {
    gulp.src('./src/**/*.{html,php,txt,xml}')
        .pipe(changed('target'))
        .pipe(gulp.dest('target'))
        .pipe(livereload());
});

// clean - remove generated files
gulp.task('clean', function(cb) {
    del(['target/*'], cb);
});

// watch - watch for changes, livereload accordingly
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/assets/images/**/*.{png,jpg,gif}', ['images']);
    gulp.watch('src/assets/styles/**/*.scss', ['styles']);
    gulp.watch('src/assets/scripts/**/*.js', ['scripts']);
    gulp.watch('./src/**/*.{html,php,txt}', ['copyfiles']);
});

// dev - do not minify anything, watch
gulp.task('dev', ['clean'], function() {
    gulp.start('styles', 'scripts', 'copyfiles', 'images', 'templates', 'fonts', 'watch');
});

// default - build for production
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'copyfiles', 'images', 'templates', 'fonts');
});