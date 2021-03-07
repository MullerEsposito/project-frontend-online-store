import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProductCard.css';

class ProductCard extends Component {
  renderProductCard() {
    const { product } = this.props;
    // console.log(product);
    return (
      <div data-testid="product" className="container-product-card">
        <header>{ product.title }</header>
        <img src={ product.thumbnail } alt="" />
        <p>{`R$ ${product.price}`}</p>
      </div>
    );
  }

  render() {
    return this.renderProductCard();
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
