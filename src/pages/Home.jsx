import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApiData } from '../services/api';

const Home = () => {
  const [categories, setCategories] = useState([]);

  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    fetchApiData('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    fetchApiData('/products?limit=5')  
      .then(response => setRecentProducts(response.data))
      .catch(error => console.error('Error fetching recent products:', error));
  }, []);

  return (
    <div>
      <h1>Bienvenido a Mi Tienda</h1>
      
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/categories">Categorías</Link></li>
          <li><Link to="/products">Productos</Link></li>
        </ul>
      </nav>

      <section>
        <h2>Contenido Destacado</h2>
      </section>

      <section>
        <h2>Categorías</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Productos Recientes</h2>
        <ul>
          {recentProducts.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Carrito</h2>
        <Link to="/cart">Ver Carrito</Link>
      </section>
    </div>
  );
}

export default Home;