import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import styles from '../styles/styles';

export default function StockSummaryScreen({ products }) {
  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalValue = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
  const lowStock = products.filter(p => p.quantity < 5);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { marginBottom: 16 }]}>
        <Text style={styles.title}>Total de Produtos</Text>
        <Text>{totalProducts}</Text>
      </View>
      <View style={[styles.card, { marginBottom: 16 }]}>
        <Text style={styles.title}>Quantidade Total</Text>
        <Text>{totalQuantity}</Text>
      </View>
      <View style={[styles.card, { marginBottom: 16 }]}>
        <Text style={styles.title}>Valor Total Estoque</Text>
        <Text>R$ {totalValue.toFixed(2)}</Text>
      </View>

      {lowStock.length > 0 && (
        <View style={[styles.card, { backgroundColor: '#fff3cd' }]}>
          <Text style={{ fontWeight: 'bold' }}>⚠ Estoque baixo</Text>
          {lowStock.map(p => <Text key={p.id}>{p.name} — {p.quantity}</Text>)}
        </View>
      )}

      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Gráfico de Estoque</Text>
      <BarChart
        data={{
          labels: products.map(p => p.name),
          datasets: [
            { data: products.map(p => p.quantity), color: () => 'rgba(75,192,192,0.7)' },
            { data: products.map(p => p.quantity * p.price), color: () => 'rgba(153,102,255,0.7)' }
          ]
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        verticalLabelRotation={30}
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}
