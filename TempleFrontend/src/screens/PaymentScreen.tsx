import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { usePayment } from '../hooks/usePayment';
import { useOfflinePayment } from '../hooks/useOfflinePayment';
import { useGlobal } from '../hooks/useGlobal';

const PaymentScreen: React.FC = () => {
  const [amount, setAmount] = useState('');
  const { initiatePayment } = usePayment();
  const { addOfflinePayment } = useOfflinePayment();
  const { isOnline } = useGlobal();

  const handlePayment = async () => {
    try {
      if (isOnline) {
        await initiatePayment(Number(amount));
        Alert.alert('Success', 'Payment initiated successfully');
        setAmount('');
      } else {
        const offlinePayment = {
          amount: Number(amount),
          date: new Date().toISOString()
        };
        await addOfflinePayment(offlinePayment);
        Alert.alert('Success', 'Payment saved offline. It will be processed when you\'re back online.');
        setAmount('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process payment');
    }
  };

  return (
    <View>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
      />
      <Button title="Make Payment" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;