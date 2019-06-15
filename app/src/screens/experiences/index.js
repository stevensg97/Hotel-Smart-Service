import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  StatusBar,
  TextInput
} from "react-native";
import Dialog, {
  DialogTitle,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  DialogContent
} from "react-native-popup-dialog";
import i18n from "../../config/i18n";
import {
  SCREENS,
  VALUES,
  OPTIONS_SCREENS
} from "../../config/constants";
import IconLogo from "../../assets/logo.png";
import { colors, commonStyles } from "../../config/styles";

export default class Experiences extends Component {
  static navigationOptions = {
    title: SCREENS.EXPERIENCES
  };
  constructor() {
    super();
    this.state = {
      visible: false,
      calendar: [],
      emailString: "",
      passwordString: "",
      isLoading: false
    };
  }

  _onCreateExperiencePressed = () => {
    this.setState({ visible: true });
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
          this.setState({ visible: false });
          this.props.navigation.navigate(OPTIONS_SCREENS.CREATE_EXPERIENCE, {
            name: responseJson[i].name,
            lastname: responseJson[i].lastname,
            lang: this.props.navigation.state.params.lang
          });
          this.setState({ emailString: "" });
          this.setState({ passwordString: "" });
          break;
        } else if (i + 1 == responseJson.length) {
          this.setState({ isLoading: false });
          Alert.alert(i18n.t("SCREENS.LOGIN"), i18n.t("ALERTS.WRONG"), [{ text: i18n.t("BUTTONS.OK") }], {
            cancelable: false
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      Alert.alert(i18n.t("SCREENS.LOGIN"), i18n.t("ALERTS.FAILURE"), [{ text: i18n.t("BUTTONS.OK") }], {
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
    this.setState({ visible: false });
    this.props.navigation.navigate(SCREENS.SIGNIN, {lang: this.props.navigation.state.params.lang});
  };

  componentDidMount() {
    i18n.locale = this.props.navigation.state.params.lang;
    let items = this.props.navigation.state.params.results;
    for (let i = 0; i < items.length; i++) {
      if (items[i].rating == "UNKNOWN" || items[i].rating == "VERY_UNLIKELY") {
        items[i].rating = "\u2606";
      } else if (items[i].rating == "UNLIKELY") {
        items[i].rating = "\u2606\u2606";
      } else if (items[i].rating == "POSSIBLE") {
        items[i].rating = "\u2606\u2606\u2606";
      } else if (items[i].rating == "LIKELY") {
        items[i].rating = "\u2606\u2606\u2606\u2606";
      } else if (items[i].rating == "VERY_LIKELY") {
        items[i].rating = "\u2606\u2606\u2606\u2606\u2606";
      }
    }
    this.setState({
      dataSource: items
    });
  }

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;
    return (
      <View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => this._onCreateExperiencePressed()}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>{i18n.t("BUTTONS.CREATE_EXPERIENCE")}</Text>
          </TouchableOpacity>
          <Dialog
            visible={this.state.visible}
            footer={
              <DialogFooter>
                <DialogButton
                  text={i18n.t("BUTTONS.CANCEL")}
                  onPress={() => {
                    this.setState({ visible: false });
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
              this.setState({ visible: false });
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
                        <Text style={styles.textLink}>{i18n.t("BUTTONS.SIGNIN")}</Text>
                      </TouchableOpacity>
                    </View>
                    {spinner}
                  </View>
                </View>
              </KeyboardAvoidingView>
            </DialogContent>
          </Dialog>
        </ScrollView>
        <ScrollView>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={styles.mainContainer}>
                <Text style={styles.title}>
                  {item.name + " " + item.lastname}
                </Text>
                <Text style={styles.description}>
                  {'"' + item.comentary + '"'}
                </Text>
                <Text style={styles.description}>
                  {i18n.t("VALUES.RATING") + item.rating}
                </Text>
                <Image
                  source={{
                    uri: item.image
                  }}
                  resizeMode={"contain"}
                  style={styles.image}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
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
  containerLink: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "column",
    height: 40
  },
  textLink: {
    color: colors.black,
    fontWeight: "700",
    margin: 6,
    textAlign: "center"
  },
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
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
    fontSize: 18,
    marginBottom: 5
  },
  image: {
    width: "100%",
    height: 300
  }
});
