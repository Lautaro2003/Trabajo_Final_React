import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getProductById, updateProduct, getUserProfile } from '../services/api';

function ProductEdit() {
  const history = useHistory();
  const { id } = useParams();
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

    getProductById(id)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error getting product details:', error);
      });
  }, [id, history]);

  const handleUpdateProduct = () => {
    updateProduct(id, productData)
      .then(() => {
        history.push('/products');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
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
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </label>
        <br />
        <label>
          Category:
          <input type="number" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default ProductEdit;