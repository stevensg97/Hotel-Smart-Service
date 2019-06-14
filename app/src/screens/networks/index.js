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

export default class Networks extends Component {
  static navigationOptions = {
    title: SCREENS.NETWORKS
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
              <Text style={styles.title}>{item.network}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                <Image
                  source={{
                    uri: VALUES.URL + item.image.url.substring(1)
                  }}
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
    fontSize: 15,
    marginBottom: 5
  },
  image: {
    width: 64,
    height: 64
  }
});
