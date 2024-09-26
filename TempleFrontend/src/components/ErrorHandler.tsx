import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGlobal } from '../contexts/GlobalContext';

const ErrorHandler: React.FC = () => {
  const { error, setError } = useGlobal();

  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity onPress={() => setError(null)} style={styles.dismissButton}>
        <Text style={styles.dismissText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffcccc',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#cc0000',
    fontSize: 16,
  },
  dismissButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  dismissText: {
    color: '#0000cc',
  },
});

export default ErrorHandler;