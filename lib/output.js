'use strict';

const config = require('../config.json');
const vsprintf = require('sprintf-js').vsprintf;

const prepareMessage = (callback, message, args) =>  {
  if (config.verbose) {
    const time = new Date;
    const text = vsprintf('[%02d:%02d:%02d.%03d] %s', [
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      time.getMilliseconds(),
      message,
    ]);

    args.unshift(text);

    callback.apply(callback, args);
  }
};

module.exports.log = (message, ...args) =>  {
  prepareMessage(console.log, message, args);
};

module.exports.error = (message, ...args) =>  {
  prepareMessage(console.error, message, args);
};
