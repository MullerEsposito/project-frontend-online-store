import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdCreditCard } from 'react-icons/md';
import { FaBarcode } from 'react-icons/fa';
import { TiArrowBackOutline } from 'react-icons/ti';
import { IconContext } from 'react-icons';

import './Checkout.css';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.loadCart();
  }

  loadCart() {
    const cart = localStorage.getItem('@ONLINE-STORE:Cart')
      ? JSON.parse(localStorage.getItem('@ONLINE-STORE:Cart'))
      : [];

    this.setState({ cart });
  }

  renderCartProducts() {
    const { cart } = this.state;

    return (
      <fieldset className="container-cart-products">
        <legend>Revise seus Produtos</legend>
        {
          cart.map((product) => (
            <div key={ product.id } className="container-cart-product">
              <img src={ product.thumbnail } alt="" />
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <span>{`R$ ${product.quantity * product.price}`}</span>
            </div>
          ))
        }
        <p>Valor Total da Compra: R$ 40,00</p>
      </fieldset>
    );
  }

  renderBuyerInformation() {
    return (
      <fieldset className="container-buyer-information">
        <legend>Informações do Comprador</legend>
        <input placeholder="Nome Completo" />
        <input placeholder="CPF" />
        <input type="email" placeholder="Email" />
        <input placeholder="Telefone" />
        <input placeholder="CEP" />
        <input placeholder="Endereço" />
        <input placeholder="Complemento" />
        <input placeholder="Número" />
        <input placeholder="Cidade" />
        <input placeholder="Estado" />
      </fieldset>
    );
  }

  renderPaymentMethods() {
    return (
      <fieldset className="container-payment-methods">
        <legend>Método de Pagamento</legend>
        <div className="container-bill">
          <p>Boleto</p>
          <label htmlFor="bill">
            <input type="radio" name="payment" />
            <FaBarcode />
          </label>
        </div>
        <div className="container-credit-card">
          <p>Cartão de Crédito</p>
          <label htmlFor="visa">
            <input type="radio" name="payment" id="visa" />
            Visa
            <MdCreditCard />
          </label>
          <label htmlFor="master">
            <input type="radio" name="payment" id="master" />
            MasterCard
            <MdCreditCard />
          </label>
          <label htmlFor="elo">
            <input type="radio" name="payment" id="elo" />
            Elo
            <MdCreditCard />
          </label>
        </div>
      </fieldset>
    );
  }

  render() {
    return (
      <div className="container-checkout">
        <IconContext.Provider value={ { size: '4em' } }>
          <Link to="/">
            <TiArrowBackOutline className="icon-arrowback" />
          </Link>
          { this.renderCartProducts() }
          { this.renderBuyerInformation() }
          { this.renderPaymentMethods() }
          <button type="button">Comprar</button>
        </IconContext.Provider>
      </div>
    );
  }
}

export default Checkout;
