import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants';

type CustomButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
} & ViewProps;

function CustomButton(props: CustomButtonProps) {
  const {label, onPress, loading, style, ...others} = props;
  return (
    <TouchableOpacity testID="custom-button" onPress={onPress}>
      <LinearGradient
        {...others}
        colors={[Colors.LIGHTER_GRAY, Colors.DARK_GRAY]}
        style={[styles.container, style]}>
        {loading ? (
          <ActivityIndicator
            testID="custom-button-loader"
            size={24}
            color="white"
          />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 19,
    color: 'white',
  },
});

export default CustomButton;
