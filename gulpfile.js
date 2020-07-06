const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');


gulp.task('sassToCSS', function(){
  return gulp.src('www/scss/*.scss')
  .pipe(sass({
    errorLogToConsole: true
  }))
  .on('error', console.error.bind(console))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 20 versions'],
    cascade: false
  }))
  .pipe(cleancss())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest('public/css'));
});


gulp.task('clone', function(){
  return gulp.src('www/index.html')
  .pipe(gulp.dest('public/'));
});

gulp.task('minifyjs', function(){
  return pipeline(
    gulp.src('www/js/*.js'),
    uglify(),
    gulp.dest('public/js/')
  );
});

gulp.task('delete-files', function(){
  return del('public/css/*.*')
});

gulp.task('service', function(){
  browserSync.init({
    server: 'public',
    server : {
            baseDir : 'public/',
            index : 'index.html'
        }
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch-files', function(){
  gulp.watch('www/scss/*.scss', gulp.series('sassToCSS'));
  gulp.watch('www/js/*.js', gulp.series('minifyjs'));
// gulp.watch('www/*.html', gulp.series('clone'));
})

//gulp.task('build', gulp.series('delete-files',  'minifycss', 'minifyjs'));

gulp.task('default', gulp.series(gulp.parallel('watch-files', 'service')));
