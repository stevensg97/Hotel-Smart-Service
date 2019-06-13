import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking
} from "react-native";

import { SCREENS, VALUES } from "../../config/constants";
import { colors } from "../../config/styles";
import IconLogo from "../../assets/logo.png";

export default class Contact extends Component {
  static navigationOptions = {
    title: SCREENS.CONTACT
  };
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    let items = this.props.navigation.state.params.results;
    this.setState({
      dataSource: items
    });
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.mainContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.location}</Text>
              <Text style={styles.description}>{item.phonenumber}</Text>
              <Text style={styles.description}>{item.email}</Text>
              <TouchableOpacity
                style={styles.mainContainer}
                onPress={() => Linking.openURL(item.webpage)}
              >
                <Text style={styles.description}>{VALUES.WEBPAGE}</Text>
                <Image
                  source={IconLogo}
                  resizeMode={"cover"}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
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
    fontSize: 20,
    marginBottom: 5
  },
  image: {
    width: 128,
    height: 128
  }
});
