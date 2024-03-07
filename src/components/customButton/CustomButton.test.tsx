import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  test('should render the custom button', () => {
    const wrapper = render(<CustomButton label="" onPress={jest.fn()} />);
    wrapper.getByTestId('custom-button');
  });

  test('should render the loader when loading', () => {
    const wrapper = render(
      <CustomButton label="" onPress={jest.fn()} loading />,
    );
    wrapper.getByTestId('custom-button-loader');
  });

  test('should call the onPress function when clicked', () => {
    const mockOnPress = jest.fn();
    const wrapper = render(<CustomButton label="" onPress={mockOnPress} />);
    const button = wrapper.getByTestId('custom-button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  test('should render the label', () => {
    const label = 'Custom Button';
    const wrapper = render(<CustomButton label={label} onPress={jest.fn()} />);
    wrapper.getByText(label);
  });

  test('should accept custom view props', () => {
    const wrapper = render(
      <CustomButton
        label="Custom Button"
        onPress={jest.fn()}
        testID="mock-test-id"
      />,
    );
    wrapper.getByTestId('mock-test-id');
  });
});
