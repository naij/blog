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
  return gulp.src('./public/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'))
})

gulp.task('watch_less', function() {
  gulp.watch(['./public/less/*.less'], ['less'])
})

gulp.task('clean', function() {
  return gulp.src('./public/build', {read: false})
    .pipe(clean())
})

gulp.task('compress', ['clean', 'less'], function() {
  gulp.src('./public/app/views/**/*.js')
    .pipe(combine({
      magixVersion: 2.0
    }))
    .pipe(rename(function (path) {
      path.basename += "-min"
    }))
    .pipe(uglify({
      output:{ascii_only:true}
    }))
    .pipe(gulp.dest('./public/build/app/views'))

  gulp.src('./public/boot/*.js')
    .pipe(rename(function (path) {
      path.basename += "-min"
    }))
    .pipe(uglify({
      output:{ascii_only:true}
    }))
    .pipe(gulp.dest('./public/build/boot/'))

  gulp.src([
    './public/app/**/*.js', 
    '!./public/app/views/**/*.js'
  ])
    .pipe(rename(function (path) {
      path.basename += "-min"
    }))
    .pipe(uglify({
      output:{ascii_only:true}
    }))
    .pipe(gulp.dest('./public/build/app/'))

  gulp.src('./public/css/*.css')
    .pipe(rename(function (path) {
      path.basename += "-min"
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/build/css/'))

  gulp.src('./public/fonts/*')
    .pipe(gulp.dest('./public/build/fonts/'))
})

gulp.task('watch', [
  'less',
  'watch_less'
])

gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    ext: 'js html',
    ignore: [
      '.gitignore', 
      'readme.md', 
      'gulpfile.js', 
      'package.json', 
      'public/*',
      'tasks/*'
    ],
    execMap: {
      "js": "node --harmony"
    }
  })
})

gulp.task('server', [
  'watch',
  'nodemon'
])

gulp.task('build', [
  'compress'
])