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

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick(operation) {
    let { inputQuantity } = this.state;
    inputQuantity = operation === 'plus'
      ? inputQuantity + 1
      : inputQuantity - 1;

    this.setState({ inputQuantity });
  }

  render() {
    const { quantity } = this.props;

    return (
      <div className="container-controls-cart">
        <TiMinus onClick={ () => this.handleClick('minus') } />
        <input
          name="inputQuantity"
          data-testid="shopping-cart-product-quantity"
          value={ quantity }
          onChange={ this.handleOnChange }
        />
        <TiPlus onClick={ () => this.handleClick('plus') } />
      </div>
    );
  }
}

ControlsCart.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default ControlsCart;
