import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';

export default function ProductDetailsScreen({ navigation, route, products = [], setProducts }) {
  // Pega o produto dos parâmetros, com fallback
  const product = route.params?.product;
  if (!product) return null; // evita crash se não houver produto

  // Função para deletar o produto
  const deleteProduct = () => {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja realmente deletar ${product.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => {
            if (setProducts) {
              setProducts(products.filter(p => p.id !== product.id));
            }
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>Quantidade: {product.quantity ?? 0}</Text>
      <Text>Preço unitário: R$ {product.price?.toFixed(2) ?? '0.00'}</Text>

      {/* Botão Editar */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2196f3' }]}
        onPress={() => navigation.navigate('ProductForm', { product })}
      >
        <Text style={styles.buttonText}>Editar Produto</Text>
      </TouchableOpacity>

      {/* Botão Entrada */}
      <TouchableOpacity
        style={[styles.button2, { backgroundColor: '#4caf50' }]}
        onPress={() => navigation.navigate('Movement', { product, type: 'entrada' })}
      >
        <Text style={styles.buttonText}>Registrar Entrada</Text>
      </TouchableOpacity>

      {/* Botão Saída */}
      <TouchableOpacity
        style={[styles.button2, { backgroundColor: '#f44336' }]}
        onPress={() => navigation.navigate('Movement', { product, type: 'saida' })}
      >
        <Text style={styles.buttonText}>Registrar Saída</Text>
      </TouchableOpacity>

      {/* Botão Deletar */}
      <TouchableOpacity
        style={[styles.button2, { backgroundColor: '#9e9e9e' }]}
        onPress={deleteProduct}
      >
        <Text style={styles.buttonText}>Deletar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}
