import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {getBasketItems} from '../../Actions';

const Cart = () => {
    const basketItems = useSelector(state => state.basket);
    const dispatch = useDispatch();

    const clearBasket = () => {
        dispatch(getBasketItems(false))
    };

  return (
    <Card className={styles.header__cart} sx={{ minWidth: 275 }}>
    {
        !basketItems ? <CardContent>You have no items in your basket</CardContent> :
        <CardContent>
            <Typography sx={{ fontSize: 18, textAlign:'center' }} color="text.primary" gutterBottom>
                Basket Items
            </Typography>

            <div className="cart__items">
                <div style={{ backgroundImage:`url(${basketItems.image})` }} className={styles.cart__items_image}>
                </div>
                <div className={styles.cart__item_title}>
                        {basketItems.productTitle}
                </div>
            <div className={styles.cart__items_info}>
                    <span className={styles.cart__items_colour}>Colour : {basketItems.color}</span>
                    <span>Quantity : {basketItems.productQuantity}</span>
                </div>
                <div className={styles.cart__items_actions}>
                    <Button onClick={clearBasket} sx={{fontSize:12}} data-testid="clear-basket" variant="contained" color="error"> Clear Basket </Button>
                    <Button sx={{fontSize:12}} variant="contained" color="success"> Proceed </Button>
                </div>

            </div>
        </CardContent>
    }
    </Card>
  );
}

export default Cart;