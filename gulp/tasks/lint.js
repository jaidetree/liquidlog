/**
 * Lint
 * Lints our js
 */
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import watch from 'gulp-watch';

// Other modules
import minimist from 'minimist';

// Libraries
import log from '../../src';
import tap from '../lib/tap';

// Config
import paths from '../config/paths';

let config = {
      parser: 'babel-eslint',
      env: {
        browser: true,
        es6: true
      },
      globals: {
        'require': true,
        'DataBootstrap': true,
        'CKEDITOR': true,
        'Backbone': true,
        'React': true,
        'Braintree': true,
        'google': true,
        'Raven': true,
        'mixpanel': true
      },
      ecmaFeatures: { 
        arrowFunctions: true,
        binaryLiterals: true,
        blockBindings: true,
        classes: true,
        defaultParams: true,
        destructuring: true,
        forOf: true,
        generators: true,
        modules: true,
        objectLiteralComputedProperties: true,
        objectLiteralDuplicateProperties: true,
        objectLiteralShorthandMethods: true,
        objectLiteralShorthandProperties: true,
        octalLiterals: true,
        regexUFlag: true,
        regexYFlag: true,
        restParams: true,
        spread: true,
        superInFunctions: true,
        templateStrings: true,
        unicodeCodePointEscapes: true,
        globalReturn: false,
        jsx: true,
        experimentalObjectRestSpread: true
      }
    };

/**
 * Lint
 * Reusble function to apply various plugins to a gulp vinyl file stream.
 *
 * @param {TransformStream} stream - A gulp vinyl transform stream
 * @returns {TransformStream} The resulting stream from the transformations
 */
function lint(stream) {
  return stream
    .pipe(plumber())
    .pipe(tap((file) => {
      log.start('lint')
        .action('Linting file')
        .data(paths.fromJs(file.path))
        .send();
    }))
    .pipe(eslint(config))
    .pipe(eslint.format())
    .pipe(tap((file) => {
      log.success('lint')
        .action('Cleanly linted')
        .data(paths.fromJs(file.path))
        .send();
    }));
}

/**
 * Task Autolint
 * Runs a watcher on all src js files and lints them when changed.
 */
gulp.task('autolint', function () {
  return watch(paths.get.js.src, (file) => {
    return lint(gulp.src(file.path));
  });
});

/**
 * Task Lint
 * Lints a file or all js src files
 */
gulp.task('lint', function () {
  var opts = minimist(process.argv.slice(2)),
      file = opts.file || opts.f || paths.get.js.src;


  if (file !== paths.get.js.src) {
    file = paths.resolve(paths.get.cwd, file);
  }

  return lint(gulp.src(file));
});
