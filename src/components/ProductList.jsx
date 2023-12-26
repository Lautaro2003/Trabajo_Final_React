import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './path-to-your-cart-context-file';

function ProductList({ products }) {
  const { cart, addToCart } = useCart();

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.productId === product.id);

    if (existingProduct) {
      addToCart({
        productId: product.id,
        quantity: existingProduct.quantity + 1,
      });
    } else {
      addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.title} - {product.price}
            </Link>
            <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;