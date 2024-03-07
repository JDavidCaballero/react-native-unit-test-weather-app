import React from 'react';
import {render} from '@testing-library/react-native';
import WeatherScreen from '../WeatherScreen';

describe('Weather Screen', () => {
  test('should render correctly', () => {
    const wrapper = render(<WeatherScreen />);
    wrapper.getByTestId('weather-screen');
  });
});
