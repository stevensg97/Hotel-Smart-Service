import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import IconLogo from '../../assets/logo.png';
import IconSettings from '../../assets/settings.png';
import IconInformation from '../../assets/information.png';
import IconRooms from '../../assets/rooms.png';
import IconServices from '../../assets/services.png';
import IconZone from '../../assets/zone.png';
import IconNetworks from '../../assets/networks.png';
import IconExperiences from '../../assets/experiences.png';
import IconContact from '../../assets/contact.png';
import IconActivities from '../../assets/activities.png';
import {
  OPTIONS,
  OPTIONS_SCREENS,
  SCREENS,
  NUMBER_OF_COLUMNS
} from '../../config/constants';
import { colors } from '../../config/styles';

const images = [
  IconLogo,
  IconSettings,
  IconInformation,
  IconRooms,
  IconServices,
  IconZone,
  IconNetworks,
  IconExperiences,
  IconContact,
  IconActivities
];
const options = [
  OPTIONS.SMART_SHOWER, 
  OPTIONS.SETTINGS, 
  OPTIONS.INFORMATION, 
  OPTIONS.ROOMS, 
  OPTIONS.SERVICES, 
  OPTIONS.ZONE, 
  OPTIONS.SOCIAL_NETWORKS, 
  OPTIONS.EXPERIENCES, 
  OPTIONS.CONTACT, 
  OPTIONS.ACTIVITIES
];
const optionsScreens = [
  OPTIONS_SCREENS.SHOWER, 
  OPTIONS_SCREENS.SETTINGS,
  OPTIONS_SCREENS.INFORMATION, 
  OPTIONS_SCREENS.ROOMS, 
  OPTIONS_SCREENS.SERVICES, 
  OPTIONS_SCREENS.ZONE, 
  OPTIONS_SCREENS.SOCIAL_NETWORKS, 
  OPTIONS_SCREENS.EXPERIENCES, 
  OPTIONS_SCREENS.CONTACT, 
  OPTIONS_SCREENS.ACTIVITIES
];

export default class Home extends Component {
  static navigationOptions = {
    title: SCREENS.HOME,
    headerLeft: null,
  }
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    /* BackHandler.addEventListener('hardwareBackPress',() => {
      return true;
    }); */

    let items = Array.apply(null, Array(10)).map((v, i) => {
      return { id: i, src: images[i], option: options[i], optionScreen: optionsScreens[i] };
    });
    this.setState({
      dataSource: items,
    });
  };


  _onOptionPressed = (screen) => {
    return this.props.navigation.navigate(screen);
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.optionContainer}>
              <TouchableOpacity onPress={() => this._onOptionPressed(item.optionScreen)}>
                <Image style={styles.imageThumbnail} source={item.src} />
                <Text style={styles.optionText}>{item.option}</Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={NUMBER_OF_COLUMNS}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  imageThumbnail: {
    alignItems: 'center',
    borderColor: colors.deepgreen,
    borderRadius: 8,
    borderWidth: 5,
    height: 100,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 100,
  },
  optionText: {
    color: colors.deepgreen,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
