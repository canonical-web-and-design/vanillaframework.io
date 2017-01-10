var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
 gulp.task('jekyll-develop', function (done) {
     browserSync.notify(messages.jekyllBuild);
     return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
         .on('close', done);
 });

gulp.task('jekyll-build', function (done) {
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-develop'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass-develop', 'js-develop', 'jekyll-develop'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss
 */
gulp.task('sass-develop', function () {
    return gulp.src('_sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass-build', function () {
    return gulp.src('_sass/main.scss')
        .pipe(sass({
            includePaths: ['scss']
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssmin({
          keepSpecialComments: 0
        }))
        .pipe(gulp.dest('_site/css'));
});

/**
 * Compile files from _js
 */
gulp.task('js-develop', function () {
  var bundler = browserify({
    entries: '_js-es6/app.js',
    debug: true
  });
  bundler.transform(babelify);

  bundler.bundle()
    .on('error', function (err) { console.error(err); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js-build', function () {
  var bundler = browserify({
    entries: '_js-es6/app.js',
    debug: true
  });
  bundler.transform(babelify);

  bundler.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('_site/js'))
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(['_js-es6/**/*.js'], ['js-develop']);
  gulp.watch(['_sass/**/*.scss'], ['sass-develop']);
  gulp.watch(['**/*.html', '**/*.markdown', '**/*.md'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

/**
 * Gulp 'build' task which is used to build the site on the production box.
 */
gulp.task('build', ['jekyll-build', 'sass-build', 'js-build']);
