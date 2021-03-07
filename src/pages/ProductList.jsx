import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { IconContext } from 'react-icons';

import ListCategories from '../components/ListCategories';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './ProductList.css';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSearch(e) {
    const enterKey = 13;
    if (e.keyCode === enterKey
        || e.type === 'click') {
      this.fetchProducts();
    }
  }

  async fetchCategories() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  fetchProducts() {
    const { categoryId, inputSearch } = this.state;

    this.setState({ isLoading: true }, async () => {
      const products = await getProductsFromCategoryAndQuery(categoryId, inputSearch)
        .then((json) => json.results);
      this.setState({ products, isLoading: false });
    });
  }

  renderInputSearch() {
    return (
      <label className="container-inputSearch" htmlFor="inputSearch">
        <FiSearch />
        <input data-testid="query-button" type="button" onClick={ this.handleSearch } />

        <input
          data-testid="query-input"
          name="inputSearch"
          value={ this.inputSearch }
          onChange={ this.handleOnChange }
          onKeyUp={ this.handleSearch }
        />
      </label>
    );
  }

  renderLinkShoppingCart() {
    return (
      <IconContext.Provider value={ { size: '2em' } }>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          <FiShoppingCart />
        </Link>
      </IconContext.Provider>
    );
  }

  renderPlaceHolder() {
    const { products, isLoading } = this.state;
    if (products || isLoading) return;

    return (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );
  }

  renderProductCards() {
    const { products } = this.state;
    if (!products) return;
    return products.map((product) => (
      <ProductCard key={ product.id } product={ product } />
    ));
  }

  render() {
    const { categories, categoryId, isLoading } = this.state;

    return (
      <>
        <ListCategories
          categories={ categories }
          handleSearchChange={ this.handleOnChange }
          categoryId={ categoryId }
        />
        <div className="container-search">
          { this.renderInputSearch() }
          { this.renderLinkShoppingCart() }
          <div className="container-product-list">
            { isLoading && <p>Loading...</p> }
            { this.renderPlaceHolder() }
            { this.renderProductCards() }
          </div>
        </div>
      </>
    );
  }
}

export default ProductList;
