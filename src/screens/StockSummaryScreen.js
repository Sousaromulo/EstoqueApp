import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
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

  // Função para gerar PDF
  const generatePDF = async () => {
    let html = `
      <h1>Resumo do Estoque</h1>
      <p><strong>Total de Produtos:</strong> ${totalProducts}</p>
      <p><strong>Quantidade Total:</strong> ${totalQuantity}</p>
      <p><strong>Valor Total:</strong> R$ ${totalValue.toFixed(2)}</p>
      <h2>Produtos com Estoque Baixo</h2>
      <ul>
        ${lowStock.map(p => `<li>${p.name} — ${p.quantity}</li>`).join('')}
      </ul>
      <h2>Histórico de Movimentos</h2>
      <ul>
        ${movements.map(m => `
          <li>
            ${m.type === 'entrada' ? 'Entrada' : 'Saída'} — ${m.productName} | 
            Qtd: ${m.quantity} | 
            ${m.justification ? 'Justificativa: ' + m.justification + ' | ' : ''}
            Data: ${new Date(m.date).toLocaleString()}
          </li>
        `).join('')}
      </ul>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  return (
    <View style={styles.container}>
      {/* Resumo do estoque */}
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

      {/* Produtos com estoque baixo */}
      {lowStock.length > 0 && (
        <View style={[styles.card, { backgroundColor: '#fff3cd', marginBottom: 16 }]}>
          <Text style={{ fontWeight: 'bold' }}>⚠ Estoque baixo</Text>
          {lowStock.map(p => <Text key={p.id}>{p.name} — {p.quantity}</Text>)}
        </View>
      )}

      {/* Histórico de movimentos */}
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

      {/* Botão para gerar PDF */}
      <TouchableOpacity style={[styles.button, { marginTop: 16 }]} onPress={generatePDF}>
        <Text style={styles.buttonText}>Gerar PDF</Text>
      </TouchableOpacity>
    </View>
  );
}
