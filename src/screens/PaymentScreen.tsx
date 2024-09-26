import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { usePayment } from '../contexts/PaymentContext';
import { useGlobal } from '../contexts/GlobalContext';
import { saveOfflinePayment, syncOfflinePayments } from '../utils/offlineSync';
import NetInfo from '@react-native-community/netinfo';

const PaymentScreen: React.FC = () => {
  const [amount, setAmount] = useState('');
  const { initiatePayment } = usePayment();
  const { setError } = useGlobal();

  const handlePayment = async () => {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    
    if (isConnected) {
      try {
        await initiatePayment(parseFloat(amount));
        await syncOfflinePayments(); // Sync any offline payments
      } catch (error) {
        setError('Payment failed. Please try again.');
      }
    } else {
      await saveOfflinePayment(parseFloat(amount));
      setError('Payment saved offline. It will be processed when you\'re back online.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Pay" onPress={handlePayment} />
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
});

export default PaymentScreen;