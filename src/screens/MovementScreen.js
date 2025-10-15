import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function MovementScreen({ route, navigation, products, setProducts, movements, setMovements }) {
  const { product, type } = route.params;

  const [quantity, setQuantity] = useState('0');
  const [justification, setJustification] = useState('');

  const saveMovement = () => {
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) return Alert.alert('Erro', 'Informe uma quantidade válida');

    if (type === 'saida' && qty > product.quantity) {
      return Alert.alert('Erro', 'Não é possível retirar mais do que o estoque disponível');
    }

    // Atualiza produtos
    const updatedProducts = products.map(p =>
      p.id === product.id
        ? { ...p, quantity: type === 'entrada' ? p.quantity + qty : p.quantity - qty }
        : p
    );
    setProducts(updatedProducts);

    // Adiciona movimento
    const newMovement = {
      id: String(Date.now()),
      productName: product.name,
      type,
      quantity: qty,
      justification,
      date: new Date().toISOString(),
    };
    setMovements([newMovement, ...movements]);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{type === 'entrada' ? 'Registrar Entrada' : 'Registrar Saída'}</Text>

      <Text>Quantidade</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} />

      <Text>Justificativa</Text>
      <TextInput style={styles.input} value={justification} onChangeText={setJustification} />

      <TouchableOpacity style={styles.button} onPress={saveMovement}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
