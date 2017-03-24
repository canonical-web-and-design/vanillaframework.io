'use strict';

import ghPages from 'gulp-gh-pages';
import gulp from'gulp';


gulp.task('github-pages:deploy', () => {
 return gulp.src('./**/*')
   .pipe(ghPages());
});
