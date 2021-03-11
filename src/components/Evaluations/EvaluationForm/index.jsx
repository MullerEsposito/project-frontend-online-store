import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { v4 } from 'uuid';

import './EvaluationForm.css';
import StarsRating from '../../StarsRating';

const initialState = {
  textareaEvaluation: '',
  inputEmail: '',
  numOfStars: '',
  empty: true,
};

class EvaluationForm extends Component {
  constructor() {
    super();
    this.state = {
      textareaEvaluation: '',
      inputEmail: '',
      numOfStars: '',
      empty: true,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeStars = this.handleOnChangeStars.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleOnChangeStars(numOfStars) {
    this.setState({ numOfStars, empty: false });
  }

  handleSubmit() {
    const { textareaEvaluation, inputEmail, numOfStars } = this.state;
    const { productId, onSubmit } = this.props;
    const evaluations = JSON.parse(localStorage.getItem('@ONLINE-STORE:Evaluations'));

    evaluations.push({
      id: v4(),
      productId,
      description: textareaEvaluation,
      email: inputEmail,
      rating: numOfStars,
    });

    localStorage.setItem('@ONLINE-STORE:Evaluations', JSON.stringify(evaluations));
    this.setState(initialState);
    onSubmit();
  }

  renderInputEmail() {
    const { inputEmail } = this.state;

    return (
      <input
        name="inputEmail"
        value={ inputEmail }
        onChange={ this.handleOnChange }
        type="email"
        placeholder="Email"
      />
    );
  }

  renderTextArea() {
    const { textareaEvaluation } = this.state;

    return (
      <textarea
        placeholder="Mensagem (opcional)"
        name="textareaEvaluation"
        value={ textareaEvaluation }
        onChange={ this.handleOnChange }
        data-testid="product-detail-evaluation"
        cols="50"
        rows="5"
      />
    );
  }

  render() {
    const { empty } = this.state;

    return (
      <>
        <p>Avaliações</p>
        <div className="container-evaluation-form">
          { this.renderInputEmail() }
          <IconContext.Provider value={ { size: '1em' } }>
            <StarsRating
              numOfStars={ 5 }
              handleOnChange={ this.handleOnChangeStars }
              empty={ empty }
            />
          </IconContext.Provider>
          { this.renderTextArea() }
          <button type="button" onClick={ this.handleSubmit }>
            Avaliar
          </button>
        </div>
      </>
    );
  }
}

EvaluationForm.propTypes = {
  productId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EvaluationForm;
