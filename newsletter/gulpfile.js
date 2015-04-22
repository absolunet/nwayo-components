var gulp = require('gulp'),
	sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    // wrap = require('gulp-wrap'),
    nunjucksRender = require('gulp-nunjucks-render'),
	inlineCss = require('gulp-inline-css'),
    minifyHTML = require('gulp-minify-html'),
    runSequence = require('run-sequence');

// Clean
gulp.task('clean-tmp', function () {
    return gulp.src('.tmp')
        .pipe(clean());
});

// SASS
gulp.task('sass', function() {
    return gulp.src('sources/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('.tmp/css'));
});

// Create HTML files
// gulp.task('layout', function () {
// console.log(gulp.env.file);
//     return gulp.src(['sources/**/*.html', '!sources/_layout.html'])
//         .pipe(wrap({src: 'sources/_layout.html'}))
//         .pipe(gulp.dest('.tmp/'));
// });

gulp.task('layout', function () {
    nunjucksRender.nunjucks.configure(['sources']);
    return gulp.src(['sources/**/*.html', '!sources/_templates/**/*.html', '!sources/_partials/**/*.html'])
        .pipe(nunjucksRender())
        .pipe(gulp.dest('.tmp/'));
});

// Inline
gulp.task('inline', ['layout', 'sass'], function() {
    return gulp.src('.tmp/**/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('.tmp/'));
});

// Minify HTML
gulp.task('minify-html', ['inline'], function() {
    var opts = {
        conditionals: true,
        spare:true
    };

    return gulp.src('.tmp/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('build/'));
});

// Default Task
gulp.task('default', ['minify-html']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('sources/scss/*.scss', ['default']);
    gulp.watch('sources/**/*.html', ['default']);
});

