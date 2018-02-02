var gulp = require('gulp');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');

gulp.task('connect', function() {
	connect.server({
		root: './dist',
		livereload: true,
		port: 8080
	});
});

gulp.task('html', function() {
	return gulp.src('./src/index.html')
	.pipe(gulp.dest('./dist/'))
	.pipe(connect.reload());
});

gulp.task('js', function() {
	return gulp.src('./src/js/main.js')
	.pipe(gulp.dest('./dist/js'))
	.pipe(connect.reload());
});

gulp.task('stylusToCss', function() {
	return gulp.src('./src/stylus/index.styl')
	.pipe(stylus())
	.pipe(gulp.dest('./dist/styles/'));
});

gulp.task('images', function() {
	return gulp.src('./src/images/*.{png,jpg,jpeg}')
	.pipe(gulp.dest('./dist/images/'));
});

gulp.task('watch', function() {
	gulp.watch(['./src/*.html'], ['html']);
	gulp.watch(['./src/stylus/*.styl'], ['stylusToCss']);
	gulp.watch(['./src/js/main.js'], ['js']);
});

gulp.task('default', ['html','js', 'stylusToCss', 'images', 'connect', 'watch']);