import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import WeatherCurrent from './WeatherCurrent';
import {useNavigation} from '@react-navigation/native';
import LocationService from '../../../services/location/LocationService';
import {act} from 'react-test-renderer';
import {Colors} from '../../../constants';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  };
});

describe('WeatherCurrent', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders correctly', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByTestId('weather-current');
  });

  test('should render the label', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByText('Weather at my position');
  });

  test('should navigate to weather screen with location', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});

    const wrapper = render(<WeatherCurrent />);
    const button = wrapper.getByTestId('weather-current');
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

  describe('Loader', () => {
    test('should show loader when fetching location', async () => {
      let mockResolve: (position: {
        latitude: number;
        longitude: number;
      }) => void;

      jest.spyOn(LocationService, 'getCurrentPosition').mockImplementationOnce(
        () =>
          new Promise(resolve => {
            mockResolve = resolve;
          }),
      );

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await expect(
        wrapper.findByTestId('custom-button-loader'),
      ).resolves.toBeDefined();
      await act(async () => {
        mockResolve({latitude: 0, longitude: 0});
      });
    });

    test('should hide loader when fetching location is done', async () => {
      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(() => {
        expect(wrapper.queryByTestId('custom-button-loader')).toBeNull();
      });
    });

    test('should hide loader when fetching location fails', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(() => {
        expect(wrapper.queryByTestId('custom-button-loader')).toBeNull();
      });
    });
  });

  describe('Error', () => {
    test('should log error when fetching location fails', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const wrapper = render(<WeatherCurrent />);

      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);
      await waitFor(() => {
        expect(button).toHaveStyle({borderColor: Colors.ERROR});
      });
    });

    test('should be reset after fetching position again', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(() => {
        expect(button).toHaveStyle({borderColor: Colors.ERROR});
      });

      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockResolvedValueOnce({latitude: 0, longitude: 0});

      fireEvent.press(button);

      await waitFor(() => {
        expect(button).not.toHaveStyle({borderColor: Colors.ERROR});
      });
    });
  });
});
