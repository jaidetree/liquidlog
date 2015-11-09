/**
 * Clean
 * Removes the files in the build & bundle directories.
 *
 * @example
 * gulp clean
*/
import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import fs from 'fs';
import path from 'path';

import log from '../../src';
import paths from '../config/paths';

paths.clean = [
  paths.to(paths.get.js.dest, '**'),
];

gulp.task('clean', function () {
  var cleanedFiles = 0;

  return paths.clean.forEach(function (file) {
    var dir = path.dirname(file),
        files = [];

    files.push(file);
    files.push('!' + dir);

    log.success('clean')
      .action('Cleaned')
      .data(dir)
      .action('directory')
      .send();

    /** Delete that file */
    del(files, { force: true });
  });
});

export default path;