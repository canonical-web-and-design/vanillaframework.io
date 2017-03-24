'use strict';

import browserSync from 'browser-sync';
import gulp from 'gulp';


const browserSyncOptions = {
  server: {
    baseDir: '_site',
  },
}


gulp.task('browser-sync', () => {
   browserSync(browserSyncOptions);
});
