import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useGlobal } from '../contexts/GlobalContext';
import { validateEmail, validatePassword } from '../utils/validators';
import { AppError } from '../utils/errorHandling';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();
  const { setError } = useGlobal();

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      if (error instanceof AppError) {
        switch (error.code) {
          case 'INVALID_CREDENTIALS':
            setError('Invalid email or password');
            break;
          case 'NETWORK_ERROR':
            setError('Network error. Please check your connection and try again.');
            break;
          default:
            setError('An unexpected error occurred. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;