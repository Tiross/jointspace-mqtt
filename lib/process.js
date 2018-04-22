'use strict';

const volume = require('./volume');
const source = require('./source');

module.exports = (src) => {
  return volume(src)
    .then(source)
  ;
};
