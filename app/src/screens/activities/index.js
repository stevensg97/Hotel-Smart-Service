import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import Dialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  DialogContent
} from "react-native-popup-dialog";
import { SCREENS, VALUES, BUTTONS, ALERTS } from "../../config/constants";
import { colors } from "../../config/styles";

export default class Activities extends Component {
  static navigationOptions = {
    title: SCREENS.ACTIVITIES
  };
  constructor() {
    super();
    this.state = {
      visible: false,
      calendar: []
    };
  }

  _onCalendarPressed = async () => {
    try {
      let response = await fetch(VALUES.URL + VALUES.CALENDARS);
      let responseJson = await response.json();
      this.setState({ calendar: [] });
      let array = [];
      for (var i = 0; i < responseJson.length; i++) {
        array[i] = {
          title: responseJson[i].activity.title,
          date: responseJson[i].date,
          description: responseJson[i].description,
          place: responseJson[i].service.title
        };
      }
      this.setState({ calendar: array });
      this.setState({ visible: true });
    } catch (error) {
      Alert.alert(BUTTONS.CALENDAR, ALERTS.FAILURE, [{ text: BUTTONS.OK }], {
        cancelable: false
      });
    }
  };

  componentDidMount() {
    let items = this.props.navigation.state.params.results;
    this.setState({
      dataSource: items
    });
  }

  render() {
    return (
      <ScrollView>
        <TouchableOpacity onPress={() => this._onCalendarPressed()}>
          <View style={styles.mainContainer}>
            <Text style={styles.title}>{BUTTONS.CALENDAR}</Text>
          </View>
        </TouchableOpacity>
        <Dialog
          visible={this.state.visible}
          footer={
            <DialogButton
              text="OK"
              onPress={() => {
                this.setState({ visible: false });
              }}
            />
          }
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom"
            })
          }
          dialogTitle={<DialogTitle title={BUTTONS.CALENDAR} />}
        >
          <DialogContent style={styles.dialogContainer}>
            <ScrollView>
              <FlatList
                data={this.state.calendar}
                renderItem={({ item }) => (
                  <View style={styles.activityContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>
                      {VALUES.DATE + item.date}
                    </Text>
                    <Text style={styles.description}>
                      {VALUES.DESCRIPTION + item.description}
                    </Text>
                    <Text style={styles.description}>
                      {VALUES.PLACE + item.place}
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
          </DialogContent>
        </Dialog>
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
  dialogContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "center",
    height: "80%"
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
    height: 200
  }
});
