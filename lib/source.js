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

const name = (source) => {
  if (source.sources.checked) {
    return Promise.resolve(source);
  }

  return request(source, 'sources')
    .catch(status.offline)
    .then(data => new Promise(resolve => {
      let sources = {
        netflix: 'Netflix',
      };

      for (let item in data) {
        if (data.hasOwnProperty(item)) {
          sources[item] = data[item].name;
        }
      }

      source.sources = Object.assign(sources, source.sources);
      source.sources.checked = true;

      publish(source.prefix + '/sources/list', JSON.stringify(sources));

      resolve(source);
    }))
  ;
};

module.exports = (source) => {
  if (!source.data.status) {
    return Promise.resolve(source);
  }

  return name(source)
    .then(request.netflix)
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
