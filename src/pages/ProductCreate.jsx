import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createProduct, getUserProfile } from '../services/api';

function ProductCreate() {
  const history = useHistory();
  const [productData, setProductData] = useState({
    title: '',
    price: 0,
    description: '',
    categoryId: 1, 
    images: [],
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    getUserProfile(accessToken)
      .then((response) => {
        const userRole = response.data.role;
        if (userRole !== 'admin') {
          history.push('/');
        }
      })
      .catch((error) => {
        console.error('Error getting user profile:', error);
      });
  }, [history]);

  const handleCreateProduct = () => {
    createProduct(productData)
      .then((response) => {
        history.push('/products');
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <div>
      <h2>Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </label>
        <br />
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default ProductCreate;