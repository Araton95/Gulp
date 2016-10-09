var gulp = require('gulp');
var plumber = require('gulp-plumber');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
	var spriteData =
		gulp.src('site/src/images/sprite/*') // путь, откуда берем картинки для спрайта
			.pipe(plumber({
				handleError: function (err) {
					console.log(err);
					this.emit('end');
				}
			}))
			.pipe(spritesmith({
				cssFormat:   'css',
				cssName:     'sprite.less',
				cssSelector: function (item) {
					return '.icon-' + item.name;
				},
				algorithm:   'binary-tree',
				imgName:     'sprite.png',
				imgPath:     '../images/sprite/sprite.png'
			}));

	spriteData.img.pipe(gulp.dest('site/assets/images/sprite')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('site/src/less/')); // путь, куда сохраняем стили
});
