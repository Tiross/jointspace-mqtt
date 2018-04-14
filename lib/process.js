'use strict';

const status = require('./status');
const volume = require('./volume');
const source = require('./source');

module.exports = (src) => {
  return status(src)
    .then(volume)
    .then(source)
    .catch(() => {})
  ;
};
