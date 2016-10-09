var gulp = require('gulp');
var cache = require('gulp-cached');
var plumber = require('gulp-plumber');

gulp.task('fonts', function () {
    return gulp.src('site/src/fonts/**/*')
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(cache('fonts'))
        .pipe(gulp.dest('site/assets/fonts'));
});
