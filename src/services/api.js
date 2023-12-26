import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

const categoriesApi = axios.create({
  baseURL: `${BASE_URL}/categories`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const productsApi = axios.create({
  baseURL: `${BASE_URL}/products`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const usersApi = axios.create({
  baseURL: `${BASE_URL}/users`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  categories: categoriesApi,
  products: productsApi,
  auth: authApi,
  users: usersApi,
};

export const getAllCategories = () => api.categories.get('/list');
export const getAllProducts = () => api.products.get('/list');
export const getProductById = (productId) => api.products.get(`/${productId}`);
export const updateProduct = (productId, data) => api.products.put(`/${productId}`, data);
export const createProduct = (productData) => api.products.post('/', productData);


export const login = (credentials) => {
  return api.auth.post('/login', credentials)
    .then(response => {
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      return response;
    });
};

export const logout = () => {
  const accessToken = localStorage.getItem('accessToken');
  return api.auth.post('/logout', {}, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(() => {
      localStorage.removeItem('accessToken');
    });
};

export const createCategory = (categoryData) => api.categories.post('/', categoryData);

export const getCategoryById = (categoryId) => api.categories.get(`/${categoryId}`);

export const updateCategory = (categoryId, categoryData) =>
  api.categories.put(`/${categoryId}`, categoryData);

export const deleteProduct = (productId, accessToken) =>
  api.products.delete(`/${productId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const deleteCategory = (categoryId, accessToken) =>
  api.categories.delete(`/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });  

export const getUserProfile = (accessToken) =>
  api.auth.get('/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const fetchApiData = async () => {
  try {
  
    const response = await axios.get(`${BASE_URL}/some/endpoint`);
    return response.data;
  } catch (error) {
    console.error('Error fetching API data:', error);
    throw error;
  }
};
  
export const register = (userData) => api.users.post('/', userData);

export const createUser = (userData) => api.users.post('/', userData);