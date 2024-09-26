import React from 'react';
import { View, StyleSheet } from 'react-native';
import PaymentHistory from '../components/PaymentHistory';

const PaymentHistoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <PaymentHistory paymentHistory={[]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaymentHistoryScreen;
