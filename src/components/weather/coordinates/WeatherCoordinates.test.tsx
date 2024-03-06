import React from 'react';
import {render} from '@testing-library/react-native';
import WeatherCoordinates from './WeatherCoordinates';

describe('WeatherCoordinates', () => {
  test('renders correctly', () => {
    const wrapper = render(<WeatherCoordinates />);
    wrapper.getByTestId('weather-coordinates');
  });
});
