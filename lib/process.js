'use strict';

const check = require('./check');
const volume = require('./volume');
const source = require('./source');

module.exports = (src) => {
  return check(src)
    .then(volume)
    .then(source)
  ;
};
