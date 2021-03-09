import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TiMinus, TiPlus } from 'react-icons/ti';

import './ControlsCart.css';

class ControlsCart extends Component {
  render() {
    const { quantity } = this.props;
    return (
      <div className="container-controls-cart">
        <TiMinus />
        <span data-testid="shopping-cart-product-quantity">{ quantity }</span>
        <TiPlus />
      </div>
    );
  }
}

ControlsCart.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default ControlsCart;
