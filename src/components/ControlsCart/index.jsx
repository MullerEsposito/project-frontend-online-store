import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TiMinus, TiPlus } from 'react-icons/ti';

import './ControlsCart.css';

class ControlsCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputQuantity: props.quantity,
    };
  }

  handleClick(operation) {
    const { onChange, addToCart, removeFromCart } = this.props;
    let { inputQuantity } = this.state;

    if (operation === 'plus') {
      addToCart();
      inputQuantity += 1;
    } else if (operation === 'minus') {
      removeFromCart();
      inputQuantity -= 1;
    }

    this.setState({ inputQuantity });
    onChange(inputQuantity);
  }

  render() {
    const { inputQuantity } = this.state;

    return (
      <div className="container-controls-cart">
        <TiMinus
          data-testid="product-decrease-quantity"
          onClick={ () => this.handleClick('minus') }
        />
        <span
          name="inputQuantity"
          data-testid="shopping-cart-product-quantity"
        >
          { inputQuantity }
        </span>
        <TiPlus
          data-testid="product-increase-quantity"
          onClick={ () => this.handleClick('plus') }
        />
      </div>
    );
  }
}

ControlsCart.defaultProps = {
  quantity: 1,
  onChange: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
};

ControlsCart.propTypes = {
  quantity: PropTypes.number,
  onChange: PropTypes.func,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
};

export default ControlsCart;
