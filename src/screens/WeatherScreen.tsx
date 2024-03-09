import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WeatherService from '../services/weather/WeatherService';
import {WeatherType} from '../services/weather/WeatherTypes.interface';
import {RootStackParamList} from '.';

type NavigationProp = RouteProp<RootStackParamList, 'Weather'>;

function WeatherScreen() {
  const [weatherResponse, setWeatherResponse] = useState<WeatherType | null>();
  const [loading, setLoading] = useState(false);
  const {goBack} = useNavigation();
  const route = useRoute<NavigationProp>();
  const {position} = route.params;
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const response = await WeatherService.fetchCurrentWeather(
        position.latitude,
        position.longitude,
      );
      if (response) {
        setWeatherResponse(response);
        setLoading(false);
      }
    };
    fetchWeather();
  }, [position]);

  return (
    <View testID="weather-screen" style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={goBack}>
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color="black"
        />
      ) : (
        <View style={styles.infoContainer}>
          <Image
            style={styles.icon}
            source={{uri: weatherResponse?.icon} as ImageProps}
          />
          <Text>{weatherResponse?.city}</Text>
          <Text>{weatherResponse?.description}</Text>
          <Text>Stats</Text>
          <Text>Temperature: {weatherResponse?.temperature}°</Text>
          <Text>Wind: {weatherResponse?.windSpeed}m/s</Text>
          <Text>Humidity: {weatherResponse?.humidity}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  back: {position: 'absolute', top: 70, left: 20},
  backText: {fontSize: 24},
  icon: {width: 400, height: 400, alignSelf: 'center'},
  infoContainer: {alignItems: 'center'},
});

export default WeatherScreen;
