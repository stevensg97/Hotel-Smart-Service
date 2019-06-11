import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import MQTTClient from './mqtt';
import {
  colors,
  commonStyles } from '../../config/styles';
import {
  SCREENS,
  BUTTONS,
  VALUES } from '../../config/constants';

export default class Shower extends Component {
  static navigationOptions = {
    title: SCREENS.SHOWER
  };

  constructor(props) {
    super(props);
    this.state = {
      waterLevel: VALUES.PERCENTAGE25,
      switchSoapValue: false,
      soapValue: VALUES.F,
      waterTemperature: VALUES.COLD,
      time: VALUES.TIME25,
      date: this._getDate()
    };
  }

  _getDate = async () => {
    try {
      let response = await fetch(VALUES.DATE_API_URL);
      let responseJson = await response.json();
      var formattedDate = responseJson.currentDateTime.toString().substring(5, 7) + '-' +
      responseJson.currentDateTime.toString().substring(8, 10) + '-' +
      responseJson.currentDateTime.toString().substring(0, 4);
      console.log(formattedDate);
      this.setState({ date: formattedDate });
    } catch (error) {
      console.log(error);
    }
  }

  _getLiters = () => {
    var liters = (100*this.state.time)/(1000*3600);
    return liters;
  }

  _onDonePress = async () => {
    try {
      var content = VALUES.DATE + '=' +
      this.state.date + '&' +
       VALUES.LITERS + '=' + this._getLiters();
      console.log(content);
      let response = await fetch(VALUES.URL+VALUES.STATISTICS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          content
      });
      let responseJson = await response.json();
      console.log(responseJson);

    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert(
        BUTTONS.SHOWER,
        ALERTS.FAILURE,
        [{ text: BUTTONS.OK }],
        { cancelable: false }
      );
    }
  }

  _selectedButtonStyle = function (value) {
    if (
      this.state.waterLevel == value ||
      this.state.waterTemperature == value
    ) {
      return commonStyles.selectedButtonContainer;
    } else {
      return styles.buttonContainer;
    }
  };

  _selectedButtonTextStyle = function (value) {
    if (
      this.state.waterLevel == value ||
      this.state.waterTemperature == value
    ) {
      return commonStyles.selectedButtonText;
    } else {
      return styles.buttonText;
    }
  };

  _selectedWaterLevel = value => {
    this.setState({ waterLevel: value });
    if (value == VALUES.PERCENTAGE25) {
      this.setState({ time: VALUES.TIME25 });
    } else if(value == VALUES.PERCENTAGE50){
      this.setState({ time: VALUES.TIME50 });
    } else if(value == VALUES.PERCENTAGE75){
      this.setState({ time: VALUES.TIME75 });
    } else{
      this.setState({ time: VALUES.TIME100 });
    }

  };

  _selectedWaterTemperature = value => {
    this.setState({ waterTemperature: value });
  };

  _toggleSoapSwitch = value => {
    this.setState({ switchSoapValue: value });
    if(value){
      this.setState({ soapValue: VALUES.T });
    } else {
      this.setState({ soapValue: VALUES.F });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.WATER_LEVEL}</Text>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.PERCENTAGE25)}
            onPress={() => this._selectedWaterLevel(VALUES.PERCENTAGE25)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.PERCENTAGE25)}>
              {BUTTONS.PERCENTAGE25}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.PERCENTAGE50)}
            onPress={() => this._selectedWaterLevel(VALUES.PERCENTAGE50)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.PERCENTAGE50)}>
              {BUTTONS.PERCENTAGE50}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.PERCENTAGE75)}
            onPress={() => this._selectedWaterLevel(VALUES.PERCENTAGE75)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.PERCENTAGE75)}>
              {BUTTONS.PERCENTAGE75}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.PERCENTAGE100)}
            onPress={() => this._selectedWaterLevel(VALUES.PERCENTAGE100)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.PERCENTAGE100)}>
              {BUTTONS.PERCENTAGE100}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.SOAP}</Text>
          <Switch
            style={styles.switch}
            trackColor={{ true: colors.black, false: colors.grey }}
            thumbColor={colors.black}
            backgroundColor={colors.white}
            onValueChange={this._toggleSoapSwitch}
            value={this.state.switchSoapValue}
          />
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.WATER_TEMPERATURE}</Text>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.COLD)}
            onPress={() => this._selectedWaterTemperature(VALUES.COLD)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.COLD)}>
              {BUTTONS.COLD}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.WARM)}
            onPress={() => this._selectedWaterTemperature(VALUES.WARM)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.WARM)}>
              {BUTTONS.WARM}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.HOT)}
            onPress={() => this._selectedWaterTemperature(VALUES.HOT)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.HOT)}>
              {BUTTONS.HOT}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this._selectedButtonStyle(VALUES.AUTO)}
            onPress={() => this._selectedWaterTemperature(VALUES.AUTO)}
          >
            <Text style={this._selectedButtonTextStyle(VALUES.AUTO)}>
              {BUTTONS.AUTOMATIC}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{BUTTONS.TURN_ON}</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this._getDate();
              MQTTClient([
              this.state.waterLevel,
              this.state.soapValue,
              this.state.waterTemperature]);
              this._onDonePress();
            }}
          >
            <Text style={styles.buttonText}>{BUTTONS.DONE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  containerOption: {
    padding: 5
  },
  title: {
    alignSelf: 'center',
    color: colors.black,
    fontSize: 30
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: colors.black,
    borderRadius: 15,
    margin: 5,
    paddingVertical: 5,
    width: 100
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center'
  },
  switch: {
    alignSelf: 'center'
  }
});
