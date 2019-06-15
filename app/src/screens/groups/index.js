import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList
} from "react-native";

import { SCREENS, VALUES } from "../../config/constants";
import { colors } from "../../config/styles";

export default class Groups extends Component {
  static navigationOptions = {
    title: SCREENS.GROUPS
  };
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    let array = this.props.navigation.state.params.results;
    let items = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].type.type == VALUES.GROUP) {
        items.push(array[i]);
      }
    }
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
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Image
                source={{
                  uri: VALUES.URL + item.image.url.substring(1)
                }}
                resizeMode={"cover"}
                style={styles.image}
              />
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
    width: "100%",
    height: 200
  }
});
