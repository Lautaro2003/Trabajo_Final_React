import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { title, price, quantity, subtotal } = item;

  return (
    <div>
      <h3>{title}</h3>
      <p>Precio: {price}</p>
      <p>Cantidad: {quantity}</p>
      <p>Subtotal: {subtotal}</p>
      <button onClick={() => onUpdateQuantity(item, 'increase')}>Aumentar Cantidad</button>
      <button onClick={() => onUpdateQuantity(item, 'decrease')}>Disminuir Cantidad</button>
      <button onClick={() => onRemoveItem(item)}>Eliminar del Carrito</button>
    </div>
  );
};

export default CartItem;