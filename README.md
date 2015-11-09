# [gutil](https://github.com/gulpjs/gulp-util)-waterlog [![Build Status: Linux][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

Gulp-util based log abstraction layer for super fluid, composable log messaging.

## Installation

```
npm install --save-dev gutil-waterlog
```

## Usage

```js
gulp.task('example', function () {
  log.time('task');
  log.task('example') // 'example is the plugin\group name'
    .action('Building JS...')
    .hr()
    .send();
  return gulp.src('src/**/*.js')
    .pipe(tap(function (file) {
      log.time('example');
      log.start('example')      
        .action('Compiling js file')
        .data(file.relative)
        .send();
    }))
    .pipe(babel())
    .on('error', function (err) {
      log.error('example')
        .action('Could not example js file')
        .line()
        .text(err)
        .send();
    })
    // .pipe(gulp.dest('lib'))
    .pipe(tap(function (file) {
      log.success('example')      
        .action('Compiled js file')
        .data(file.relative)
        .time(log.timeEnd('example'))
        .send();
    }))
    .on('end', function () {
      // Lets say I wanted some text centered with some lines next to it
      let total = process.stdout.columns - 13,
          half = Math.floor(total / 2),
          offset = Math.floor(' WHEW '.length / 2),
          right = 0;

      log.text().hr().send();
      log.task('example')
        .action('Finished building all the JS files')
        .data(log.timeEnd('task'))
        .hr()
        .send();

      if (half * 2 < total) {
        right = 1;
      }

      log.text()
        .hr('=', half - offset).text(' WHEW ').hr('=', half - offset + right, '', '\n')
        .text('This is getting very excessive now!')
        .line('But you can do a lot')
        .line()
        .text('Like a whole lot')
        .hr()
        .send();
    });
});
```

![Image of library output][screenshot-image]

## API

### log._message type_([plugin], [action, data, time])
{string} `plugin` - Optional string to show which plugin\group is calling the log message.

#### Quick-send Params
Including these optional params will not return a message object but instead directly send the message to the console.

```js
  log.task('build', 'Bulding JS file', file.relative, moment('MM/DD/YYYY hh:mmA'));
```

{string} `action` - When present message is sent directly to console
{string} `data` - Data relevant to the task like a filename, attribute, key etc…
{string} `time` - Time data could be a unix timestamp, a difference, some cool sexy text thing like the and `log.timeEnd` method result

### log.time([timer name])
`timer name` - Optional name assigned to the timer for future reference

Creates a timer to track execution time easily

### log.timeEnd([timer name])
`timer name` - Optional name assigned to the timer for future reference

Returns the duration of the timer in a nicely formatted string like `“5s 200ms”`

### Messsage Types

#### log.error([plugin])
Creates an error message based message recommended for when tasks just sort of happen. Pairs nicely with a start message.

#### log.start([plugin])
Creates a start message signifying a process has started.

#### log.success([plugin])
Creates a success message type used to confirm an action has taken place. Pairs nicely with a start message.

#### log.task([plugin])
Creates an action based message recommended for when tasks just sort of happen.

### Message API
The message object allows you to add many different types of phrases and stylings before sending it to the console. This allows you to make reusable messages and prettier debug statements fairly painlessly. When the message type methods are given one or less parameter they return the composable, chainable message instance.

> __Protip:__ When using the message API be sure to call the `send` method at the end of your chained methods to send it to the console.

```js
  log.success('example')      
    .action('Compiled js file')
    .data(file.relative)
    .time(log.timeEnd('example'))
    .send();
```

#### action(text)
Adds a contextually styled action text phrase. In a regular text message it will be the default console text color. In an error message type it is red, in a success message type it is green.

#### data(text)
Adds a consistently styled data text phrase to the message. Data is colored magenta and is good for filenames and other dynamic data.

#### hr([char='-', width=process.stdout.columns, prefix='\n', suffix=''])
Creates a horizontal rule of the given character across the number of columns with the given prefix and suffix. Note this method behaves differently when it's called on an empty message. If it's an empty message the hr takes into account the timestamp `gutil.log` prepends to the text when doing a full width string.

{string} `char` - Which character to render the rule with
{int} `width` - # of columns to repeat the `char` accross by default it is the max # of chars in the column.
{string} `prefix` - Prefix string to prepend to the hr. If the message is empty and is the default value this will be ignored.
{string} `suffix` - Suffix to the horizontal rule.

#### line([text])
Creates a new line followed by text if any is given.

#### send()
Sends the message to the console must be called to render it in the console.

#### text(text)
Adds default formatted text to the console.

#### time(text)
Adds a time phrase to the message. If called like `log.text().time('5s')` it will append ` in 5s` to the end of the message and the measurement `5s` will be colored cyan.

#### toString()
Render your message as a string if you want to do other things to it. Note gutil will not prepend the timestamp to it.

## License

BSD-3-Clause (c) 2015 Jay Zawrotny (jayzawrotny@gmail.com)

[screenshot-image]: https://github.com/jayzawrotny/gutil-waterlog/raw/master/docs/images/screenshot_1.png

[npm-url]: https://npmjs.org/package/gutil-waterlog
[npm-image]: http://img.shields.io/npm/v/gutil-waterlog.svg?style=flat

[travis-url]: https://travis-ci.org/jayzawrotny/gutil-waterlog
[travis-image]: http://img.shields.io/travis/jayzawrotny/gutil-waterlog.svg?style=flat

[depstat-url]: https://david-dm.org/jayzawrotny/gutil-waterlog
[depstat-image]: http://img.shields.io/david/jayzawrotny/gutil-waterlog.svg?style=flat