import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EvaluationForm from './EvaluationForm';
import EvaluationList from './EvaluationList';

import './Evaluations.css';

class Evaluations extends Component {
  constructor() {
    super();
    this.state = {
      evaluations: [],
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleEvaluations = this.handleEvaluations.bind(this);
  }

  handleOnSubmit() {
    this.setState({ evaluations: [] });
  }

  handleEvaluations(evaluations) {
    this.setState({ evaluations });
  }

  render() {
    const { productId } = this.props;
    const { evaluations } = this.state;

    return (
      <div className="container-evaluations">
        <EvaluationForm productId={ productId } onSubmit={ this.handleOnSubmit } />
        <EvaluationList
          evaluations={ evaluations }
          handleEvaluations={ this.handleEvaluations }
        />
      </div>
    );
  }
}

Evaluations.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Evaluations;
