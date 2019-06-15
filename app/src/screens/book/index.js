import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  StatusBar,
  TextInput,
  Linking
} from "react-native";
import Dialog, {
  DialogTitle,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  DialogContent
} from "react-native-popup-dialog";
import i18n from "../../config/i18n";
import DatePicker from "react-native-datepicker";
import { SCREENS, VALUES, BUTTONS, ALERTS } from "../../config/constants";
import IconLogo from "../../assets/logo.png";
import { colors, commonStyles } from "../../config/styles";

export default class Book extends Component {
  static navigationOptions = {
    title: SCREENS.BOOK
  };
  constructor() {
    super();
    this.state = {
      visibleCheckWeather: false,
      visibleBook: false,
      date: "",
      calendar: [],
      emailString: "",
      passwordString: "",
      isLoading: false
    };
  }

  _onCheckPressed = async () => {
    try {
      millisecondsDate = Math.floor(
        new Date(
          Number(this.state.date.substring(6)),
          Number(this.state.date.substring(0, 2)),
          Number(this.state.date.substring(3, 5))
        ).getTime() / 1000.0
      );
      console.log(millisecondsDate);
      let response = await fetch(
        "https://api.darksky.net/forecast/0be8cbfb2f4e6ca5c7a8987433891817/10.30111210,-85.840859," +
          millisecondsDate +
          "?lang=en"
      );
      let responseJson = await response.json();
      Alert.alert(
        VALUES.WEATHER,
        responseJson.currently.summary,
        [{ text: BUTTONS.OK }],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert(
        BUTTONS.CHECK_WEATHER,
        ALERTS.FAILURE,
        [{ text: BUTTONS.OK }],
        {
          cancelable: false
        }
      );
    }
  };

  _onCheckWeatherPressed = () => {
    this.setState({ visibleCheckWeather: true });
  };

  _onBookPressed = () => {
    this.setState({ visibleBook: true });
  };

  _onLoginPressed = async () => {
    this.setState({ isLoading: true });
    try {
      let response = await fetch(VALUES.URL + VALUES.CLIENTS);
      let responseJson = await response.json();
      for (let i = 0; i < responseJson.length; i++) {
        if (
          this.state.emailString == responseJson[i].email &&
          this.state.passwordString == responseJson[i].password
        ) {
          this.setState({ isLoading: false });
          this.setState({ visibleBook: false });
          Linking.openURL(
            "https://app.thebookingbutton.com/properties/tamarindodiriadirect"
          );
          this.setState({ emailString: "" });
          this.setState({ passwordString: "" });
          break;
        } else if (i + 1 == responseJson.length) {
          this.setState({ isLoading: false });
          Alert.alert(SCREENS.LOGIN, ALERTS.WRONG, [{ text: BUTTONS.OK }], {
            cancelable: false
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      Alert.alert(SCREENS.LOGIN, ALERTS.FAILURE, [{ text: BUTTONS.OK }], {
        cancelable: false
      });
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
    this.setState({ visibleBook: false });
    this.props.navigation.navigate(SCREENS.SIGNIN, {
      lang: this.props.navigation.state.params.lang
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
      <View>
        <TouchableOpacity
          onPress={() => this._onCheckWeatherPressed()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>
            {i18n.t("BUTTONS.CHECK_WEATHER")}
          </Text>
        </TouchableOpacity>
        <Dialog
          visible={this.state.visibleCheckWeather}
          footer={
            <DialogFooter>
              <DialogButton
                text={i18n.t("BUTTONS.CANCEL")}
                onPress={() => {
                  this.setState({ visibleCheckWeather: false });
                }}
              />
              <DialogButton
                text={i18n.t("BUTTONS.CHECK")}
                onPress={() => {
                  this._onCheckPressed();
                }}
              />
            </DialogFooter>
          }
          onTouchOutside={() => {
            this.setState({ visibleCheckWeather: false });
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom"
            })
          }
          dialogTitle={<DialogTitle title={i18n.t("BUTTONS.CHECK_WEATHER")} />}
        >
          <DialogContent style={styles.dialogContainer}>
            <Text style={styles.title}>{i18n.t("VALUES.SELECT_DATE")}</Text>
            <DatePicker
              style={styles.datePicker}
              date={this.state.date}
              mode={VALUES.DATE_MODE}
              placeholder={i18n.t("PLACEHOLDERS.DATE")}
              format={VALUES.DATE_FORMAT}
              minDate={VALUES.MIN_DATE}
              maxDate={VALUES.MAX_DATE}
              confirmBtnText={i18n.t("BUTTONS.CONFIRM")}
              cancelBtnText={i18n.t("BUTTONS.CANCEL")}
              customStyles={{
                dateIcon: styles.dateIcon,
                dateInput: styles.dateInput
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
          </DialogContent>
        </Dialog>
        <TouchableOpacity
          onPress={() => this._onBookPressed()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>{i18n.t("BUTTONS.BOOK")}</Text>
        </TouchableOpacity>
        <Dialog
          visible={this.state.visibleBook}
          footer={
            <DialogFooter>
              <DialogButton
                text={i18n.t("BUTTONS.CANCEL")}
                onPress={() => {
                  this.setState({ visibleBook: false });
                }}
              />
              <DialogButton
                text={i18n.t("BUTTONS.ACCEPT")}
                onPress={() => {
                  this._onLoginPressed();
                }}
              />
            </DialogFooter>
          }
          onTouchOutside={() => {
            this.setState({ visibleBook: false });
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom"
            })
          }
          dialogTitle={<DialogTitle title={i18n.t("BUTTONS.LOGIN")} />}
        >
          <DialogContent style={styles.dialogContainer}>
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.loginContainer}
            >
              <View style={styles.dialogContainer}>
                <Image
                  source={IconLogo}
                  resizeMode={"cover"}
                  style={{ height: 256, width: 256 }}
                />
              </View>
              <View style={styles.formContainer}>
                <View style={styles.containerForm}>
                  <StatusBar barStyle="light-content" />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={this.state.emailString}
                    onChange={this._onLoginTextChangedEmail}
                    underlineColorAndroid={colors.transparent}
                    returnKeyType="next"
                    placeholder={i18n.t("PLACEHOLDERS.EMAIL")}
                    placeholderTextColor={colors.placeholderColor}
                  />
                  <TextInput
                    style={styles.input}
                    returnKeyType="go"
                    ref={input => (this.passwordInput = input)}
                    placeholder={i18n.t("PLACEHOLDERS.PASSWORD")}
                    value={this.state.passwordString}
                    onChange={this._onLoginTextChangedPassword}
                    underlineColorAndroid={colors.transparent}
                    placeholderTextColor={colors.placeholderColor}
                    secureTextEntry
                  />
                  <View style={styles.containerLink}>
                    <TouchableOpacity onPress={this._onSignInPressed}>
                      <Text style={styles.textLink}>
                        {i18n.t("BUTTONS.SIGNIN")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {spinner}
                </View>
              </View>
            </KeyboardAvoidingView>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purewhite,
    flex: 1
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.purewhite,
    height: "80%",
    width: 300
  },
  logo: {
    alignSelf: "center",
    height: "60%",
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
    width: 200,
    marginBottom: 10,
    padding: 10
  },
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
  containerLink: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "column",
    height: 40
  },
  datePicker: {
    alignSelf: "center",
    margin: 5,
    width: 175
  },
  textLink: {
    color: colors.black,
    fontWeight: "700",
    margin: 6,
    textAlign: "center"
  },
  mainContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    marginBottom: 5
  },
  dialogContainer: {
    alignItems: "center",
    backgroundColor: colors.purewhite,
    justifyContent: "center",
    height: "80%",
    width: "100%"
  },
  activityContainer: {
    backgroundColor: colors.white,
    marginBottom: 5
  },
  title: {
    fontSize: 25,
    marginBottom: 5
  },
  description: {
    fontSize: 15,
    marginBottom: 5
  },
  image: {
    width: "100%",
    height: 300
  }
});
