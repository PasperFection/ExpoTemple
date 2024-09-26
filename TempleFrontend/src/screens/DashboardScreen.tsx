import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation'; // Zorg ervoor dat je deze type hebt gedefinieerd

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
  navigation: DashboardScreenNavigationProp;
}

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <View>
      <Text>Welcome, {user?.email}</Text>
      <Button title="Go to Payment" onPress={() => navigation.navigate('Payment')} />
      <Button title="View Payment History" onPress={() => navigation.navigate('PaymentHistory')} />
      <Button title="View Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default DashboardScreen;