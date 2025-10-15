import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);

  return (
    <NavigationContainer>
      <TabNavigator
        products={products}
        setProducts={setProducts}
        movements={movements}
        setMovements={setMovements}
      />
    </NavigationContainer>
  );
}
