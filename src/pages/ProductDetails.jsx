import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { TiArrowBackOutline } from 'react-icons/ti';
import { FiShoppingCart } from 'react-icons/fi';

import { getProductDetails } from '../services/api';

import './ProductDetails.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchProductDetails();
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
      </>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="container-product-details">
        <IconContext.Provider value={ { size: '2em' } }>
          <Link to="/">
            <TiArrowBackOutline />
          </Link>
          <FiShoppingCart />
        </IconContext.Provider>
        { isLoading && <p>Carregando...</p> }
        { isLoading || this.renderProductDetails() }
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
