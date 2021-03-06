# Default project constructor with Gulp

Gulp.js это потоковый сборщик проектов на JS.

## Установка
    npm install

## Работа
- `npm install` - install node_modules
- `npm -g install gulp` -  install gulp
- `gulp` - запускает сначала `clean`, а затем `build`.
- `gulp clean` - очищает директорию assets.
- `gulp build` - собирает проект.
- `gulp watch` - отслеживает изменения в исходных файлах и применяет их.

Выполнение с ключем `--production` запустит использование оптимизаторов и минификаторов.

## Плагины
- **gulp-plumber** - позволяет выводить информацию об ошибке не прерывая отслеживание изменений.
- **gulp-concat** - склеивает файлы.
- **gulp-sourcemaps** - генерирует *.map файл который используется при отладке скриптов.
- **gulp-less** - для компилирования LESS.
- **gulp-autoprefixer** - добавляет браузерные префиксы.
- **gulp-csso** - (CSS Optimizer) является минимизатором CSS.
- **gulp-uglify** - минификатор Java Script.
- **gulp-babel** - транслятор из ES6 в ES5.
- **gulp-imagemin** - оптимизирует PNG, JPEG, GIF и SVG изображения.
- **gulp.spritesmith** - сборщик спрайтов.
