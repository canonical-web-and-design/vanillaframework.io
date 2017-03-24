'use strict';

import browserSync from 'browser-sync';
import cp from 'child_process';
import gulp from 'gulp';
import shell from 'gulp-shell';


const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


const runJekyll = (commands) => {
  let bundleArguments = ['exec', 'jekyll'].concat(commands);
  return cp.spawn('bundle', bundleArguments, {stdio: 'inherit'});
}


gulp.task('jekyll:build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return runJekyll(['build']).on('close', done);
});

gulp.task('jekyll:serve', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return runJekyll(['serve']).on('close', done);
});
