// Importa o React e useState para criar estados dentro do componente
// Importa componentes do React Native para construir a interface
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

// Importa estilos externos do arquivo styles.js
import styles from '../styles/styles';

// Define o componente ProductListScreen
// Recebe props:
// - navigation: para navegar entre telas (React Navigation)
// - products: lista de produtos a ser exibida na tela
export default function ProductListScreen({ navigation, products }) {

  // Estado que armazena o texto digitado no campo de filtro
  const [filterText, setFilterText] = useState('');

  // Filtra a lista de produtos de acordo com o texto digitado
  // A busca ignora maiúsculas/minúsculas
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Função que renderiza cada item da lista de produtos
  // Recebe um objeto item (produto) e retorna o JSX correspondente
  const renderItem = ({ item }) => (
    <TouchableOpacity
      // Aplica o estilo base 'card'
      // Se a quantidade for menor que 5, aplica o estilo 'cardLowStock' para destacar
      style={[styles.card, item.quantity < 5 && styles.cardLowStock]}
      
      // Ao clicar no item, navega para a tela 'ProductDetails'
      // Passa o produto clicado como parâmetro
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      {/* Nome do produto */}
      <Text style={styles.title}>{item.name}</Text>

      {/* Quantidade e preço unitário do produto */}
      <Text style={styles.subtitle}>
        Qtd: {item.quantity} — Preço unitário: R$ {(item.price ?? 0).toFixed(2)}
      </Text>

      {/* Valor total do produto (quantidade x preço unitário) */}
      <Text style={styles.subtitle}>
        Valor total: R$ {((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}
      </Text>

      {/* Aviso visual se o estoque estiver baixo */}
      {item.quantity < 5 && <Text style={{ color: '#856404' }}>⚠ Estoque baixo</Text>}
    </TouchableOpacity>
  );

  // JSX principal do componente
  return (
    <View style={styles.container}>
      {/* Campo de texto para filtrar produtos pelo nome */}
      <TextInput
        style={styles.input}                 // Aplica estilo do TextInput
        placeholder="Filtrar por nome"       // Texto exibido quando vazio
        value={filterText}                   // Valor atual do estado filterText
        onChangeText={setFilterText}         // Atualiza o estado quando o usuário digita
      />

      {/* Lista de produtos filtrados */}
      <FlatList
        data={filteredProducts}              // Array de dados a ser exibido
        keyExtractor={(item) => item.id}     // Chave única para cada item (obrigatório)
        renderItem={renderItem}              // Função que renderiza cada item da lista
      />
    </View>
  );
}
