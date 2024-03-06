import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  test('renders correctly', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen');
  });

  describe('Title Section', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date('2000-01-01T00:00:00'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('should contain current date', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Jan 01, 2000');
    });
  });
});
