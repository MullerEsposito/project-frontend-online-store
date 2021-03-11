import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiStar } from 'react-icons/fi';

class StarRating extends Component {
  constructor() {
    super();
    this.state = {
      inputStar: false,
    };
    this.handleOnClickStar = this.handleOnClickStar.bind(this);
  }

  componentDidUpdate(prop, prevState) {
    if (prevState.inputStar === true) this.updateInputStar();
  }

  handleOnClickStar({ target: { name } }) {
    const { inputStar } = this.state;

    this.setState({ [name]: !inputStar });
  }

  updateInputStar() {
    this.setState({ inputStar: false });
  }

  render() {
    const { id, handleOnChange } = this.props;
    const { inputStar } = this.state;

    return (

      <label
        htmlFor={ `star${id}` }
        className={ inputStar ? 'checked' : '' }
      >
        <input
          id={ `star${id}` }
          type="radio"
          name="inputStar"
          checked={ inputStar }
          onChange={ (e) => { this.handleOnClickStar(e); handleOnChange(id); } }
        />
        <FiStar className="icon-star" />
      </label>
    );
  }
}
StarRating.defaultProps = {
  handleOnChange: () => {},
};

StarRating.propTypes = {
  handleOnChange: PropTypes.func,
  id: PropTypes.number.isRequired,
};

export default StarRating;
