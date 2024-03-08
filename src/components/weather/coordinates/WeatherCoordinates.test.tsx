import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import WeatherCoordinates from './WeatherCoordinates';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  };
});

describe('WeatherCoordinates', () => {
  test('renders correctly', () => {
    const wrapper = render(<WeatherCoordinates />);
    wrapper.getByTestId('weather-coordinates');
  });

  test('should navigate to weather screen with given coordinates when valid form is submitted', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({navigate: mockNavigate});

    const wrapper = render(<WeatherCoordinates />);

    const fields = {
      latitude: wrapper.getByTestId('weather-coordinates-latitude'),
      longitude: wrapper.getByTestId('weather-coordinates-longitude'),
    };

    fireEvent.changeText(fields.latitude, '0');
    fireEvent.changeText(fields.longitude, '0');

    const button = wrapper.getByTestId('weather-coordinates-submit');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        position: {
          latitude: 0,
          longitude: 0,
        },
      });
    });
  });

  describe('latitude input', () => {
    test('should not show error when values is the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '-90');

      await expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('should not show error when value is the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '90');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('should show error when value is below the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '-91');

      await waitFor(() => {
        expect(
          wrapper.getByText('Latitude must be a valid number'),
        ).toBeDefined();
      });
    });

    test('should show error when value is above the highest range value', async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '91');

      await waitFor(() => {
        expect(
          wrapper.getByText('Latitude must be a valid number'),
        ).toBeDefined();
      });
    });

    test('should show error when value is not a number', async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, 'not a number');

      await waitFor(() => {
        expect(
          wrapper.getByText('Latitude must be a valid number'),
        ).toBeDefined();
      });
    });
  });

  describe('longitude input', () => {
    test('should not show error when values is the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '-180');

      await expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('should not show error when value is the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '180');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('should show error when value is below the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '-181');

      await waitFor(() => {
        expect(
          wrapper.getByText('Longitude must be a valid number'),
        ).toBeDefined();
      });
    });

    test('should show error when value is above the highest range value', async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '181');

      await waitFor(() => {
        expect(
          wrapper.getByText('Longitude must be a valid number'),
        ).toBeDefined();
      });
    });

    test('should show error when value is not a number', async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, 'not a number');

      await waitFor(() => {
        expect(
          wrapper.getByText('Longitude must be a valid number'),
        ).toBeDefined();
      });
    });
  });
});
