import { render, fireEvent } from '@testing-library/react';
import {createStore} from 'redux'
import allReducers from '../../reducers'
import {Provider} from 'react-redux'
import Header from './index'

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

describe('Header component', () => {
    it('Should render the logo', async () => {
        const {getByAltText} = await render(<Provider store={store}><Header /></Provider>);
        expect(getByAltText('Very logo')).toBeInTheDocument();
      });

    it('Should render the Basket icon', async () => {
      const {getByAltText} = await render(<Provider store={store}><Header /></Provider>);
      expect(getByAltText('Basket icon')).toBeInTheDocument();
    });

    it('Clicking the basket with no items in the basket presents an empty basket', async () => {
      const {getByText, queryByTestId } = await render(<Provider store={store}><Header /></Provider>);
      const basketIcon = queryByTestId('basket-test');
      fireEvent.click(basketIcon);
      expect(getByText('You have no items in your basket')).toBeInTheDocument();
    });
});