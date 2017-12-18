var gulp         = require('gulp'),
    clean        = require('gulp-clean'),
    browserSync  = require('browser-sync'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    stylus       = require('gulp-stylus'),
    gutil        = require('gulp-util'),
    babelCore    = require("babel-core"),
    babel        = require('gulp-babel');

var config = {  
  srcPath: './src/',
  distPath: './dist/',
  srcPathWatch: './src/**/*',
  srcPathStylus: './src/stylus/css-quiz.min.styl',
  srcPathScripts: './src/scripts/**/*.js',
  srcPathCss: './src/css',
  srcPathJs: './src/js'
};
var paths = {
 styles: ['css/**/*.css'],
 html: ['index.html'],
 images: ['images/**/*.jpg'], 
};
gulp.task('copy', ['clean'], function(){
 gulp.src(paths.html, {cwd: config.srcPath})
     .pipe(gulp.dest(config.distPath));
 gulp.src(paths.styles, {cwd: config.srcPath})
     .pipe(gulp.dest(config.distPath + 'css'));
 gulp.src(paths.images, {cwd: config.srcPath})
     .pipe(gulp.dest(config.distPath + 'images'));
});
gulp.task('clean', function(){
 return gulp.src(config.distPath)
            .pipe(clean());
});
gulp.task('stylus', function () {
return gulp.src(config.srcPathStylus)
  .pipe(sourcemaps.init())
  .pipe(stylus({
    compress: true
  }))
  .pipe(autoprefixer({
    browsers : ['last 4 versions']
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.srcPathCss))
  .pipe(browserSync.reload({
    stream: true
   }));
});
gulp.task('minify-js', function () {
  gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('css-quiz.min.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('browserSync', function(){
 browserSync.init({
  server: {
   baseDir: config.srcPath
  },
  port: 8080,
  startPath: 'index.html'
 });
 gulp.watch(config.srcPathWatch).on('change', browserSync.reload);
 gulp.watch('./src/stylus/**/*.styl', ['stylus']);
 gulp.watch(config.srcPathScripts
  , ['minify-js']);
});
gulp.task('default', ['browserSync'], function() {});
gulp.task('prod', ['copy'], function() {});