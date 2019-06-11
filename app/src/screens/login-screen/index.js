import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert
} from 'react-native';
import IconHouse from '../../assets/house1.png';
import { colors, commonStyles } from '../../config/styles';
import {
  SCREENS,
  ALERTS,
  PLACEHOLDERS,
  BUTTONS,
  VALUES
} from '../../config/constants';

export default class Login extends Component {
  static navigationOptions = {
    title: SCREENS.LOGIN
  };

  constructor(props) {
    super(props);
    this.state = {
      emailString: '',
      passwordString: '',
      isLoading: false
    };
  }

  _onLoginPressed = async () => {
    this.setState({ isLoading: true });
    try {
      let response = await fetch(
        VALUES.URL + VALUES.USERS + '/' +
        VALUES.FIND_ONE + '?' + VALUES.EMAIL +
        '=' + this.state.emailString
      );
      let responseJson = await response.json();
      if (
        this.state.emailString == responseJson[0].email &&
        this.state.passwordString == responseJson[0].password
      ) {
        this.setState({ isLoading: false });
        this.props.navigation.navigate(SCREENS.HOME);
        this.setState({ emailString: '' });
        this.setState({ passwordString: '' });
      } else {
        this.setState({ isLoading: false });
        Alert.alert(
          SCREENS.LOGIN,
          ALERTS.WRONG,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
        Alert.alert(
          SCREENS.LOGIN,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
    }
  };

  _onLoginTextChangedEmail = event => {
    this.setState({
      emailString: event.nativeEvent.text
    });
  };

  _onLoginTextChangedPassword = event => {
    this.setState({
      passwordString: event.nativeEvent.text
    });
  };

  _onSignInPressed = () => {
    this.props.navigation.navigate(SCREENS.SIGNIN);
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size='large' />
    ) : null;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.loginContainer}>
          <Image style={styles.logo} source={IconHouse} />
        </View>
        {spinner}
        <View style={styles.formContainer}>
          <View style={styles.containerForm}>
            <StatusBar barStyle='light-content' />
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              keyboardType='email-address'
              value={this.state.emailString}
              onChange={this._onLoginTextChangedEmail}
              underlineColorAndroid={colors.transparent}
              returnKeyType='next'
              placeholder={PLACEHOLDERS.EMAIL}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              returnKeyType='go'
              ref={input => (this.passwordInput = input)}
              placeholder={PLACEHOLDERS.PASSWORD}
              value={this.state.passwordString}
              onChange={this._onLoginTextChangedPassword}
              underlineColorAndroid={colors.transparent}
              placeholderTextColor={colors.placeholderColor}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onLoginPressed}
            >
              <Text style={styles.buttonText}>{BUTTONS.LOGIN}</Text>
            </TouchableOpacity>
            <View style={styles.containerLink}>
              <TouchableOpacity onPress={this._onSignInPressed}>
                <Text style={styles.textLink}>{BUTTONS.SIGNIN}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.textLink}>{BUTTONS.FORGOT}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    alignSelf: 'center',
    flex: 1,
    height: '60%',
    resizeMode: 'contain',
    resizeMode: 'contain',
    width: '60%'
  },
  containerForm: {
    padding: 20
  },
  input: {
    backgroundColor: colors.inputColor,
    color: colors.black,
    height: 40,
    marginBottom: 10,
    padding: 10
  },
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
  containerLink: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  textLink: {
    color: colors.black,
    fontWeight: '700',
    margin: 6,
    textAlign: 'center'
  }
});
