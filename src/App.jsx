

import React from 'react';
import AppRouter from './AppRouter';
import { CartProvider } from './context/CartContext';
import ProductList from './pages/ProductList';
import CartView from './components/CartView';

function App() {
  const products = [
    { id: 1, title: 'Producto 1', price: 10.99 },
    { id: 2, title: 'Producto 2', price: 15.99 },
  ];

  return (
    <div>
      <CartProvider>
        <h1>Mi Tienda</h1>
        <ProductList products={products} />
        <CartView />
        <AppRouter />
      </CartProvider>
    </div>
  );
}

export default App;