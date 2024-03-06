import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import {View} from 'react-native';
import WeatherCurrent from '../../components/weather/current/WeatherCurrent';
import WeatherCoordinates from '../../components/weather/coordinates/WeatherCoordinates';

jest.mock('../../components/weather/current/WeatherCurrent', () =>
  jest.fn().mockReturnValue(null),
);

jest.mock('../../components/weather/coordinates/WeatherCoordinates', () =>
  jest.fn().mockReturnValue(null),
);

describe('HomeScreen', () => {
  test('renders correctly', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen');
  });

  describe('Title Section', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern' as any);
      jest.setSystemTime(new Date('2000-01-01T00:00:00'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('should contain current date', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Jan 01, 2000');
    });

    test('should contain current day', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Saturday');
    });
  });

  test('should contain a section to get a current weather', () => {
    (WeatherCurrent as jest.Mock).mockReturnValue(
      <View testID="mock-weather-current" />,
    );

    const wrapper = render(<HomeScreen />);

    wrapper.getByTestId('mock-weather-current');
  });

  test('should contain a divider', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen-divider');
  });

  test('should contain a section to get a weather coordinates', () => {
    (WeatherCoordinates as jest.Mock).mockReturnValue(
      <View testID="mock-weather-coordinates" />,
    );

    const wrapper = render(<HomeScreen />);

    wrapper.getByTestId('mock-weather-coordinates');
  });
});
