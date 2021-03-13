import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { TiArrowBackOutline } from 'react-icons/ti';
import { FiShoppingCart } from 'react-icons/fi';
import { IconContext } from 'react-icons';

import './ShoppingCart.css';
import Cart from '../components/Cart';

class ShoppingCart extends Component {
  render() {
    return (
      <div className="container-shopping-cart">
        <IconContext.Provider value={ { size: '2em' } }>
          <Link to="/">
            <TiArrowBackOutline className="icon-arrowback" />
          </Link>
        </IconContext.Provider>
        <h1 className="cart-products-title">
          <FiShoppingCart className="icon-shoppingcart" />
          Carrinho de Compras
        </h1>
        <IconContext.Provider value={ { size: '2em' } }>
          <Cart typeRender="edit-list" />
        </IconContext.Provider>
        <Link data-testid="checkout-products" to="/checkout">Finalizar Compra</Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      cart: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        quantity: PropTypes.number,
      })),
    }),
  }).isRequired,
};

export default ShoppingCart;
