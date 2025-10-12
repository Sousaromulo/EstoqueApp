import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  const [products, setProducts] = useState([]);

  return (
    <NavigationContainer>
      <TabNavigator products={products} setProducts={setProducts} />
    </NavigationContainer>
  );
}
