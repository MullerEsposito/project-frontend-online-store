import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

import './StarsRating.css';

class StarsRating extends Component {
  render() {
    const { numOfStars, handleOnChange, empty } = this.props;
    const stars = [];

    for (let i = 1; i <= numOfStars; i += 1) {
      stars.push(
        <StarRating
          key={ i }
          id={ i }
          handleOnChange={ handleOnChange }
        />,
      );
    }
    return (
      <div className={ `container-stars ${empty ? 'empty' : ''} ` }>
        {stars}
      </div>
    );
  }
}

StarsRating.defaultProps = {
  handleOnChange: () => {},
  empty: false,
};

StarsRating.propTypes = {
  numOfStars: PropTypes.number.isRequired,
  handleOnChange: PropTypes.func,
  empty: PropTypes.bool,
};

export default StarsRating;
