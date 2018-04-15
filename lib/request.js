'use strict';

const request = require('request-promise-native');
const sprintf = require('sprintf-js').sprintf;
const output = require('./output');

const req = (options) => {
  output.log('Call %s', options.uri);

  return request(options);
};

module.exports = (source, service) => {
  return req({
    uri: sprintf('http://%s:%d/%d/%s', source.host, 1925, 1, service),
    json: true,
    timeout: source.timeout
  });
};

module.exports.netflix = (source) => {
  return req({
    uri: sprintf('http://%s:%d', source.host, 9080),
    timeout: source.timeout
  });
}
