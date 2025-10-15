import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function MovementModal({ visible, onClose, onSave }) {
  const [quantity, setQuantity] = useState('1');
  const [justification, setJustification] = useState('');

  const save = () => {
    onSave({ quantity: Number(quantity), justification });
    setQuantity('1');
    setJustification('');
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Movimentação</Text>

        <Text>Quantidade</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />

        <Text>Justificativa</Text>
        <TextInput
          style={styles.input}
          value={justification}
          onChangeText={setJustification}
        />

        <TouchableOpacity style={[styles.button2, { backgroundColor: '#4caf50' }]} onPress={save}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button2, { backgroundColor: '#f44336' }]} onPress={onClose}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
