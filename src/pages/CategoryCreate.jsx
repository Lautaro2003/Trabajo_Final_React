import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createCategory, getUserProfile } from '../services/api';

function CategoryCreate() {
  const history = useHistory();
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
  }, [history]);

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
      await createCategory(formData);
      history.push('/categories');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
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
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
}

export default CategoryCreate;