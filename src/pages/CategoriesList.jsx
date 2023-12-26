import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '../services/api';

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta categoría?');

    if (confirmDelete) {
      try {
        await deleteCategory(categoryId, localStorage.getItem('accessToken'));
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div>
      <h2>Category List</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
            {localStorage.getItem('accessToken') && (
              <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesList;