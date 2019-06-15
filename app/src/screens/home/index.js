import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ImageBackground
} from "react-native";
import Dialog, {
  DialogTitle,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  DialogContent
} from "react-native-popup-dialog";
import i18n from "../../config/i18n";
import IconLogoBackground from "../../assets/logoBackground.png";
import IconInformation from "../../assets/information.png";
import IconRooms from "../../assets/rooms.png";
import IconServices from "../../assets/services.png";
import IconZone from "../../assets/zone.png";
import IconNetworks from "../../assets/networks.png";
import IconBook from "../../assets/book.png";
import IconExperiences from "../../assets/experiences.png";
import IconContact from "../../assets/contact.png";
import IconActivities from "../../assets/activities.png";
import IconLanguages from "../../assets/languages.png";
import {
  OPTIONS,
  OPTIONS_SCREENS,
  SCREENS,
  NUMBER_OF_COLUMNS,
  VALUES,
  ALERTS,
  BUTTONS
} from "../../config/constants";
import { colors, commonStyles } from "../../config/styles";

const images = [
  IconInformation,
  IconRooms,
  IconServices,
  IconZone,
  IconActivities,
  IconBook,
  IconExperiences,
  IconContact,
  IconNetworks,
  IconLanguages
];
const options = [
  OPTIONS.INFORMATION,
  OPTIONS.ROOMS,
  OPTIONS.SERVICES,
  OPTIONS.ZONE,
  OPTIONS.ACTIVITIES,
  OPTIONS.BOOK,
  OPTIONS.EXPERIENCES,
  OPTIONS.CONTACT,
  OPTIONS.NETWORKS,
  OPTIONS.LANGUAGES
];
const optionsScreens = [
  OPTIONS_SCREENS.INFORMATION,
  OPTIONS_SCREENS.ROOMS,
  OPTIONS_SCREENS.SERVICES,
  OPTIONS_SCREENS.ZONE,
  OPTIONS_SCREENS.ACTIVITIES,
  OPTIONS_SCREENS.BOOK,
  OPTIONS_SCREENS.EXPERIENCES,
  OPTIONS_SCREENS.CONTACT,
  OPTIONS_SCREENS.NETWORKS,
  OPTIONS_SCREENS.LANGUAGES
];

export default class Home extends Component {
  static navigationOptions = {
    title: SCREENS.HOME,
    headerLeft: null
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
      lang: "en",
      visible: false
    };
  }

  _onEnPressed = () => {
    this.setState({
      lang: "en"
    });
  };

  _onEsPressed = () => {
    this.setState({
      lang: "es"
    });
  };

  componentDidMount() {
    i18n.locale = this.state.lang;
    let items = Array.apply(null, Array(10)).map((v, i) => {
      return {
        id: i,
        src: images[i],
        option: options[i],
        optionScreen: optionsScreens[i]
      };
    });
    this.setState({
      dataSource: items
    });
  }

  componentDidUpdate() {
    i18n.locale = this.state.lang;
  }

  _onOptionPressed = async screen => {
    this.setState({ isLoading: true });
    let route;
    if (screen == OPTIONS_SCREENS.INFORMATION) {
      route = VALUES.INFORMATION;
    } else if (screen == OPTIONS_SCREENS.ROOMS) {
      route = VALUES.ROOMS;
    } else if (screen == OPTIONS_SCREENS.SERVICES) {
      route = VALUES.TYPES;
    } else if (screen == OPTIONS_SCREENS.ZONE) {
      route = VALUES.ZONE;
    } else if (screen == OPTIONS_SCREENS.NETWORKS) {
      route = VALUES.NETWORKS;
    } else if (screen == OPTIONS_SCREENS.BOOK) {
      this.setState({ isLoading: false });
      return this.props.navigation.navigate(screen, { lang: this.state.lang });
    } else if (screen == OPTIONS_SCREENS.EXPERIENCES) {
      route = VALUES.EXPERIENCES;
    } else if (screen == OPTIONS_SCREENS.CONTACT) {
      route = VALUES.CONTACT;
    } else if (screen == OPTIONS_SCREENS.ACTIVITIES) {
      route = VALUES.ACTIVITIES;
    } else if (screen == OPTIONS_SCREENS.LANGUAGES) {
      return this.setState({ isLoading: false, visible: true });
    }
    try {
      let response = await fetch(VALUES.URL + route);
      let responseJson = await response.json();
      this.setState({ isLoading: false });
      this.props.navigation.navigate(screen, {
        results: responseJson,
        lang: this.state.lang
      });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      Alert.alert(VALUES.ERROR, ALERTS.FAILURE, [{ text: BUTTONS.OK }], {
        cancelable: false
      });
    }
  };

  _selectedButtonStyle = function(value) {
    if (this.state.lang == value) {
      return commonStyles.selectedButtonContainer;
    } else {
      return styles.buttonContainer;
    }
  };

  _selectedButtonTextStyle = function(value) {
    if (this.state.lang == value) {
      return commonStyles.selectedButtonText;
    } else {
      return styles.buttonText;
    }
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <ImageBackground source={IconLogoBackground} style={styles.mainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.optionContainer}>
              <TouchableOpacity
                onPress={() => this._onOptionPressed(item.optionScreen)}
              >
                <Image style={styles.imageThumbnail} source={item.src} />
                <Text style={styles.optionText}>
                  {i18n.t("OPTIONS." + item.option)}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={NUMBER_OF_COLUMNS}
          keyExtractor={(item, index) => index}
        />
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
                  let items = Array.apply(null, Array(10)).map((v, i) => {
                    return {
                      id: i,
                      src: images[i],
                      option: options[i],
                      optionScreen: optionsScreens[i]
                    };
                  });
                  this.setState({
                    dataSource: items
                  });
                  this.setState({ visible: false });
                }}
              />
            </DialogFooter>
          }
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "right"
            })
          }
          dialogTitle={
            <DialogTitle
              title={i18n.t("OPTIONS.Languages")} /* {SCREENS.LANGUAGES} */
            />
          }
        >
          <DialogContent style={styles.dialogContainer}>
            <View style={{ width: 300, height: 200 }}>
              <TouchableOpacity
                onPress={() => {
                  this._onEnPressed();
                }}
                style={this._selectedButtonStyle("en")}
              >
                <Text style={this._selectedButtonTextStyle("en")}>
                  {i18n.t("LANGUAGES.EN")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this._onEsPressed();
                }}
                style={this._selectedButtonStyle("es")}
              >
                <Text style={this._selectedButtonTextStyle("es")}>
                  {i18n.t("LANGUAGES.ES")}
                </Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
        {spinner}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  dialogContainer: {
    alignItems: "center",
    backgroundColor: colors.purewhite,
    justifyContent: "center",
    height: "80%",
    width: "100%"
  },
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    paddingTop: 30
  },
  optionContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 1
  },
  imageThumbnail: {
    alignItems: "center",
    borderColor: colors.deepgreen,
    borderRadius: 8,
    borderWidth: 5,
    height: 100,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 100
  },
  optionText: {
    color: colors.deepgreen,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  }
});
