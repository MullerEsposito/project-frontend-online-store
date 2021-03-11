import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import _ from 'lodash';

import StarsRating from '../../StarsRating';

import './EvaluationList.css';

class EvaluationList extends Component {
  componentDidMount() {
    this.loadEvaluations();
  }

  componentDidUpdate(prevProps) {
    const { evaluations } = this.props;
    if (!_.isEqual(prevProps.evaluations, evaluations)) this.loadEvaluations();
  }

  loadEvaluations() {
    const { handleEvaluations } = this.props;
    const evaluationsStoraged = '@ONLINE-STORE:Evaluations';
    const evaluations = localStorage.getItem(evaluationsStoraged)
      ? JSON.parse(localStorage.getItem('@ONLINE-STORE:Evaluations'))
      : [];

    if (evaluations.length === 0) {
      localStorage.setItem(evaluationsStoraged, JSON.stringify(evaluations));
    }

    handleEvaluations(evaluations);
  }

  renderEvaluations() {
    const { evaluations } = this.props;

    return evaluations.map((evaluation) => (
      <div key={ evaluation.id } className="container-evaluation">
        <p>{ evaluation.email }</p>
        <StarsRating
          numOfStars={ evaluation.rating }
        />
        {evaluation.description && <p>{evaluation.description}</p>}
      </div>
    ));
  }

  render() {
    return (
      <div className="container-evaluation-list">
        <IconContext.Provider value={ { size: '1em' } }>
          { this.renderEvaluations() }
        </IconContext.Provider>
      </div>
    );
  }
}

EvaluationList.propTypes = {
  evaluations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    productId: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    rating: PropTypes.number,
  })).isRequired,
  handleEvaluations: PropTypes.func.isRequired,
};

export default EvaluationList;
