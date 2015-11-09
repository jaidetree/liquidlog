import gutil from 'gulp-util';

let stdoutWrite = process.stdout._write;

export default class StdoutInterceptor {
  constructor() {
    this.output = [];
  }

  capture() {
    let output = this.output = [];

    process.stdout._write = (chunk, enc, callback) => {
      this.output.push(chunk);
      callback();
    };
  }

  getOutput() {
    return this.output.join('');
  }

  release() {
    process.stdout._write = stdoutWrite;
    return gutil.colors.stripColor(this.output.join('').trim());
  }
}