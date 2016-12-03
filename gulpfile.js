var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['react', 'watch'], function(){
  browserSync.init({
    server:{
      port:3000,
      baseDir:'./'
    }
  });
});

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('react', function () {
  return gulp.src([
    'src/*.jsx', 'src/**/*.jsx', 'src/**/**/*.jsx',
    'src/*.js', 'src/**/*.js', 'src/**/**/*.js'
  ])
  .pipe(babel({
    sourceMaps: 'inline',
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-es2015-modules-amd']
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
  gulp.watch([
    'src/*.jsx', 'src/**/*.jsx', 'src/**/**/*.jsx',
    'src/*.js', 'src/**/*.js', 'src/**/**/*.js'
  ], ['react', 'reload']);
});

gulp.task('default', ['serve']);
