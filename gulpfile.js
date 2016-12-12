var gulp    = require('gulp')
var path    = require('path')
var less    = require('gulp-less')
var rename  = require('gulp-rename')
var uglify  = require('gulp-uglify')
var cssmin  = require('gulp-cssmin')
var clean   = require('gulp-clean')
var nodemon = require('gulp-nodemon')
var combine = require('gulp-magix-combine')

gulp.task('less', function() {
  return gulp.src('./app/public/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./app/public/css/'))
})

gulp.task('watch_less', function() {
  gulp.watch(['./app/public/less/*.less'], ['less'])
})

gulp.task('clean', function() {
  return gulp.src('./app/public/build', {read: false})
    .pipe(clean())
})

gulp.task('compress', ['clean', 'less'], function() {
  gulp.src('./app/public/app/views/**/*.js')
    .pipe(combine({
      magixVersion: 2.0
    }))
    .pipe(rename(function (path) {
      path.basename += "-min"
    }))
    .pipe(uglify({
      output:{ascii_only:true}
    }))
    .pipe(gulp.dest('./app/public/build/app/views'))

  gulp.src('./app/public/boot/*.js')
    .pipe(rename(function (path) {
      path.basename += "-min"
    }))
    .pipe(uglify({
      output:{ascii_only:true}
    }))
    .pipe(gulp.dest('./app/public/build/boot/'))

  gulp.src([
    './app/public/app/**/*.js', 
    '!./app/public/app/views/**/*.js'
  ])
    .pipe(rename(function (path) {
      path.basename += "-min"
    }))
    .pipe(uglify({
      output:{ascii_only:true}
    }))
    .pipe(gulp.dest('./app/public/build/app/'))

  gulp.src('./app/public/css/*.css')
    .pipe(rename(function (path) {
      path.basename += "-min"
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./app/public/build/css/'))

  gulp.src('./app/public/fonts/*')
    .pipe(gulp.dest('./app/public/build/fonts/'))
})

gulp.task('watch', [
  'less',
  'watch_less'
])

gulp.task('build', [
  'compress'
])