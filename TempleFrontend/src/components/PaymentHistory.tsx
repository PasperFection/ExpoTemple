import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Payment } from '../types/payment';
import { formatCurrency } from '../utils/formatters';

interface PaymentHistoryProps {
  paymentHistory: Payment[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ paymentHistory }) => {
  return (
    <FlatList
      data={paymentHistory}
      keyExtractor={(item) => item.id.toString()} // Wijzig dit naar een string
      renderItem={({ item }) => (
        <View style={styles.paymentItem}>
          <Text>Amount: {formatCurrency(item.amount)}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Date: {new Date(item.createdAt).toLocaleDateString()}</Text> // Gebruik createdAt in plaats van date
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  paymentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PaymentHistory;