'use strict';

const mqtt = require('mqtt');
const config = require('../config.json');

let client = {
  end: () => {},
  publish: () => {
    console.error('Try to publish data without connecting to a broker');
  }
};

const onExit = () => {
  client.end();
  process.exit();
}


module.exports.connect = (broker) => {
  client = mqtt.connect(broker)
    .on('error', (err) => {
      if (err) {
        return console.error('MQTT Error: %s', err.toString());
      }
    })
    .on('close', (err) => {
      if (err) {
        return console.error('MQTT Error: %s', err.toString());
      }
    })
  ;
};

module.exports.publish = (topic, message) => {
  if (config.verbose) {
    console.log('MQTT', topic, message.toString());
  }

  client.publish(topic, message.toString());
};

// Disconnect client when script exits
process.on('exit', onExit);
process.on('SIGINT', onExit);
