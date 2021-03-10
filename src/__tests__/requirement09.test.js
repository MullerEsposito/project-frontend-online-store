import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';
import mockedCategoriesResult from '../__mocks__/categories';
import mockedQueryResult from '../__mocks__/query';
import mockedProductResult from '../__mocks__/product';

jest.mock('../services/api');
api.getCategories.mockImplementation(
  () => Promise.resolve(mockedCategoriesResult),
);
api.getProductsFromCategoryAndQuery.mockImplementation(
  () => Promise.resolve(mockedQueryResult),
);
api.getProductDetails.mockImplementation(
  () => Promise.resolve(mockedProductResult),
);


describe(`9 - Adicione um produto ao carrinho a partir de sua tela de exibição detalhada`, () => {
  it('Adiciona um produto ao carrinho da sua tela de detalhes', async () => {
    render(<App />);
    await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('category')[0]);
    await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('product-detail-link')[0]);
    await waitFor(() => expect(api.getProductDetails).toHaveBeenCalled());
    await waitFor(
      () => expect(screen.getByTestId('product-detail-name')).toHaveTextContent(
        mockedProductResult.title,
      ),
    );
    fireEvent.click(screen.getByTestId('product-detail-add-to-cart'));
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
    expect(screen.getAllByTestId('shopping-cart-product-name')[0]).toHaveTextContent(
      mockedProductResult.title,
    );
    expect(
      screen.getAllByTestId('shopping-cart-product-quantity')[0],
    ).toHaveValue('1');
  });
});
