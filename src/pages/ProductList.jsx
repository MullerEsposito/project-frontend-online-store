import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';

import ListCategories from '../components/ListCategories';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

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
    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      if (name === 'categoryId') this.fetchProducts();
    });
  }

  handleSearch(e) {
    const enterKey = 13;
    if (e.keyCode === enterKey
        || e.type === 'click') {
      this.fetchProducts();
    }
  }

  handleAddProductToCart(productToAdd) {
    this.setState({ productToAdd });
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
      <ProductCard
        key={ product.id }
        product={ product }
        handleAddProductToCart={ this.handleAddProductToCart }
      />
    ));
  }

  render() {
    const { categories, categoryId, isLoading, productToAdd } = this.state;

    return (
      <>
        <ListCategories
          categories={ categories }
          handleCategoriesChange={ this.handleOnChange }
          categoryId={ categoryId }
        />
        <div className="container-search">
          { this.renderInputSearch() }
          <Cart
            typeRender="icon"
            productToAdd={ productToAdd }
          />
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
