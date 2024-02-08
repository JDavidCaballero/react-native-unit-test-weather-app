import React, {useState} from 'react';
import {View, TextInput, Button, Alert, ActivityIndicator} from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateCredentials = () => {
    setLoading(true);

    if (email === '' || password === '') {
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Error', 'Email or password cannot be empty');
      }, 2000);
      return false;
    } else if (email === 'Admin' && password === 'admin') {
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Success', 'Logged in successfully');
      }, 2000);
      return false;
    } else {
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Error', 'Invalid credentials.');
      }, 2000);
      return false;
    }
  };

  return (
    <View style={{margin: 10}}>
      <TextInput
        value={email}
        onChangeText={value => setEmail(value)}
        placeholder={'Email'}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      />
      <TextInput
        value={password}
        onChangeText={value => setPassword(value)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10}}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <Button title={'Login'} onPress={validateCredentials} />
      )}
    </View>
  );
};

export default Login;
