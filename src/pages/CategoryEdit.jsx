import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updateCategory, getCategoryById, getUserProfile } from '../services/api';

function CategoryEdit({ match }) {
  const history = useHistory();
  const categoryId = match.params.id;
  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await getUserProfile(localStorage.getItem('accessToken'));
        const userRole = response.data.role;

        if (userRole !== 'admin') {
          history.push('/');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    checkUserRole();

    const fetchCategoryData = async () => {
      try {
        const response = await getCategoryById(categoryId);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [categoryId, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCategory(categoryId, formData);
      history.push('/categories');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="text" name="image" value={formData.image} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
}

export default CategoryEdit;