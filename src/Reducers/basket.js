const getBasketItems = (state = false, action) => {
    return action.type === 'getBasketItems' ? action.payload : state;
};

export default getBasketItems;