'use strict';

const request = require('./request');
const publish = require('./mqtt').publish;
const status = require('./status');

const set = (source, state) => {
  return new Promise(resolve => {
    let data = {
      id: state,
      name: state,
    };

    if (source.data.source !== state) {
      source.data.source = state;

      if (state in source.sources) {
        data.name = source.sources[state];
      }

      publish(source.prefix + '/source', JSON.stringify(data));
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
        .catch(status.offline)
        .then((data) => {
          return new Promise((resolve) => {
            status.online(source).then(resolve(data));
          });
        })
        .then(data => set(source, data.id))
      ;
    })
  ;
};
