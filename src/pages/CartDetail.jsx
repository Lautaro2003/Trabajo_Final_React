import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartDetail() {
  const { cart, updateCartItem, removeCartItem, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeCartItem(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Cart Detail</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Browse products</Link></p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.title} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total Price: ${calculateTotalPrice()}</p>
          <button onClick={handleClearCart}>Clear Cart</button>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default CartDetail;