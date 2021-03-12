import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { TiDelete, TiArrowBackOutline } from 'react-icons/ti';
import { FiShoppingCart } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import ControlsCart from '../components/ControlsCart';

import './ShoppingCart.css';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.loadCart();
  }

  loadCart() {
    const cart = localStorage.getItem('@ONLINE-STORE:Cart')
      ? JSON.parse(localStorage.getItem('@ONLINE-STORE:Cart'))
      : [];

    this.setState({ cart });
  }

  renderEmptyCart() {
    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }

  renderCartProducts() {
    const { cart } = this.state;

    return cart.map((product) => (
      <div key={ product.id } className="container-cart-product">
        <TiDelete />
        <img src={ product.thumbnail } alt="" />
        <p data-testid="shopping-cart-product-name">{ product.title }</p>
        <ControlsCart quantity={ product.quantity } />
        <span>{`R$ ${product.quantity * product.price}`}</span>
      </div>
    ));
  }

  render() {
    const { cart } = this.state;

    if (cart.length === 0) return this.renderEmptyCart();
    return (
      <div className="container-cart-products">
        <IconContext.Provider value={ { size: '2em' } }>
          <Link to="/">
            <TiArrowBackOutline className="icon-arrowback" />
          </Link>
          <FiShoppingCart className="icon-shoppingcart" />
          <h1 className="cart-products-title">Carrinho de Compras</h1>
          {this.renderCartProducts()}
          <p>Valor Total da Compra: R$ 40,00</p>
          <Link data-testid="checkout-products" to="/checkout">Finalizar Compra</Link>
        </IconContext.Provider>
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
