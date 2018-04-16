'use strict';

const request = require('./request');
const publish = require('./mqtt').publish;
const offline = require('./status').offline;

const set = (source, state) => {
  return new Promise(resolve => {
    if (source.data.source !== state) {
      source.data.source = state;

      publish(source.prefix + '/source', source.data.source);
    }

    resolve(source);
  });
};

module.exports = (source) => {
  if (!source.data.status) {
    return Promise.resolve(source);
  }

  return request.netflix(source)
    .then(() => set(source, 'netflix'))
    .catch(() => {
      return request(source, 'sources/current')
        .catch(offline)
        .then(data => set(source, data.id))
      ;
    })
  ;
};
