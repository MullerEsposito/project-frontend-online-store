import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './ProductCard.css';

class ProductCard extends Component {
  renderProductCard() {
    const { product } = this.props;
    return (
      <div data-testid="product" className="container-product-card">
        <Link data-testid="product-detail-link" to={ `/product-details/${product.id}` }>
          <header>{ product.title }</header>
          <img src={ product.thumbnail } alt="" />
          <p>{`R$ ${product.price}`}</p>
        </Link>
      </div>
    );
  }

  render() {
    return this.renderProductCard();
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
