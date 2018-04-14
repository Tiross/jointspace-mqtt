'use strict';

const request = require('./request');
const publish = require('./mqtt').publish;

module.exports = (source) => {
  return request(source.host, 'audio/volume')
    .then((data) => {
      return new Promise((resolve) => {
        if (data.current !== source.data.volume) {
          source.data.volume = data.current;

          publish(source.prefix + '/volume', data.current);
        }

        resolve(data);
      });
    })
    .then((data) => {
      return new Promise((resolve) => {
        if (data.muted !== source.data.muted) {
          source.data.muted = data.muted;

          publish(source.prefix + '/muted', data.muted);
        }

        resolve(source);
      });
    })
  ;
};
