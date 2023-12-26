import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchApiData } from '../services/api';

function Categories() {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchApiData()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    history.push(`/products?category=${categoryId}`);
  };

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <button onClick={() => handleCategoryClick(category.id)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;