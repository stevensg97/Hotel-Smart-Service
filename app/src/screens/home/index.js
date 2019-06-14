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
import IconLogoBackground from '../../assets/logoBackground.png';
//import IconSettings from '../../assets/settings.png';
import IconInformation from "../../assets/information.png";
import IconRooms from "../../assets/rooms.png";
import IconServices from "../../assets/services.png";
import IconZone from "../../assets/zone.png";
import IconNetworks from "../../assets/networks.png";
import IconBook from "../../assets/book.png";
import IconExperiences from "../../assets/experiences.png";
import IconContact from "../../assets/contact.png";
import IconActivities from "../../assets/activities.png";
import {
  OPTIONS,
  OPTIONS_SCREENS,
  SCREENS,
  NUMBER_OF_COLUMNS,
  VALUES,
  ALERTS,
  BUTTONS
} from "../../config/constants";
import { colors } from "../../config/styles";

const images = [
  IconInformation,
  IconRooms,
  IconServices,
  IconZone,
  IconActivities,
  IconBook,
  IconExperiences,
  IconContact,
  IconNetworks
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
  OPTIONS.NETWORKS
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
  OPTIONS_SCREENS.NETWORKS
];

export default class Home extends Component {
  static navigationOptions = {
    title: SCREENS.HOME,
    headerLeft: null
  };
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    let items = Array.apply(null, Array(9)).map((v, i) => {
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
      return this.props.navigation.navigate(screen);
    } else if (screen == OPTIONS_SCREENS.EXPERIENCES) {
      route = VALUES.EXPERIENCES;
    } else if (screen == OPTIONS_SCREENS.CONTACT) {
      route = VALUES.CONTACT;
    } else if (screen == OPTIONS_SCREENS.ACTIVITIES) {
      route = VALUES.ACTIVITIES;
    }
    try {
      let response = await fetch(VALUES.URL + route);
      let responseJson = await response.json();
      this.setState({ isLoading: false });
      this.props.navigation.navigate(screen, { results: responseJson });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      Alert.alert(VALUES.ERROR, ALERTS.FAILURE, [{ text: BUTTONS.OK }], {
        cancelable: false
      });
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
                <Text style={styles.optionText}>{item.option}</Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={NUMBER_OF_COLUMNS}
          keyExtractor={(item, index) => index}
        />
        {spinner}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
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
