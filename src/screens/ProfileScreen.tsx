import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserProfile from '../components/UserProfile';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <UserProfile />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;