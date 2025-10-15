import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ProductListScreen from '../screens/ProductListScreen';
import ProductFormScreen from '../screens/ProductFormScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import StockSummaryScreen from '../screens/StockSummaryScreen';
import MovementScreen from '../screens/MovementScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProductsStack({ products, setProducts, movements, setMovements }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" options={{ title: 'Produtos' }}>
        {props => <ProductListScreen {...props} products={products} />}
      </Stack.Screen>
      <Stack.Screen name="ProductDetails" options={{ title: 'Detalhes do Produto' }}>
        {props => <ProductDetailsScreen {...props} products={products} setProducts={setProducts} movements={movements} setMovements={setMovements} />}
      </Stack.Screen>
      <Stack.Screen name="ProductForm" options={{ title: 'Adicionar/Editar Produto' }}>
        {props => <ProductFormScreen {...props} products={products} setProducts={setProducts} movements={movements} setMovements={setMovements} />}
      </Stack.Screen>
      <Stack.Screen name="Movement" options={{ title: 'Justificativa' }}>
        {props => <MovementScreen {...props} products={products} setProducts={setProducts} movements={movements} setMovements={setMovements} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function TabNavigator({ products, setProducts, movements, setMovements }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Produtos') iconName = 'cube-outline';
          else if (route.name === 'Resumo') iconName = 'stats-chart-outline';
          else if (route.name === 'Adicionar') iconName = 'add-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Produtos" options={{ headerShown: false }}>
        {() => <ProductsStack products={products} setProducts={setProducts} movements={movements} setMovements={setMovements} />}
      </Tab.Screen>

      <Tab.Screen name="Resumo">
        {props => <StockSummaryScreen {...props} products={products} movements={movements} />}
      </Tab.Screen>

      <Tab.Screen name="Adicionar">
        {props => <ProductFormScreen {...props} products={products} setProducts={setProducts} movements={movements} setMovements={setMovements} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
