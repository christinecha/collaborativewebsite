var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require("gulp-util")
var webpack = require("webpack")
var webpackConfig = require("./webpack.config.js")
var stream = require('webpack-stream')
var less = require('gulp-less')

var path = {
  HTML: './index.html',
  SCRIPTS: ['src/**/*.js'],
  STYLES: ['src/**/*.less'],
  DEST: './dist'
}

gulp.task('webpack', [], function() {
    return gulp.src(path.SCRIPTS)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfig))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST))
})

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.STYLES ]
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function() {
    gulp.watch(path.SCRIPTS, ['webpack'])
    gulp.watch(path.STYLES, ['less'])
})
