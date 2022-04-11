import React, {useState } from 'react';
import styles from "./styles.module.css"
 import Logo from '../../Images/very-logo.svg'
import Basket from '../../Images/basket.svg'
import { Box } from '@mui/system'
import {useSelector} from 'react-redux';
import Cart from './../Cart'


const Header = () => {
    const basketItems = useSelector(state=>state.basket)
    const [cartIsOpen, setCartIsOpen] = useState(false)
    
    function handleCart(){
        setCartIsOpen(!cartIsOpen)
    }

    return(
        <Box className={styles.header_container}>
            <img className="header__logo" loading="lazy" src={Logo} height="58" width="58"
              alt="Very logo"/>
            <div placeholder='basket' data-testid="basket-test" onClick={handleCart}  className={styles.header__basket}>
                {basketItems && <span className={styles.header__basket_quantity}><span>{basketItems.productQuantity}</span></span>}
                <img className="header__basket_icon" loading="lazy" width="24" height="21" alt="Basket icon" src={Basket}/>
                <span className={styles.header__basket_label}>Basket</span>
            </div>
            {cartIsOpen && <Cart/>}
        </Box>
    )
}

export default Header