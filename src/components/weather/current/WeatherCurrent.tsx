import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LocationService from '../../../services/location/LocationService';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../screens';
import CustomButton from '../../customButton/CustomButton';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Weather'>;

function WeatherCurrent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleFetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const position = await LocationService.getCurrentPosition();
      navigation.navigate('Weather', {position});
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  return (
    <CustomButton
      testID="weather-current"
      label="Weather at my position"
      onPress={handleFetchWeather}
      loading={loading}
      style={error && style.error}
    />
  );
}

const style = StyleSheet.create({
  error: {borderColor: Colors.ERROR, borderWidth: 1, borderRadius: 10},
});

export default WeatherCurrent;
