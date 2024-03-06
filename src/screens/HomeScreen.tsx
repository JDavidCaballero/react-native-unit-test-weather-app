import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {Colors} from '../constants';
import WeatherCurrent from '../components/weather/current/WeatherCurrent';
import WeatherCoordinates from '../components/weather/coordinates/WeatherCoordinates';

function HomeScreen() {
  const now = moment(new Date());
  return (
    <LinearGradient
      colors={[Colors.LIGHT_GRAY, Colors.DARKER_GRAY]}
      testID="home-screen"
      style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.date}>{now.format('MMM DD, YYYY')}</Text>
        <Text style={styles.day}>{now.format('dddd')}</Text>
      </View>
      <WeatherCurrent />
      <Text testID="home-screen-divider" style={styles.divider}>
        Or
      </Text>
      <WeatherCoordinates />
    </LinearGradient>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  title: {justifyContent: 'flex-end'},
  date: {color: Colors.GRAY, fontSize: 13},
  day: {
    color: 'white',
    fontSize: 21,
  },
  divider: {color: 'white', textAlign: 'center'},
});
