'use strict';

const request = require('./request');
const publish = require('./mqtt').publish;

const set = (source, state) => {
  return new Promise(resolve => {
    if (source.data.source !== state) {
      source.data.source = state;

      publish(source.prefix + '/source', source.data.source);
    }

    resolve();
  });
};

module.exports = (source) => {
  return request.netflix(source.host)
    .then(() => set(source, 'netflix'))
    .catch(() => {
      return request(source.host, 'sources/current')
        .then(data => {
          return new Promise(resolve => {
            return set(source, data.id);
          })
        })
      ;
    })
  ;
};
