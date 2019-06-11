import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../config/styles';
import {
  SCREENS,
  BUTTONS } from '../../config/constants';

export default class Settings extends Component {
  static navigationOptions = {
    title: SCREENS.SETTINGS
  };

  _onAboutPressed = () => {
    this.props.navigation.navigate(SCREENS.ABOUT);
  };

  _onLogOutPressed = () => {
    this.props.navigation.navigate(SCREENS.LOGIN);
  };

  _onStatisticsPressed = () => {
    this.props.navigation.navigate(SCREENS.STATISTICS);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerOption}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{BUTTONS.LANGUAGE}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._onStatisticsPressed}
          >
            <Text style={styles.buttonText}>{BUTTONS.STATISTICS}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._onLogOutPressed}
          >
            <Text style={styles.buttonText}>{BUTTONS.LOGOUT}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this._onAboutPressed}
          >
            <Text style={styles.buttonText}>{BUTTONS.ABOUT}</Text>
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
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: colors.black,
    borderRadius: 15,
    margin: 20,
    paddingVertical: 5,
    width: 150
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center'
  }
});
