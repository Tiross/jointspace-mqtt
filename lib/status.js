'use strict';

const request = require('./request');
const publish = require('./mqtt').publish;

const set = (source, status) => {
  return new Promise((resolve, reject) => {
    if (source.data.status !== status) {
      source.data.status = status;

      publish(source.prefix + '/status', source.data.status);
    }

    if (status) {
      resolve(source);
    } else {
      reject(source);
    }
  });
};

module.exports = (source) => {
  const status = source.data.status;

  return request(source.host, 'system')
    .then(() => set(source, true))
    .catch(() => set(source, false))
  ;
};
