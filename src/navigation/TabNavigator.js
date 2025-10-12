import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductFormScreen from '../screens/ProductFormScreen';
import StockSummaryScreen from '../screens/StockSummaryScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProductsStack({ products, setProducts }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" options={{ title: 'Produtos' }}>
        {props => <ProductListScreen {...props} products={products} setProducts={setProducts} />}
      </Stack.Screen>
      <Stack.Screen name="ProductDetails" options={{ title: 'Detalhes do Produto' }}>
        {props => <ProductDetailsScreen {...props} products={products} setProducts={setProducts} />}
      </Stack.Screen>
      <Stack.Screen name="ProductForm" options={{ title: 'Adicionar/Editar Produto' }}>
        {props => <ProductFormScreen {...props} products={products} setProducts={setProducts} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function TabNavigator({ products, setProducts }) {
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
        {() => <ProductsStack products={products} setProducts={setProducts} />}
      </Tab.Screen>
      <Tab.Screen name="Resumo">
        {props => <StockSummaryScreen {...props} products={products} />}
      </Tab.Screen>
      <Tab.Screen name="Adicionar">
        {props => <ProductFormScreen {...props} products={products} setProducts={setProducts} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
