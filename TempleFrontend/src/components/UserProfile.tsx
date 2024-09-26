import React from 'react';
import { View, Text } from 'react-native';

interface UserProfileProps {
  user: { id: string; email: string };
  isOffline: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, isOffline }) => {
  return (
    <View>
      <Text>Email: {user.email}</Text>
      <Text>Status: {isOffline ? 'Offline' : 'Online'}</Text>
    </View>
  );
};

export default UserProfile;