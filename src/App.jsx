import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';

import './App.css';

function App() {
  return (
    <div className="container-app">
      <BrowserRouter>
        <Switch>
          <Route path="/shopping-cart" component={ ShoppingCart } />
          <Route exact path="/" component={ ProductList } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
