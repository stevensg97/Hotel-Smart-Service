import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SCREENS, VALUES, OPTIONS_SCREENS, ALERTS, BUTTONS } from "../../config/constants";
import { colors } from "../../config/styles";

const optionsScreens = [
  OPTIONS_SCREENS.AIRPORTS,
  OPTIONS_SCREENS.CASINOS,
  OPTIONS_SCREENS.BEACHES,
  OPTIONS_SCREENS.GROUPS,
  OPTIONS_SCREENS.POOLS,
  OPTIONS_SCREENS.RESTAURANTS,
];

export default class Services extends Component {
  static navigationOptions = {
    title: SCREENS.SERVICES
  };
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  _onOptionPressed = async screen => {
    this.setState({ isLoading: true });
    try {
      let response = await fetch(VALUES.URL + VALUES.SERVICES );
      let responseJson = await response.json();
      console.log(responseJson);
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

  componentDidMount() {
    let array = this.props.navigation.state.params.results;
    let items = Array.apply(null, Array(array.length)).map((v, i) => {
      return {
        id: i,
        type: array[i].type,
        image: array[i].image,
        optionScreen: optionsScreens[i]
      };
    });
    this.setState({
      dataSource: items
    });
  }

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;
    return (
      <ScrollView>
        {spinner}
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this._onOptionPressed(item.optionScreen)}
            >
              <View style={styles.mainContainer}>
                <Text style={styles.title}>{item.type}</Text>
                <Image
                  source={{
                    uri: VALUES.URL + item.image.url.substring(1)
                  }}
                  resizeMode={"cover"}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
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
    height: 200
  }
});
