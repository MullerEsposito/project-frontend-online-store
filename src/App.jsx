import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';

import './App.css';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div className="container-app">
      <BrowserRouter>
        <Switch>
          <Route path="/shopping-cart" component={ ShoppingCart } />
          <Route path="/product-details/:id" component={ ProductDetails } />
          <Route exact path="/" component={ ProductList } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
