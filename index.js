#! /usr/bin/env node

'use strict';

const loop = require('./lib/loop');
const mqtt = require('./lib/mqtt');
const config = require('./config.json');
const output = require('./lib/output');

config.verbose = config.verbose || false;

if (undefined === config.sources || !config.sources.length) {
  if (config.verbose) {
    console.error('No sources configured. Please configure at least one source and try again.');
  }

  process.exit(1);
}

mqtt.connect(config.broker);

config.sources.forEach((source, index) => {
  if (!source || typeof(source.host) === 'undefined' || !source.host) {
    output.error('Missing required argument "host"');
    process.exit(1);
  }

  source.id = index;
  source.interval = source.interval || 1000;
  source.timeout = source.timeout || 1000;
  source.prefix = source.prefix || 'tv';
  source.data = {
    status: false,
    volume: 0,
    muted: null,
    source: '',
  };

  output.log('Polling source "%s" every %dms', source.host, source.interval);

  loop(source);
});
