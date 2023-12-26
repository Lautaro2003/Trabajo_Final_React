import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';
import CartDetail from './pages/CartDetail';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cart" component={CartView} />
        <Route path="/categories" component={Categories} />
        <Route path="/products" component={Products} />
        <Route path="/products/create" component={ProductCreate} />
        <Route path="/products/edit/:id" component={ProductEdit} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/cart-detail" component={CartDetail} />
        <Route path="/" component={Home} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
