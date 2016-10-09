var gulp = require('gulp');
var cache = require('gulp-cached');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var jpegtran = require('imagemin-jpegtran');
var optipng = require('imagemin-optipng');
var svgo = require('imagemin-svgo');

var production = require('../gulpfile');

gulp.task('images', function () {
	return gulp.src('site/src/images/*')
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(cache('images'))
		.pipe(gulpif(production, imagemin({
			use: [
				optipng(),
				svgo(),
				jpegtran({ progressive: true })
			]
		})))
		.pipe(gulp.dest('site/assets/images/'));
});
