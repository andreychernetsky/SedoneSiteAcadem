let gulp = require('gulp'),// Подключаем Gulp
  sass = require('gulp-sass'),//Подключаем Sass пакет,
  browserSync = require('browser-sync'), // Подключаем Browser Sync
  concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
  uglify = require('gulp-uglify'); // Подключаем gulp-uglifyjs (для сжатия JS)
  rename = require('gulp-rename');
  autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
  babel = require('gulp-babel');

  gulp.task('scss', function () {// Создаем таск Sass
    return gulp.src('app/scss/**/*.scss')// Берем источник
      .pipe(sass({outputStyle: 'compressed'})) //compressed, expanded
      .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
      .pipe(rename({suffix:'.min'}))// при сжатие добавляет min
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
  });

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', () =>
  gulp.src('app/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('js', function() {
  return gulp.src(['node_modules/slick-carousel/slick/slick.js','node_modules/magnific-popup/dist/jquery.magnific-popup.js'])
    .pipe(concat('libs.min.js'))//даем название сжатому файлу
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
  browserSync.init({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: 'app/' // Директория для сервера - app
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));// Наблюдение за sass файлами
  gulp.watch('app/*.html', gulp.parallel('html')); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('scss','js','browser-sync', 'watch'));

