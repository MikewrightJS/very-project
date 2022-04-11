const selectedProduct = (state = false, action) =>{
    switch(action.type){
        case 'selectedProduct':
        return action.payload;

        case 'defaultProduct':
            return action.payload;

        default:
            return state
    }
}

export default selectedProduct


