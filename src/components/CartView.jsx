import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './Cart/CartItem';
import CompraExitosa from '../pages/CompraExitosa'; 
import { fetchApiData } from '../services/api';

const CartView = () => {
  const { state, clearCart, updateCartItemQuantity, removeFromCart } = useCart();
  const { cart, totalPrice, totalQuantity } = state;
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiData = await fetchApiData();
        setCompraExitosa(true);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleUpdateQuantity = (item, action) => {
    updateCartItemQuantity(item, action);

    const updatedTotalPrice = cart.reduce((total, item) => total + item.subtotal, 0);
    const updatedTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  };

  const handleRemoveItem = (item) => {
    removeFromCart(item);

    const updatedTotalPrice = cart.reduce((total, item) => total + item.subtotal, 0);
    const updatedTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  };

  const handleCheckout = () => {

    setCompraExitosa(true);

    clearCart();
  };

  return (
    <div>
      <h2>Carrito</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar los datos del carrito.</p>}
      {compraExitosa ? (
        <CompraExitosa />
      ) : cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <div>
            {cart.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
          <p>Total: {totalPrice}</p>
          <p>Cantidad Total: {totalQuantity}</p>
          <button onClick={handleCheckout}>Finalizar Compra</button>
        </>
      )}
    </div>
  );
};

export default CartView;