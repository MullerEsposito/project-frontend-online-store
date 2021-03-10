import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { IconContext } from 'react-icons';

class Cart extends Component {
  componentDidMount() {
    this.loadCart();
  }

  componentDidUpdate(prevProps) {
    const { productToAdd } = this.props;
    if (prevProps.productToAdd !== productToAdd) this.addToCart();
  }

  loadCart() {
    const cartStorage = '@ONLINE-STORE:Cart';
    const { handleOnCartChange } = this.props;

    const cart = localStorage.getItem(cartStorage)
      ? JSON.parse(localStorage.getItem(cartStorage))
      : [];

    handleOnCartChange(cart);
  }

  addToCart() {
    const { productToAdd, cart, handleOnCartChange } = this.props;
    const unFound = -1;

    if (!productToAdd) return;

    const indexProduct = cart.findIndex((product) => product.id === productToAdd.id);

    if (indexProduct !== unFound) cart[indexProduct].quantity += 1;
    if (indexProduct === unFound) cart.push(productToAdd);

    localStorage.setItem('@ONLINE-STORE:Cart', JSON.stringify(cart));
    handleOnCartChange(cart);
  }

  render() {
    return (
      <div className="container-cart">
        <IconContext.Provider value={ { size: '2em' } }>
          <Link
            to="/shopping-cart"
            data-testid="shopping-cart-button"
          >
            <FiShoppingCart />
          </Link>
        </IconContext.Provider>
      </div>
    );
  }
}

Cart.defaultProps = {
  productToAdd: {},
};

Cart.propTypes = {
  handleOnCartChange: PropTypes.func.isRequired,
  productToAdd: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    quantity: PropTypes.number,
  }),
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
};

export default Cart;
