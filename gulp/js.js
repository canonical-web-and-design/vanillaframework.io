'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';

const jsDestination = 'css';
const jsJenkinsDestination = '_site/js';
const jsSrc = '_js/**/*.js';

gulp.task('js:build', function () {
   return gulp.src(jsSrc)
       .pipe(gulp.dest(jsJenkinsDestination))
       .pipe(gulp.dest(jsDestination));
});

gulp.task('js:watch', ['js:build'], function()  {
   gulp.watch(jsSrc, ['js:build']);
});
