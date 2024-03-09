import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import WeatherScreen from '../WeatherScreen';
import {useNavigation} from '@react-navigation/native';
import WeatherService from '../../services/weather/WeatherService';
import {WeatherType} from '../../services/weather/WeatherTypes.interface';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({goBack: jest.fn()}),
    useRoute: jest
      .fn()
      .mockReturnValue({params: {position: {latitude: 0, longitude: 0}}}),
  };
});

jest.mock('../../services/weather/WeatherService', () => {
  return {
    fetchCurrentWeather: jest.fn(),
  };
});

describe('Weather Screen', () => {
  test('should render correctly', () => {
    const wrapper = render(<WeatherScreen />);
    wrapper.getByTestId('weather-screen');
  });

  test('should return to home screen when back button is pressed', () => {
    const mockGoBack = jest.fn();

    (useNavigation as jest.Mock).mockReturnValueOnce({goBack: mockGoBack});
    const wrapper = render(<WeatherScreen />);
    const backButton = wrapper.getByText('Home');
    fireEvent.press(backButton);
    waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  test('should render loading indicator when fetching weather', () => {
    const wrapper = render(<WeatherScreen />);
    wrapper.getByTestId('loading-indicator');
  });

  test('should render weather information when loaded', async () => {
    const mockWeatherResponse: WeatherType = {
      city: 'Test City',
      description: 'Test Description',
      icon: 'Test Icon',
      temperature: 20,
      windSpeed: 10,
      humidity: 50,
      pressure: 1000,
    };

    (WeatherService.fetchCurrentWeather as jest.Mock).mockResolvedValueOnce(
      mockWeatherResponse,
    );

    const wrapper = render(<WeatherScreen />);

    await waitFor(() => {
      wrapper.getByText(mockWeatherResponse.city);
      wrapper.getByText(mockWeatherResponse.description as string);
      wrapper.getByText(`Temperature: ${mockWeatherResponse.temperature}°`);
      wrapper.getByText(`Wind: ${mockWeatherResponse.windSpeed}m/s`);
      wrapper.getByText(`Humidity: ${mockWeatherResponse.humidity}%`);
    });
  });

  test("should render de uri's image", async () => {
    const mockWeatherResponse: WeatherType = {
      city: 'Test City',
      description: 'Test Description',
      icon: 'Test Icon',
      temperature: 20,
      windSpeed: 10,
      humidity: 50,
      pressure: 1000,
    };

    (WeatherService.fetchCurrentWeather as jest.Mock).mockResolvedValueOnce(
      mockWeatherResponse,
    );

    const wrapper = render(<WeatherScreen />);

    await waitFor(() => {
      expect(wrapper.getByTestId('weather-icon').props.source.uri).toBe(
        mockWeatherResponse.icon,
      );
    });
  });
});
