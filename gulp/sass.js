'use strict';

import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';


const sassAutoprefixVersions = ['last 15 versions', '> 1%', 'ie 8', 'ie 7'];
const sassAutoprefixOptions = { cascade: true };
const sassDestination = 'css';
const sassJenkinsDestination = '_site/css';
const sassMapsPath = './maps';
const sassOptions = {
    includePaths: ['scss', 'node_modules'],
};
const sassSrcBuild = '_sass/main.scss';
const sassSrc = '_sass/**/*.scss';


function throwSassError(sassError) {
  throw new gutil.PluginError({
    plugin: 'sass',
    message: util.format(
      "Sass error: '%s' on line %s of %s",
      sassError.message,
      sassError.line,
      sassError.file
    )
  });
}

gulp.task('sass:build', function () {
   return gulp.src(sassSrcBuild)
       .pipe(sourcemaps.init())
       .pipe(sass(sassOptions))
       .pipe(autoprefixer(sassAutoprefixVersions, sassAutoprefixOptions))
       .pipe(sourcemaps.write(sassMapsPath))
       .pipe(gulp.dest(sassJenkinsDestination))
       .pipe(gulp.dest(sassDestination));
});

gulp.task('sass:lint', () => {
  return gulp.src(sassSrc)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('sass:watch', ['sass:build'], function()  {
   gulp.watch(sassSrc, ['sass:build']);
});
