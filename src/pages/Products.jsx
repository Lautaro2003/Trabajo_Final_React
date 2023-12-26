import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApiData } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    title: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchApiData('/products', { params: filter })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [filter]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  return (
    <div>
      <h1>Products</h1>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={filter.title} onChange={handleFilterChange} />

        <label>Category:</label>
        <input type="text" name="category" value={filter.category} onChange={handleFilterChange} />

        <label>Min Price:</label>
        <input type="number" name="minPrice" value={filter.minPrice} onChange={handleFilterChange} />

        <label>Max Price:</label>
        <input type="number" name="maxPrice" value={filter.maxPrice} onChange={handleFilterChange} />
      </div>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.title} - {product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;