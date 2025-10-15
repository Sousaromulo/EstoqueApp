import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../styles/styles';

export default function StockSummaryScreen({ products = [], movements = [] }) {
  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, p) => sum + (p.quantity ?? 0), 0);
  const totalValue = products.reduce((sum, p) => sum + ((p.quantity ?? 0) * (p.price ?? 0)), 0);
  const lowStock = products.filter(p => (p.quantity ?? 0) < 5);

  const renderMovement = ({ item }) => (
    <View style={[styles.card, { marginBottom: 8 }]}>
      <Text style={{ fontWeight: 'bold' }}>
        {item.type === 'entrada' ? 'Entrada' : 'Saída'} — {item.productName}
      </Text>
      <Text>Qtd: {item.quantity}</Text>
      {item.justification ? <Text>Justificativa: {item.justification}</Text> : null}
      <Text>Data: {new Date(item.date).toLocaleString()}</Text>
    </View>
  );

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
        <View style={[styles.card, { backgroundColor: '#fff3cd', marginBottom: 16 }]}>
          <Text style={{ fontWeight: 'bold' }}>⚠ Estoque baixo</Text>
          {lowStock.map(p => <Text key={p.id}>{p.name} — {p.quantity}</Text>)}
        </View>
      )}

      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Histórico de Movimentos</Text>
      {movements.length > 0 ? (
        <FlatList
          data={movements}
          keyExtractor={(item) => item.id}
          renderItem={renderMovement}
        />
      ) : (
        <Text>Nenhum movimento registrado</Text>
      )}
    </View>
  );
}
