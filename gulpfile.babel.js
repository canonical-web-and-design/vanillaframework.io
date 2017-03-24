'use strict';

import gulp from 'gulp';

import './gulp/browser-sync';
import './gulp/github-pages';
import './gulp/jekyll';
import './gulp/js';
import './gulp/sass';


gulp.task('help', () => {console.log(`
  lint   - Run linting tasks
  test   - Run linting and tests
  watch  - Watch sass files
  serve  - Start dev server (Do not watch assets)
  develop - Watch assets and start dev server
  browser-sync - Start browser-sync server
  build  - Build website and dependencies for production
  deploy - Deploy to Github Pages
`);});

gulp.task('lint', [
  'sass:lint',
]);

gulp.task('test', [
  'lint',
]);

gulp.task('watch', [
  'js:watch',
  'sass:watch',
]);

gulp.task('serve', [
  'jekyll:serve',
]);

gulp.task('develop', [
  'watch',
  'serve',
]);

gulp.task('build', [
  'js:build',
  'sass:build',
  'jekyll:build',
]);

gulp.task('deploy', [
  'github-pages:deploy',
]);

gulp.task('default', ['help']);
