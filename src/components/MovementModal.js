import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function MovementModal({ visible, onClose, onSave }) {
  const [type, setType] = useState('entrada');
  const [quantity, setQuantity] = useState('1');
  const [value, setValue] = useState('0');

  const save = () => {
    onSave({ type, quantity: Number(quantity), value: Number(value) });
    setQuantity('1');
    setValue('0');
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Movimentação</Text>

        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
          <TouchableOpacity onPress={() => setType('entrada')} style={[styles.btnToggle, type === 'entrada' && styles.btnToggleActive]}>
            <Text>Entrada</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setType('saida')} style={[styles.btnToggle, type === 'saida' && styles.btnToggleActive]}>
            <Text>Saída</Text>
          </TouchableOpacity>
        </View>

        <Text>Quantidade</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} />

        <Text>Valor</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={value} onChangeText={setValue} />

        <Button title="Salvar" onPress={save} />
        <Button title="Cancelar" onPress={onClose} />
      </View>
    </Modal>
  );
}
