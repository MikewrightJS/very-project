import React, { useState, useEffect } from 'react';
import Products from '../../Api/Api';
import ProductOptions from './ProductOptions/index';
import {Container} from '@mui/material';
import {defaultProduct} from '../../Actions';
import {useSelector, useDispatch} from 'react-redux';



const ProductPage = () => {
    const [products, setProducts] = useState(false);
    const [apiError, setApiError]= useState(false)
    const selectedProduct = useSelector(state=>state.selectedProduct)
    const dispatch = useDispatch();

    const defaultProductFind = function getDefaultProduct(array) {
      const variant = array.filter((item) => item.defaultImage == true);
          return variant ? variant[0] : null;
    }
    

    useEffect(() => {
		Products()
        .then((response) => {
          if(response){
          setProducts(response.data.product);
          dispatch(defaultProduct(defaultProductFind(response.data.product.colours)))
          }else{
            setApiError('Unable to load API')
          }
        })
	}, []);
  return(
      <Container maxWidth="md">
        {apiError ? 
          apiError
        :
        <ProductOptions title={products.title} colours={products.colours} defaultColour={selectedProduct}/>
        }
        </Container>
    )
}

export default ProductPage