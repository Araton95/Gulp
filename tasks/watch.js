var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function () {
	var server = livereload();

	gulp.watch('site/src/js/*.js', ['scripts.app']);
	gulp.watch('site/src/vendor/*.js', ['scripts.vendor']);
	gulp.watch('site/src/images/*', ['images']);
	gulp.watch('site/src/images/sprite/*', ['sprite']);
	gulp.watch('site/src/less/*.less', ['styles']);
});
