var gulp = require('gulp'),
	sass = require('gulp-sass'),
	inlineCss = require('gulp-inline-css');

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('raw/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('raw/css'));
});

gulp.task('inline', ['sass'], function() {
    return gulp.src('raw/newsletter.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('build/'));
});

gulp.task('letter', function() {
	return 'a';
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
// gulp.task('letter', ['sass', 'inlineCss']);
