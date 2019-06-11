import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
} from 'react-native';
import IconAbout from '../../assets/splash.png';
import {
  SCREENS
} from '../../config/constants';

export default class About extends Component {
  static navigationOptions = {
    title: SCREENS.ABOUT
  };

  render() {
    return (
      <ImageBackground
        source={IconAbout}
        style={styles.container}
      >
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  }
});
