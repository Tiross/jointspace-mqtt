'use strict';

const process = require('./process');
const config = require('../config.json');

const wait = (source) => {
  return new Promise((resolve) => {
    if (config.verbose) {
      console.log('Waiting %dms', source.interval);
    }

    setTimeout(resolve, source.interval, source);
  });
};

const loop = (source) => {
  return process(source)
    .then(wait)
    .then(loop)
  ;
};

module.exports = loop;
