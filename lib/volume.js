'use strict';

const request = require('./request');
const publish = require('./mqtt').publish;
const status = require('./status');

module.exports = (source) => {
  return request(source, 'audio/volume')
    .then((data) => {
      return new Promise((resolve) => {
        status.online(source).then(resolve(data));
      });
    })
    .then((data) => {
      return new Promise((resolve) => {
        if (data.current !== source.data.volume || data.muted !== source.data.muted) {
          source.data.volume = data.current;
          source.data.muted = data.muted;

          data.percent = Math.round(data.current / data.max * 1000) / 1000;

          publish(source.prefix + '/volume', JSON.stringify(data));
        }

        resolve(source);
      });
    })
    .catch(status.offline)
  ;
};
