import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorHandler from '../components/ErrorHandler';

const DashboardScreen: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const navigation = useNavigation();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ErrorHandler />
      <Text>Welcome, {user?.email}</Text>
      <Button title="Go to Payment" onPress={() => navigation.navigate('Payment')} />
      <Button title="View Payment History" onPress={() => navigation.navigate('PaymentHistory')} />
      <Button title="View Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;