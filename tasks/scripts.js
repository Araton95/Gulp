var gulp = require('gulp');
var cache = require('gulp-cached');
var remember = require('gulp-remember');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

var production = require('../gulpfile');

gulp.task('scripts', ['scripts.app', 'scripts.vendor']);

gulp.task('scripts.app', function () {
	return gulp.src([
		'site/src/js/utils/*.js',
		'site/src/js/Component.js',
		'site/src/js/Components/*.js',
		'site/src/js/Application.js'
	])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(cache('scripts'))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(remember('scripts'))
		.pipe(concat('app.js', { newLine: ';\n' }))
		.pipe(gulpif(production, uglify()))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('site/assets/js/'));
});

gulp.task('scripts.vendor', function () {
	return gulp.src([
		'site/src/vendor/jquery-1.11.3.js',
		'site/src/vendor/moment.min.js',
		'site/src/vendor/*.js'
	])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(concat('vendor-bundle.js', { newLine: ';\n' }))
		.pipe(gulpif(production, uglify()))
		.pipe(gulp.dest('site/assets/js/'));
});
