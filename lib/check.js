'use strict';

const request = require('./request');
const status = require('./status');

module.exports = (source) => {
  return request(source, 'system')
    .then(() => status(source, true))
    .catch(() => status(source, false))
  ;
};
