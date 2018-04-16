'use strict';

const request = require('request-promise-native');
const sprintf = require('sprintf-js').sprintf;
const output = require('./output');

const req = (source, options) => {
  output.log('Call %s', options.uri);

  return request(options).catch(error => new Promise((resolve, reject) => {
    output.error('HTTP error %s', error.message);

    reject(source);
  }));
};

module.exports = (source, service) => {
  return req(source, {
    uri: sprintf('http://%s:%d/%d/%s', source.host, source.port, source.apiVersion, service),
    json: true,
    timeout: source.timeout
  });
};

module.exports.netflix = (source) => {
  return req(source, {
    uri: sprintf('http://%s:%d', source.host, source.netflixPort),
    timeout: source.timeout
  });
}
