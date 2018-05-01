'use strict';

const mqtt = require('mqtt');
const output = require('./output');

let client = {
  end: () => {},
  publish: () => {
    output.error('MQTT Error: Try to publish data without connecting to a broker');
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
        return output.error('MQTT Error: %s', err.toString());
      }
    })
    .on('close', (err) => {
      if (err) {
        return output.error('MQTT Error: %s', err.toString());
      }
    })
  ;

  client.qos = broker.qos;
};

module.exports.publish = (topic, message) => {
  output.log('MQTT', topic, message.toString());
  client.publish(topic, message.toString(), {
    qos: client.qos,
    retain: true,
  });
};

// Disconnect client when script exits
process.on('exit', onExit);
process.on('SIGINT', onExit);
