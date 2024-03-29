import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';
import AppNavigator from '../screens';
import {View} from 'react-native';

jest.mock('../screens', () => jest.fn());

describe('App', () => {
  test('should render routes', () => {
    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID="mock-routes" />,
    );
    const wrapper = render(<App />);
    wrapper.getByTestId('mock-routes');
  });
});
