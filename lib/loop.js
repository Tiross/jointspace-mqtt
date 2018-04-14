'use strict';

const process = require('./process');

module.exports = (source) => {
  setInterval(process, source.interval, source);
};
