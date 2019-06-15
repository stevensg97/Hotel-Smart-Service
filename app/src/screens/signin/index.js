import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import i18n from "../../config/i18n";
import { colors, commonStyles } from "../../config/styles";
import { SCREENS, VALUES } from "../../config/constants";

export default class SignIn extends Component {
  static navigationOptions = {
    title: i18n.t("BUTTONS.SIGNIN")
  };

  constructor(props) {
    super(props);
    this.state = {
      nameString: "",
      lastNameString: "",
      emailString: "",
      passwordString: "",
      checkPasswordString: "",
      isLoading: false
    };
  }

  _onSignInPressed = async () => {
    this.setState({ isLoading: true });
    if (this.state.passwordString == this.state.checkPasswordString) {
      try {
        let response = await fetch(VALUES.URL + VALUES.CLIENTS, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.state.nameString,
            lastname: this.state.lastNameString,
            email: this.state.emailString,
            password: this.state.passwordString
          })
        });
        let responseJson = await response.json();
        this.setState({ isLoading: false });
        Alert.alert(
          i18n.t("BUTTONS.SIGNIN"),
          i18n.t("ALERTS.SIGNIN_SUCCESS"),
          [
            {
              text: i18n.t("BUTTONS.OK"),
              onPress: () => this.props.navigation.navigate(SCREENS.HOME)
            }
          ],
          { cancelable: false }
        );
        return responseJson.result;
      } catch (error) {
        this.setState({ isLoading: false });
        Alert.alert(
          i18n.t("BUTTONS.SIGNIN"),
          i18n.t("ALERTS.FAILURE"),
          [{ text: i18n.t("BUTTONS.OK") }],
          {
            cancelable: false
          }
        );
      }
    } else {
      this.setState({ isLoading: false });
      alert(i18n.t("ALERTS.PASSWORD_NOT_MATCH"));
    }
  };

  _onSignInTextChangedCheckPassword = event => {
    this.setState({
      checkPasswordString: event.nativeEvent.text
    });
  };

  _onSignInTextChangedEmail = event => {
    this.setState({
      emailString: event.nativeEvent.text
    });
  };

  _onSignInTextChangedLastName = event => {
    this.setState({
      lastNameString: event.nativeEvent.text
    });
  };

  _onSignInTextChangedName = event => {
    this.setState({
      nameString: event.nativeEvent.text
    });
  };

  _onSignInTextChangedPassword = event => {
    this.setState({
      passwordString: event.nativeEvent.text
    });
  };

  componentDidMount() {
    i18n.locale = this.props.navigation.state.params.lang;
  }

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.containerForm}>
            <StatusBar barStyle="light-content" />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onSubmitEditing={() => this.lastNameInput.focus()}
              autoCorrect={false}
              keyboardType="default"
              value={this.state.nameString}
              onChange={this._onSignInTextChangedName}
              underlineColorAndroid={colors.transparent}
              returnKeyType="next"
              placeholder={i18n.t("PLACEHOLDERS.NAME")}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              ref={input => (this.lastNameInput = input)}
              onSubmitEditing={() => this.emailInput.focus()}
              autoCorrect={false}
              keyboardType="default"
              value={this.state.lastNameString}
              onChange={this._onSignInTextChangedLastName}
              underlineColorAndroid={colors.transparent}
              returnKeyType="next"
              placeholder={i18n.t("PLACEHOLDERS.LASTNAME")}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              ref={input => (this.emailInput = input)}
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              keyboardType="email-address"
              value={this.state.emailString}
              onChange={this._onSignInTextChangedEmail}
              underlineColorAndroid={colors.transparent}
              returnKeyType="next"
              placeholder={i18n.t("PLACEHOLDERS.EMAIL")}
              placeholderTextColor={colors.placeholderColor}
            />
            <TextInput
              style={styles.input}
              ref={input => (this.passwordInput = input)}
              onSubmitEditing={() => this.checkPasswordInput.focus()}
              placeholder={i18n.t("PLACEHOLDERS.PASSWORD")}
              value={this.state.passwordString}
              onChange={this._onSignInTextChangedPassword}
              underlineColorAndroid={colors.transparent}
              placeholderTextColor={colors.placeholderColor}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              returnKeyType="go"
              ref={input => (this.checkPasswordInput = input)}
              placeholder={i18n.t("PLACEHOLDERS.CHECK_PASSWORD")}
              value={this.state.checkPasswordString}
              onChange={this._onSignInTextChangedCheckPassword}
              underlineColorAndroid={colors.transparent}
              placeholderTextColor={colors.placeholderColor}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._onSignInPressed}
            >
              <Text style={styles.buttonText}>{i18n.t("BUTTONS.SIGNIN")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {spinner}
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
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    alignSelf: "center",
    flex: 1,
    height: "60%",
    resizeMode: "contain",
    resizeMode: "contain",
    width: "60%"
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
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "column"
  },
  textLink: {
    color: colors.black,
    fontWeight: "700",
    margin: 6,
    textAlign: "center"
  }
});
