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
import i18n from "../../config/i18n";
import { SCREENS, VALUES } from "../../config/constants";
import { colors, commonStyles } from "../../config/styles";

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
      Alert.alert(
        i18n.t("BUTTONS.CALENDAR"),
        i18n.t("ALERTS.FAILURE"),
        [{ text: i18n.t("BUTTONS.OK") }],
        {
          cancelable: false
        }
      );
    }
  };

  componentDidMount() {
    i18n.locale = this.props.navigation.state.params.lang;
    let items = this.props.navigation.state.params.results;
    this.setState({
      dataSource: items
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this._onCalendarPressed()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>{i18n.t("BUTTONS.CALENDAR")}</Text>
        </TouchableOpacity>
        <ScrollView>
          <Dialog
            visible={this.state.visible}
            footer={
              <DialogButton
                text={i18n.t("BUTTONS.OK")}
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
            dialogTitle={<DialogTitle title={i18n.t("BUTTONS.CALENDAR")} />}
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
      </View>
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
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
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
