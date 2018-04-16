'use strict';

const publish = require('./mqtt').publish;

const status = (source, status) => {
  return new Promise((resolve) => {
    if (source.data.status !== status) {
      source.data.status = status;

      publish(source.prefix + '/status', source.data.status);
    }

    resolve(source);
  });
};

module.exports = status;
module.exports.offline = (source) => {
  return status(source, false);
};
