'use strict';

import gulp from 'gulp';

import './gulp/sass';


gulp.task('help', () => {console.log(`
  test   - Run linting and tests
  watch  - Watch sass files
  build  - Build website and dependencies for production
`);});

gulp.task('test', [
  'sass:lint',
]);

gulp.task('watch', [
  'sass:watch',
]);

gulp.task('build', [
  'sass:build',
]);

gulp.task('default', ['help']);

