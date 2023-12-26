import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(item => item.productId === action.payload.productId);

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }

    case 'UPDATE_CART_TOTALS':
      const totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
      const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
      return { ...state, totalPrice, totalQuantity };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    default:
      return state;
  }
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    dispatch({ type: 'UPDATE_CART_TOTALS' });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'UPDATE_CART_TOTALS' });
  };

  return (
    <CartContext.Provider value={{ state, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

export { CartProvider, useCart };