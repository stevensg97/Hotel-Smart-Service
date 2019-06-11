import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { colors } from '../../config/styles';
import {
  SCREENS,
  BUTTONS,
  VALUES,
  PLACEHOLDERS,
  ALERTS
} from '../../config/constants';

export default class Statistics extends Component {
  static navigationOptions = {
    title: SCREENS.STATISTICS
  };

  constructor(props) {
    super(props);
    this.state = {
      initialDate: '',
      finalDate: '',
    };
  }

  _onWaterConsumptionByDatePressed = async () => {
    try {
      let response = await fetch(VALUES.URL+
        VALUES.STATISTICS+'/'+VALUES.FIND_BY_DATE+'?'+
        VALUES.IDATE+'='+this.state.initialDate+'&'+
        VALUES.FDATE+'='+this.state.finalDate);
      let responseJson = await response.json();
      let totalLiters = 0;
      for(var i = 0; i < responseJson.length; i++){
        totalLiters = totalLiters + responseJson[i].liters;
      }
      Alert.alert(
        VALUES.WATER_CONSUMPTION,
        totalLiters+' '+VALUES.LITERS,
        [{ text: BUTTONS.OK }],
        { cancelable: false }
      )
    } catch (error) {
        Alert.alert(
          BUTTONS.STATISTICS,
          ALERTS.FAILURE,
          [{ text: BUTTONS.OK }],
          { cancelable: false }
        );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerOption}>
          <Text style={styles.title}>{VALUES.WATER_CONSUMPTION}</Text>
          <DatePicker
            style={styles.datePicker}
            date={this.state.initialDate}
            mode={VALUES.DATE}
            placeholder={PLACEHOLDERS.INITIAL_DATE}
            format={VALUES.DATE_FORMAT}
            minDate={VALUES.MIN_DATE}
            maxDate={VALUES.MAX_DATE}
            confirmBtnText={BUTTONS.CONFIRM}
            cancelBtnText={BUTTONS.CANCEL}
            customStyles={{
              dateIcon: styles.dateIcon,
              dateInput: styles.dateInput
            }}
            onDateChange={date => {
              this.setState({ initialDate: date });
            }}
          />
          <DatePicker
            style={styles.datePicker}
            date={this.state.finalDate}
            mode={VALUES.DATE}
            placeholder={PLACEHOLDERS.FINAL_DATE}
            format={VALUES.DATE_FORMAT}
            minDate={VALUES.MIN_DATE}
            maxDate={VALUES.MAX_DATE}
            confirmBtnText={BUTTONS.CONFIRM}
            cancelBtnText={BUTTONS.CANCEL}
            customStyles={{
              dateIcon: styles.dateIcon,
              dateInput: styles.dateInput
            }}
            onDateChange={date => {
              this.setState({ finalDate: date });
            }}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._onWaterConsumptionByDatePressed}
          >
            <Text style={styles.buttonText}>{BUTTONS.DONE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  containerOption: {
    padding: 5
  },
  title: {
    alignSelf: 'center',
    color: colors.black,
    fontSize: 30
  },
  datePicker: {
    alignSelf: 'center',
    margin: 5,
    width: 175,
  },
  dateIcon: {
    left: 0,
    marginLeft: 0,
    position: 'absolute',
    top: 4,
  },
  dateInput: {
    borderRadius: 15,
    marginLeft: 36,
    marginRight: 36,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: colors.black,
    borderRadius: 15,
    margin: 5,
    paddingVertical: 5,
    width: 100
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center'
  },
  switch: {
    alignSelf: 'center'
  }
});
