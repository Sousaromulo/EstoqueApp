import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles/styles';

export default function ProductListScreen({ navigation, products }) {
  const [filterText, setFilterText] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, item.quantity < 5 && styles.cardLowStock]}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>
        Qtd: {item.quantity} — Preço unitário: R$ {(item.price ?? 0).toFixed(2)}
      </Text>
      <Text style={styles.subtitle}>
        Valor total: R$ {((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}
      </Text>
      {item.quantity < 5 && <Text style={{ color: '#856404' }}>⚠ Estoque baixo</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Filtrar por nome"
        value={filterText}
        onChangeText={setFilterText}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
