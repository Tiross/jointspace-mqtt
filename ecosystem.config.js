'use strict';

const pack = require('./package.json');

module.exports = {
  apps: [
    {
      name: pack.name,
      script: pack.main,
      wait_ready: true,
    },
  ],
};
