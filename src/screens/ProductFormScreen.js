import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function ProductFormScreen({ navigation, route, products, setProducts, movements, setMovements }) {
  const editingProduct = route.params?.product;

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [price, setPrice] = useState('0');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setQuantity(String(editingProduct.quantity ?? 0));
      setPrice(String(editingProduct.price ?? 0));
    }
  }, [editingProduct]);

  const saveProduct = () => {
    if (!name.trim()) return Alert.alert('Erro', 'Informe o nome do produto');

    const safeQuantity = parseInt(quantity) || 0;
    const safePrice = parseFloat(price) || 0;

    if (safeQuantity < 0) return Alert.alert('Erro', 'Informe uma quantidade válida');
    if (safePrice < 0) return Alert.alert('Erro', 'Informe um preço válido');

    if (editingProduct) {
      const updated = products.map(p =>
        p.id === editingProduct.id
          ? { ...p, name, quantity: safeQuantity, price: safePrice }
          : p
      );
      setProducts(updated);
    } else {
      const newProduct = {
        id: String(Date.now()),
        name,
        quantity: safeQuantity,
        price: safePrice,
      };
      setProducts([...products, newProduct]);

      // Registra entrada automática no histórico
      const newMovement = {
        id: String(Date.now() + 1),
        productName: name,
        type: 'entrada',
        quantity: safeQuantity,
        justification: 'Produto adicionado',
        date: new Date().toISOString(),
      };
      setMovements([newMovement, ...movements]);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text>Quantidade</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} />

      <Text>Preço unitário</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice} />

      <TouchableOpacity style={styles.button} onPress={saveProduct}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
