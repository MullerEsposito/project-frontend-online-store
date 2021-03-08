import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { TiArrowBackOutline } from 'react-icons/ti';
import { FiShoppingCart } from 'react-icons/fi';

import './ProductDetails.css';

class ProductDetails extends Component {
  render() {
    return (
      <div className="container-product-details">
        <IconContext.Provider value={ { size: '2em' } }>
          <Link to="/">
            <TiArrowBackOutline />
          </Link>
          <FiShoppingCart />
        </IconContext.Provider>
        <h1>Produto 1 - R$ 20,00</h1>
        <img src="https://yata.ostr.locaweb.com.br/b1da36362690140b82f2615336181d34f58abf5a5fadf78cb182f5aafb43242e" alt="" />
        <div className="container-technical-specification">
          <h2>Especificações Técnicas</h2>
          <main>
            <ul>
              <li>Especificação 1</li>
              <li>Especificação 2</li>
              <li>Especificação 3</li>
              <li>Especificação 4</li>
            </ul>
          </main>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
