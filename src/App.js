import React from 'react';
import './App.css';
import Header from './Components/Header/index';
import ProductPage from './Components/ProductPage/index';
import {Container} from '@mui/material';

function App() {
  return (
      <Container sx={{paddingTop:3}} maxWidth="md">
        <Header/>
        <ProductPage/>
      </Container>
  );
}

export default App;
