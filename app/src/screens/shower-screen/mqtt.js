import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';

export default function MQTTClient(data) {
  init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync: {}
  });

  function onConnect() {
    console.log("onConnect");
    const topic = "/home/smartshower"
    client.subscribe(topic);
    var params = '';
    for (var i = 0; i < data.length; i++) {
      params = params + data[i] + ',';
    }
    message = new Paho.MQTT.Message(params);
    message.destinationName = topic;
    client.send(message);

  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
  }

  function doFail(e) {
    console.log('error', e);
  }

  const client = new Paho.MQTT.Client('m16.cloudmqtt.com', 32758, "device2");
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  const options = {
    useSSL: true,
    userName: "lnyscicw",
    password: "rp1de-LikTTt",
    onSuccess: onConnect,
    onFailure: doFail
  };

  client.connect(options);

  return client
}
