import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import {createStore} from 'redux';
import allReducers from '../../Reducers';
import {Provider} from 'react-redux';
import Header from '../Header';
import ProductOptions from '../ProductPage/ProductOptions';
import products from '../../Data/sampleData.json';

window.alert = jest.fn();
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

describe('Cart component', () => {
    it('Clear basket button empties product from cart', async () => {
        const { getByText, getByTestId, queryByTestId } = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/> <Header/> </Provider>);
        window.alert.mockClear();
        await waitFor(() => getByText('Nintendo Switch Console'));
        
        const productQuantity = getByTestId('product-quantity');
        fireEvent.change(productQuantity, {target: {value: "3"}});
        const submitButton = getByText("Add to Basket");
        fireEvent.click(submitButton);
        const basketIcon = queryByTestId('basket-test');
        fireEvent.click(basketIcon);

        const clearBasketButton = queryByTestId('clear-basket');
        fireEvent.click(clearBasketButton);
    });

    it('Clicking the cart button when the cart is open minimizes the cart when cart has a product in the cart', async () => {
        const {getByText, getByTestId, queryByTestId } = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/> <Header/> </Provider>);
        window.alert.mockClear();
        await waitFor(() => getByText('Nintendo Switch Console'));
        
        const productQuantity = getByTestId('product-quantity');
        fireEvent.change(productQuantity, {target: {value: "3"}});
        const submitButton = getByText("Add to Basket");
        fireEvent.click(submitButton);
        const basketIcon = queryByTestId('basket-test');
        fireEvent.click(basketIcon);

        fireEvent.click(basketIcon);
        expect(() => screen.getByText('Proceed')).toThrow();
    });

    it('Clicking the cart button when the cart is open minimizes the cart when cart is empty', async () => {
        const {getByText, getByTestId, queryByTestId } = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/> <Header/> </Provider>);
        window.alert.mockClear();
        await waitFor(() => getByText('Nintendo Switch Console'));
        
        const productQuantity = getByTestId('product-quantity');
        fireEvent.change(productQuantity, {target: {value: "3"}});
        const submitButton = getByText("Add to Basket");
        fireEvent.click(submitButton);
        const basketIcon = queryByTestId('basket-test');
        fireEvent.click(basketIcon);

        fireEvent.click(basketIcon);
        expect(() => screen.getByText('You have no items in your basket')).toThrow();
    });
});
