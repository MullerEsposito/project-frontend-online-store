import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './ProductCard.css';

class ProductCard extends Component {
  constructor() {
    super();

    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
  }

  handleAddProductToCart() {
    const { product, handleAddProductToCart } = this.props;
    const productToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
    handleAddProductToCart(productToAdd);
  }

  renderProductCard() {
    const { product } = this.props;
    return (
      <div data-testid="product" className="container-product-card">
        <Link
          data-testid="product-detail-link"
          to={ `/product-details/${product.id}` }
        >
          <header>{ product.title }</header>
          <img src={ product.thumbnail } alt="" />
          <p>{`R$ ${product.price}`}</p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ this.handleAddProductToCart }
        >
          Adicionar ao Carrinho
        </button>
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
  handleAddProductToCart: PropTypes.func.isRequired,
};

export default ProductCard;
