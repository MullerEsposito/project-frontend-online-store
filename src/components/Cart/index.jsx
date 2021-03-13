import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti';
import { IconContext } from 'react-icons';

import ControlsCart from '../ControlsCart';

import './Cart.css';

const cartStorage = '@ONLINE-STORE:Cart';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.loadCart();
  }

  componentDidUpdate(prevProps) {
    const { productToAdd, quantity } = this.props;

    if (prevProps.productToAdd !== productToAdd) this.addToCart(productToAdd, quantity);
  }

  loadCart() {
    const cart = localStorage.getItem(cartStorage)
      ? JSON.parse(localStorage.getItem(cartStorage))
      : [];

    this.setState({ cart });
  }

  addToCart(productToAdd, quantity = 1) {
    const { cart } = this.state;
    const unFound = -1;
    if (!productToAdd) return;

    const indexProduct = cart.findIndex((product) => product.id === productToAdd.id);

    if (indexProduct === unFound) cart.push({ ...productToAdd, quantity });
    if (indexProduct !== unFound) cart[indexProduct].quantity += quantity;

    localStorage.setItem(cartStorage, JSON.stringify(cart));
    this.setState({ cart });
  }

  removeFromCart(productToRemove, quantity = undefined) {
    const { cart } = this.state;
    const unFound = -1;
    if (!productToRemove) return;

    const indexProduct = cart.findIndex((product) => product.id === productToRemove.id);

    if (indexProduct === unFound) return false;
    if (!quantity) cart.splice(indexProduct, 1);
    if (quantity) cart[indexProduct].quantity -= quantity;

    localStorage.setItem(cartStorage, JSON.stringify(cart));
    this.setState({ cart });
  }

  renderEditList() {
    const { cart } = this.state;
    const total = cart.reduce((sum, { price, quantity }) => sum + (price * quantity), 0);

    if (cart.length === 0) return this.renderEmptyCart();

    return (
      <div className="container-cart-products">
        { cart.map((product) => (
          <div key={ product.id } className="container-cart-product">
            <div onClick={ () => this.removeFromCart(product) }>
              <TiDelete />
            </div>
            <img src={ product.thumbnail } alt="" />
            <p data-testid="shopping-cart-product-name">{ product.title }</p>
            <ControlsCart
              quantity={ product.quantity }
              addToCart={ () => this.addToCart(product) }
              removeFromCart={ () => this.removeFromCart(product, 1) }
            />
            <span>{`R$ ${(product.quantity * product.price).toFixed(2)}`}</span>
          </div>))}
        <p>
          <strong>Total:</strong>
          {` ${total}`}
        </p>
      </div>
    );
  }

  renderStaticList() {
    const { cart } = this.state;
    const total = cart.reduce((sum, { price, quantity }) => sum + (price * quantity), 0);

    return (
      <fieldset className="container-cart-products">
        <legend>Revise seus Produtos</legend>
        {
          cart.map((product) => (
            <div key={ product.id } className="container-cart-product">
              <img src={ product.thumbnail } alt="" />
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <span>{`R$ ${product.quantity * product.price}`}</span>
            </div>
          ))
        }
        <p>
          <strong>Total:</strong>
          {` ${total}`}
        </p>
      </fieldset>
    );
  }

  renderIcon() {
    const { cart } = this.state;
    const cartTotal = cart.reduce((total, product) => (
      total + product.quantity
    ), 0);
    // console.log(cartTotal);
    return (
      <div className="container-cart-icon">
        <IconContext.Provider value={ { size: '2em' } }>
          <Link
            to="/shopping-cart"
            data-testid="shopping-cart-button"
          >
            <FiShoppingCart />
            { cartTotal > 0
              && <span data-testid="shopping-cart-size">{cartTotal}</span> }
          </Link>
        </IconContext.Provider>
      </div>
    );
  }

  renderEmptyCart() {
    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }

  render() {
    const { typeRender } = this.props;

    if (typeRender === 'static-list') return this.renderStaticList();
    if (typeRender === 'edit-list') return this.renderEditList();
    if (typeRender === 'icon') return this.renderIcon();
  }
}

Cart.defaultProps = {
  productToAdd: {},
  quantity: 1,
};

Cart.propTypes = {
  productToAdd: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }),
  quantity: PropTypes.number,
  typeRender: PropTypes.string.isRequired,
};

export default Cart;
