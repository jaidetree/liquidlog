/* eslint no-console: 0 */
import gulp from 'gulp';
export * from './tasks';

/**
 * Use module.exports here because the transpiler will not transpile
 * the export of this file
 */

/** Load tasks with our instance of gulp */

gulp.task('air', function () {
    console.log('b(^_^)v');
});

