import {render, waitFor, fireEvent } from '@testing-library/react';
import {createStore} from 'redux';
import allReducers from '../../../Reducers';
import ProductOptions from './index';
import products from './../../../Data/sampleData.json';
import {Provider} from 'react-redux';
import Header from '../../Header';
import Products from '../../../Api/Api';
import axios from "axios";

window.alert = jest.fn();
jest.mock("axios");
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

describe('Product component', () => {
    it('Changing the colour variant from select box', async () => {
        const { getByText, getByTestId } = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/></Provider>);
        await waitFor(() => getByText('Nintendo Switch Console'));
        
        const colourDropdown = await waitFor(() => getByTestId('select-colour'));

        // click event doesnt work with MUI, so mouseDown is used
        fireEvent.mouseDown(colourDropdown.childNodes[0]);
        const greyColourSelect = await waitFor(() => getByText('grey'));
        fireEvent.click(greyColourSelect);
        
        const newColourDropdown = await (await waitFor(() => getByTestId('select-colour'))).childNodes[1];
        expect(newColourDropdown.value).toBe('grey');        
     });

    it('Increase the quantity of the product', async () => {
        const {getByTestId} = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/></Provider>);
		await waitFor(() => getByTestId('product-quantity'));
        const productQuantity = getByTestId('product-quantity');
        fireEvent.change(productQuantity, {target: {value: "5"}});
        expect(productQuantity.value).toBe("5");
    });

    it('Display an error message if quantity is less than 1', async () => {
        const {getByText, getByTestId } = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/></Provider>);
		await waitFor(() => getByText('Nintendo Switch Console'));
        const productQuantity = getByTestId('product-quantity');

        fireEvent.change(productQuantity, {target: {value: "0"}});
        const submitButton = getByText("Add to Basket")

        fireEvent.click(submitButton)
        expect(getByText('Quantity must be over 0')).toBeInTheDocument;
    });

    it('Display an error message if quantity is empty', async () => {
        const {getByText, getByTestId } = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/></Provider>);
		await waitFor(() => getByText('Nintendo Switch Console'));

        const productQuantity = getByTestId('product-quantity');
        fireEvent.change(productQuantity, {target: {value: " "}});
        const submitButton = getByText("Add to Basket")

        fireEvent.click(submitButton)
        expect(getByText('Quantity must be over 0')).toBeInTheDocument;
    });

    it('Inputting 0 quantity does not insert into basket', async () => {
        const {getByText, getByTestId, queryByTestId } = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/> <Header/> </Provider>);
        window.alert.mockClear();
        await waitFor(() => getByText('Nintendo Switch Console'));
        const productQuantity = getByTestId('product-quantity');

        fireEvent.change(productQuantity, {target: {value: "0"}});
        const submitButton = getByText("Add to Basket")
        fireEvent.click(submitButton)

        const basketIcon = queryByTestId('basket-test');
        fireEvent.click(basketIcon);
        expect(getByText("You have no items in your basket")).toBeInTheDocument;
    });

    it('Empty quantity does not insert into basket', async () => {
        const {getByText, getByTestId, queryByTestId } = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/> <Header/> </Provider>);
        window.alert.mockClear();
        await waitFor(() => getByText('Nintendo Switch Console'));
        const productQuantity = getByTestId('product-quantity');

        fireEvent.change(productQuantity, {target: {value: " "}});
        const submitButton = getByText("Add to Basket")
        fireEvent.click(submitButton)

        const basketIcon = queryByTestId('basket-test');
        fireEvent.click(basketIcon);
        expect(getByText("You have no items in your basket")).toBeInTheDocument;
    });

    it('Inserts into basket', async () => {
        const {getByText, getByTestId, queryByTestId } = render(<Provider store={store}><ProductOptions title={products.product.title} colours={products.product.colours} defaultColour={products.product.colours[0]}/> <Header/> </Provider>);
        window.alert.mockClear();
        await waitFor(() => getByText('Nintendo Switch Console'));
        const productQuantity = getByTestId('product-quantity');

        fireEvent.change(productQuantity, {target: {value: "3"}});
        const submitButton = getByText("Add to Basket")
        fireEvent.click(submitButton)

        const basketIcon = queryByTestId('basket-test');
        fireEvent.click(basketIcon);
        expect(getByText('Proceed')).toBeInTheDocument;
    });

    it('If API is unable to load', async () => {
        axios.get = jest.fn().mockRejectedValue('Unable to load API');
        expect(Products()).rejects.toThrowError('Unable to load API');
    });

    it('If API loads successfully', async () => {
        axios.get = jest.fn().mockResolvedValue(products);
        expect(Products()).resolves.toEqual(products);
    });
});
