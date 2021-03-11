import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ListCategories.css';

class ListCategories extends Component {
  renderCategories() {
    const { categories, categoryId, handleCategoriesChange } = this.props;

    return categories.map((category) => (
      <label data-testid="category" key={ category.id } htmlFor={ category.id }>
        <input
          id={ category.id }
          value={ category.id }
          name="categoryId"
          type="radio"
          checked={ categoryId === category.id }
          onChange={ handleCategoriesChange }
        />
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

ListCategories.defaultProps = {
  categoryId: '',
};

ListCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  categoryId: PropTypes.string,
  handleCategoriesChange: PropTypes.func.isRequired,
};

export default ListCategories;
