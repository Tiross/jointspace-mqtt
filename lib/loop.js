'use strict';

const process = require('./process');
const output = require('./output');

const wait = (source) => {
  return new Promise((resolve) => {
    output.log('Waiting %dms', source.interval);
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
