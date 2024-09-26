import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { usePayment } from '../contexts/PaymentContext';
import { formatCurrency } from '../utils/formatters';

const PaymentHistory: React.FC = () => {
  const { paymentHistory } = usePayment();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>
      <FlatList
        data={paymentHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
            <Text>Amount: {formatCurrency(item.amount)}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default PaymentHistory;