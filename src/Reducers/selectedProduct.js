const selectedProduct = (state = false, action) => {
    switch (action.type) {
        case 'selectedProduct':
        case 'defaultProduct':
            return action.payload;
        default:
            return state
    }
};

export default selectedProduct;