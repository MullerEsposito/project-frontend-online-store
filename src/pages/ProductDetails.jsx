import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { TiArrowBackOutline } from 'react-icons/ti';

import { getProductDetails } from '../services/api';

import './ProductDetails.css';
import ControlsCart from '../components/ControlsCart';
import Cart from '../components/Cart';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cart: [],
    };
    this.handleOnCartChange = this.handleOnCartChange.bind(this);
    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
  }

  componentDidMount() {
    this.fetchProductDetails();
  }

  handleOnCartChange(cart) {
    this.setState({ cart });
  }

  handleAddProductToCart() {
    const { product } = this.state;

    const productToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    };
    this.setState({ productToAdd });
  }

  fetchProductDetails() {
    const { match: { params: { id } } } = this.props;

    this.setState({ isLoading: true }, async () => {
      const product = await getProductDetails(id);
      this.setState({ product, isLoading: false });
    });
  }

  renderProductDetails() {
    const { product, cart } = this.state;

    const quantity = cart.reduce((total, cartProduct) => (cartProduct.id === product.id
      ? cartProduct.quantity
      : total), 0);

    return (
      <>
        <h1 data-testid="product-detail-name">
          {`${product.title} - R$ ${product.price}`}
        </h1>
        <img src={ product.pictures[0].url } alt="" />
        <div className="container-technical-specification">
          <h2>Especificações Técnicas</h2>
          <main>
            <ul>
              { product.attributes.map((atrib) => (
                <li key={ atrib.id }>{`${atrib.name} ${atrib.value_name}`}</li>
              )) }
            </ul>
          </main>
        </div>
        <footer>
          <p>Quantidade</p>
          <ControlsCart quantity={ quantity } />
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.handleAddProductToCart }
          >
            Adicionar ao Carrinho
          </button>
        </footer>
      </>
    );
  }

  render() {
    const { isLoading, productToAdd, cart } = this.state;
    return (
      <div className="container-product-details">
        <IconContext.Provider value={ { size: '2em' } }>
          <Link to="/">
            <TiArrowBackOutline />
          </Link>
          <Cart
            data-testid="shopping-cart-button"
            cart={ cart }
            handleOnCartChange={ this.handleOnCartChange }
            productToAdd={ productToAdd }
          />
          { isLoading && <p>Carregando...</p> }
          { isLoading || this.renderProductDetails() }
        </IconContext.Provider>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
