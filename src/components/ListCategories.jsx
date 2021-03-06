import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ListCategories.css';

class ListCategories extends Component {
  renderCategories() {
    const { categories } = this.props;
    console.log(categories);
    return categories.map((category) => (
      <label data-testid="category" key={ category.id } htmlFor={ category.id }>
        <input id={ category.id } name="category" type="radio" />
        { category.name }
      </label>
    ));
  }

  render() {
    return (
      <div className="container-list-categories">
        Categories:
        { this.renderCategories() }
      </div>
    );
  }
}

ListCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default ListCategories;
