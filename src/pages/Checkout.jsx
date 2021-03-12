import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdCreditCard } from 'react-icons/md';
import { FaBarcode } from 'react-icons/fa';
import { TiArrowBackOutline } from 'react-icons/ti';
import { IconContext } from 'react-icons';

import './Checkout.css';

const formBuyer = {
  inputName: '',
  inputCpf: '',
  inputEmail: '',
  inputPhone: '',
  inputCep: '',
  inputAddress: '',
  inputComplement: '',
  inputNumber: '',
  inputCity: '',
  inputState: '' };

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      formBuyer,
      cart: [],
    };
    this.handleOnChangeForm = this.handleOnChangeForm.bind(this);
    this.handleOnChangePayment = this.handleOnChangePayment.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    this.loadCart();
  }

  handleOnChangeForm({ target: { name, value } }) {
    this.setState((state) => (
      {
        formBuyer: {
          ...state.formBuyer,
          [name]: value,
        },
      }
    ));
  }

  handleOnChangePayment({ target: { name, id } }) {
    this.setState({ [name]: id });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.verifiesRequiredInputs();
    alert('Agora sim =D!');
  }

  verifiesRequiredInputs() {
    const myRequiredInputs = Array.from(document.querySelectorAll('input'));
    const numOfRequiredReceives = myRequiredInputs.reduce((total, input) => (
      input.required ? total + 1 : total), 0);
    const numOfRequiredOnMyForm = 10;

    if (numOfRequiredReceives !== numOfRequiredOnMyForm) {
      return alert('Huumm safado, parece que você está tentando burlar o form!');
    }
  }

  loadCart() {
    const cart = localStorage.getItem('@ONLINE-STORE:Cart')
      ? JSON.parse(localStorage.getItem('@ONLINE-STORE:Cart'))
      : [];

    this.setState({ cart });
  }

  renderCartProducts() {
    const { cart } = this.state;
    const total = cart.reduce((sum, { price }) => sum + price, 0);

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
        <p>
          <strong>Total:</strong>
          {` ${total}`}
        </p>
      </fieldset>
    );
  }

  renderFormFirstLine() {
    const { formBuyer: { inputName, inputEmail, inputPhone, inputCpf } } = this.state;
    return (
      <>
        <input
          name="inputName"
          onChange={ this.handleOnChangeForm }
          value={ inputName }
          data-testid="checkout-fullname"
          placeholder="Nome Completo"
          required
        />
        <input
          name="inputCpf"
          onChange={ this.handleOnChangeForm }
          value={ inputCpf }
          data-testid="checkout-cpf"
          placeholder="CPF"
          required
        />
        <input
          name="inputEmail"
          onChange={ this.handleOnChangeForm }
          value={ inputEmail }
          data-testid="checkout-email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          name="inputPhone"
          onChange={ this.handleOnChangeForm }
          value={ inputPhone }
          data-testid="checkout-phone"
          placeholder="Telefone"
          required
        />
      </>
    );
  }

  renderFormSecondLine() {
    const { formBuyer: { inputCep, inputAddress } } = this.state;
    return (
      <>
        <input
          name="inputCep"
          onChange={ this.handleOnChangeForm }
          value={ inputCep }
          data-testid="checkout-cep"
          placeholder="CEP"
          required
        />
        <input
          name="inputAddress"
          onChange={ this.handleOnChangeForm }
          value={ inputAddress }
          data-testid="checkout-address"
          placeholder="Endereço"
          required
        />
      </>
    );
  }

  renderFormThirdLine() {
    const { formBuyer: { inputComplement, inputNumber,
      inputCity, inputState } } = this.state;
    return (
      <>
        <input
          name="inputComplement"
          onChange={ this.handleOnChangeForm }
          value={ inputComplement }
          placeholder="Complemento"
        />
        <input
          name="inputNumber"
          onChange={ this.handleOnChangeForm }
          value={ inputNumber }
          placeholder="Número"
          required
        />
        <input
          name="inputCity"
          value={ inputCity }
          onChange={ this.handleOnChangeForm }
          placeholder="Cidade"
          required
        />
        <input
          name="inputState"
          value={ inputState }
          onChange={ this.handleOnChangeForm }
          placeholder="Estado"
          required
        />
      </>
    );
  }

  renderBuyerInformation() {
    return (
      <fieldset className="container-buyer-information">
        <legend>Informações do Comprador</legend>
        { this.renderFormFirstLine() }
        { this.renderFormSecondLine() }
        { this.renderFormThirdLine() }
      </fieldset>
    );
  }

  renderCreditCards() {
    const { payment } = this.state;
    return (
      <div className="container-credit-card">
        <p>Cartão de Crédito</p>
        <label htmlFor="visa">
          <input
            name="payment"
            id="visa"
            onChange={ this.handleOnChangePayment }
            checked={ payment === 'visa' }
            type="radio"
          />
          Visa
          <MdCreditCard />
        </label>
        <label htmlFor="master">
          <input
            name="payment"
            id="master"
            onChange={ this.handleOnChangePayment }
            checked={ payment === 'master' }
            type="radio"
          />
          MasterCard
          <MdCreditCard />
        </label>
        <label htmlFor="elo">
          <input
            name="payment"
            id="elo"
            onChange={ this.handleOnChangePayment }
            checked={ payment === 'elo' }
            type="radio"
          />
          Elo
          <MdCreditCard />
        </label>
      </div>
    );
  }

  renderPaymentMethods() {
    const { payment } = this.state;
    return (
      <fieldset className="container-payment-methods">
        <legend>Método de Pagamento</legend>
        <div className="container-bill">
          <p>Boleto</p>
          <label htmlFor="bill">
            <input
              name="payment"
              id="bill"
              onChange={ this.handleOnChangePayment }
              checked={ payment === 'bill' }
              type="radio"
              required
            />
            <FaBarcode />
          </label>
        </div>
        { this.renderCreditCards() }
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
          <form onSubmit={ this.handleOnSubmit }>
            { this.renderCartProducts() }
            { this.renderBuyerInformation() }
            { this.renderPaymentMethods() }
            <button type="submit">Comprar</button>
          </form>
        </IconContext.Provider>
      </div>
    );
  }
}

export default Checkout;
