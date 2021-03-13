import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { TiArrowBackOutline } from 'react-icons/ti';

import { getProductDetails } from '../services/api';

import './ProductDetails.css';
import ControlsCart from '../components/ControlsCart';
import Evaluations from '../components/Evaluations';
import Cart from '../components/Cart';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      quantity: 1,
    };

    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
    this.handleOnChangeControls = this.handleOnChangeControls.bind(this);
  }

  componentDidMount() {
    this.fetchProductDetails();
  }

  handleAddProductToCart() {
    const { product, quantity } = this.state;

    const productToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
    this.setState({ productToAdd, quantity });
  }

  handleOnChangeControls(quantity) {
    this.setState({ quantity });
  }

  fetchProductDetails() {
    const { match: { params: { id } } } = this.props;

    this.setState({ isLoading: true }, async () => {
      const product = await getProductDetails(id);
      this.setState({ product, isLoading: false });
    });
  }

  renderProductDetails() {
    const { product } = this.state;

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
          <ControlsCart onChange={ this.handleOnChangeControls } />
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.handleAddProductToCart }
          >
            Adicionar ao Carrinho
          </button>
          <Evaluations productId={ product.id } />
        </footer>
      </>
    );
  }

  render() {
    const { isLoading, productToAdd, quantity } = this.state;
    return (
      <div className="container-product-details">
        <IconContext.Provider value={ { size: '2em' } }>
          <Link to="/">
            <TiArrowBackOutline />
          </Link>
          <Cart
            data-testid="shopping-cart-button"
            typeRender="icon"
            productToAdd={ productToAdd }
            quantity={ quantity }
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
