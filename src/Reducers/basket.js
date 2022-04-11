const getBasketItems = (state = false, action) =>{
    switch(action.type){
        case 'getBasketItems':
            return action.payload;
        default:
            return state
    }
}

export default getBasketItems


