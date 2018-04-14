'use strict';

const request = require('request-promise-native');
const sprintf = require('sprintf-js').sprintf;
const config = require('../config.json');

const req = (options) => {
  if (config.verbose) {
    console.log('Call ' + options.uri);
  }

  return request(options);
};

module.exports = (host, service) => {
  return req({
    uri: sprintf('http://%s:%d/%d/%s', host, 1925, 1, service),
    json: true,
    timeout: 500
  });
};

module.exports.netflix = (host) => {
  return req({
    uri: sprintf('http://%s:%d', host, 9080),
    timeout: 500
  });
}
