import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { IconContext } from 'react-icons';

import './ProductList.css';
import ListCategories from '../components/ListCategories';

class ProductList extends Component {
  renderInputSearch() {
    return (
      <label className="container-inputSearch" htmlFor="inputSearch">
        <FiSearch />
        <input id="inputSearch" type="text" />
      </label>
    );
  }

  renderLinkShoppingCart() {
    return (
      <IconContext.Provider value={ { size: '2em' } }>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          <FiShoppingCart />
        </Link>
      </IconContext.Provider>
    );
  }

  render() {
    return (
      <div className="container-product-list">
        <ListCategories />
        { this.renderInputSearch() }
        { this.renderLinkShoppingCart() }
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default ProductList;
