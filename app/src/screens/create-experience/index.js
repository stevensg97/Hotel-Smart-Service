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
import { Constants, ImagePicker, Permissions } from "expo";
import uuid from "uuid";
import Environment from "../../config/environment";
import firebase from "../../utils/firebase";
import { SCREENS, VALUES, BUTTONS, ALERTS } from "../../config/constants";
import { colors, commonStyles } from "../../config/styles";

console.disableYellowBox = true;

export default class CreateExperience extends Component {
  static navigationOptions = {
    title: SCREENS.CREATE_EXPERIENCE
  };
  constructor() {
    super();
    this.state = {
      comentaryString: "",
      image: null,
      uploading: false,
      googleResponse: null,
      isLoading: false
    };
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  _onComentaryTextChanged = event => {
    this.setState({
      comentaryString: event.nativeEvent.text
    });
  };

  _onCreateExperiencePressed = async () => {
    try {
      let response = await fetch(VALUES.URL + VALUES.EXPERIENCES, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          comentary: this.state.comentaryString,
          rating: this.state.googleResponse.responses[0].faceAnnotations[0]
            .joyLikelihood,
          image: this.state.image,
          name: this.props.navigation.state.params.name,
          lastname: this.props.navigation.state.params.lastname
        })
      });
      let responseJson = await response.json();
      this.setState({ isLoading: false });
      this.props.navigation.navigate(SCREENS.HOME);
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert(BUTTONS.SIGNIN, ALERTS.FAILURE, [{ text: BUTTONS.OK }], {
        cancelable: false
      });
    }
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry.");
    } finally {
      this.setState({ uploading: false });
    }
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    this._handleImagePicked(pickerResult);
  };

  submitToGoogle = async () => {
    try {
      this.setState({ isLoading: true });
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: "FACE_DETECTION", maxResults: 5 }],
            image: {
              source: {
                imageUri: image
              }
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      this.setState({
        googleResponse: responseJson,
        uploading: false
      });
      this._onCreateExperiencePressed();
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
    //let { image } = this.state;
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Type a comentary</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={6}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              value={this.state.comentaryString}
              onChange={this._onComentaryTextChanged}
              underlineColorAndroid={colors.transparent}
              returnKeyType="done"
              placeholder="Type a comentary"
            />
            <Text style={styles.title}>Upload a selfie</Text>

            <Image
              source={{ uri: this.state.image }}
              resizeMode={"contain"}
              style={styles.image}
            />
            {spinner}
            <View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._takePhoto}
              >
                <Text style={styles.buttonText}>Take a photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._pickImage}
              >
                <Text style={styles.buttonText}>
                  Pick an image from camera roll
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.submitToGoogle}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
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
    textAlignVertical: "top",
    color: colors.black,
    height: 160,
    width: 300,
    marginBottom: 10,
    marginTop: 10,
    padding: 10
  },
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
  containerLink: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "column"
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
    fontSize: 20,
    marginBottom: 5
  },
  description: {
    fontSize: 15,
    marginBottom: 5
  },
  image: {
    width: "100%",
    height: 300
  }
});
