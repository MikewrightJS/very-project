import React, {useState,useEffect } from 'react';
import {FormControl,InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import styles from './styles.module.css';
import {selectedProduct, getBasketItems} from '../../../Actions';
import {useDispatch, useSelector} from 'react-redux';



const ProductOptions = ({title, colours, defaultColour}) => {
    const [selectedColour, setSelectedColour] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [quantityHasError, setQuantityHasError] = useState(false);
    const [quantityHelperText, setQuantityHelperText] = useState("");
    const currentProduct = useSelector(state=>state.selectedProduct)

    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedColour(defaultColour ? defaultColour.color : '')
	}, [defaultColour]);

    
    const handleColourChange = (event) => {
        setSelectedColour(event.target.value);
        const productByColour = getProductByColour(colours, event.target.value);
        dispatch(selectedProduct(productByColour))
    };

    const handleQuantity = (event) => {
        setProductQuantity(event.target.value)
    }

    const getProductByColour = (colours, colour) => {
		const variant = colours.filter((item) => item.color === colour);
        return variant ? variant[0] : false;
	}

    const addToBasket = () => {
        if(productQuantity > 0){
            setQuantityHasError(false);
            setQuantityHelperText('')
            dispatch(getBasketItems({productTitle:title, productQuantity:productQuantity, ...currentProduct}))
            alert(`${selectedColour} and ${productQuantity}`)
        }else{
            setQuantityHasError(true);
            setQuantityHelperText('Quantity must be over 0')
        }
    }
    
    return(
    <div className={styles.product__container}>
        <div className={styles.product__image}>
        <img alt={`${title} ${defaultColour.color} variant`} src={defaultColour.image}/>
        </div>
        <div className={styles.product_options}>
            <h4>{title}</h4>
            <FormControl className={styles.product_options__form} fullWidth>
                <InputLabel>Colour</InputLabel>
                <Select
                    value={selectedColour}
                    label="Colour"
                    data-testid= "select-colour"
                    onChange={handleColourChange}>
                { colours && colours.map((colour) =>{
                        return <MenuItem data-testid={`select-${colour.color}`} key={colour.color} selected value={colour.color}>{colour.color}</MenuItem>
                    })}
                </Select>
                
                <TextField onChange={e =>handleQuantity(e)} value={productQuantity} 
                type="number" inputProps={{ min: 0, "data-testid":"product-quantity" }} id="quantity" label="Quantity"
                variant="outlined" error={quantityHasError} helperText={quantityHelperText}/>
                <Button onClick={addToBasket} variant="contained">Add to Basket</Button>
            </FormControl>
        </div>
    </div>
    )
}

export default ProductOptions