import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {RootStackParamList} from '../../../screens';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomButton from '../../customButton/CustomButton';
import {Colors} from '../../../constants';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Weather'>;

interface FormValues {
  latitude: string;
  longitude: string;
}
function WeatherCoordinates() {
  const navigation = useNavigation<NavigationProp>();

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(values => {
    const position = {
      latitude: parseFloat(values.latitude),
      longitude: parseFloat(values.longitude),
    };
    navigation.navigate('Weather', {position});
  });

  return (
    <View testID="weather-coordinates">
      <View style={styles.inputs}>
        <Controller
          control={form.control}
          name="latitude"
          render={({field: {onChange, ...p}}) => (
            <TextInput
              {...p}
              testID="weather-coordinates-latitude"
              onChangeText={onChange}
              style={styles.input}
              placeholder="Latitude"
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        {form.formState.errors.latitude && (
          <Text style={styles.error}>Latitude must be a valid number</Text>
        )}
        <Controller
          control={form.control}
          name="longitude"
          render={({field: {onChange, ...p}}) => (
            <TextInput
              {...p}
              testID="weather-coordinates-longitude"
              onChangeText={onChange}
              style={styles.input}
              placeholder="Longitude"
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        {form.formState.errors.longitude && (
          <Text style={styles.error}>Longitude must be a valid number</Text>
        )}
      </View>
      <CustomButton
        testID="weather-coordinates-submit"
        onPress={handleSubmit}
        label="Find"
      />
    </View>
  );
}

const defaultValues: FormValues = {latitude: '', longitude: ''};

const validationSchema = Yup.object().shape({
  latitude: Yup.number().required().min(-90).max(90),
  longitude: Yup.number().required().min(-180).max(180),
});

const styles = StyleSheet.create({
  inputs: {flexDirection: 'column', marginBottom: 15},
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'white',
  },
  error: {
    marginHorizontal: 5,
    color: Colors.ERROR,
  },
});

export default WeatherCoordinates;
