import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MovementModal from '../components/MovementModal';
import styles from '../styles/styles';

export default function ProductDetailsScreen({ navigation, route, products, setProducts }) {
  const { product } = route.params;
  const [movements, setMovements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addMovement = ({ type, quantity, value }) => {
    if (type === 'saida' && quantity > product.quantity) {
      return Alert.alert('Erro', 'Não é possível sair mais do que o estoque disponível');
    }

    const newMov = { type, quantity, value, id: String(Date.now()) };
    setMovements([newMov, ...movements]);

    const updatedProducts = products.map(p =>
      p.id === product.id
        ? { ...p, quantity: type === 'entrada' ? p.quantity + quantity : p.quantity - quantity }
        : p
    );
    setProducts(updatedProducts);
    setModalVisible(false);
  };

  const deleteProduct = () => {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja realmente deletar ${product.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar", style: "destructive", onPress: () => {
            setProducts(products.filter(p => p.id !== product.id));
            navigation.goBack();
        }}
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.type === 'saida' ? { backgroundColor: '#d4edda' } : { backgroundColor: '#f8d7da' }]}>
      <Ionicons name={item.type === 'saida' ? 'arrow-down-circle' : 'arrow-up-circle'} size={20} color="black" />
      <Text>{item.type.toUpperCase()} — {item.quantity} un — R$ {item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>Quantidade: {product.quantity}</Text>
      <Text>Preço unitário: R$ {product.price}</Text>

      <Button title="Editar Produto" onPress={() => navigation.navigate('ProductForm', { product })} />
      <Button title="Registrar Saída" onPress={() => setModalVisible(true)} color="#4caf50" />
      <Button title="Deletar Produto" onPress={deleteProduct} color="#f44336" />

      <Text style={{ marginTop: 12, fontWeight: 'bold' }}>Histórico</Text>
      <FlatList
        data={movements}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <MovementModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={addMovement} />
    </View>
  );
}
