export const selectedProduct = (nr) => {
    return {
        type: 'selectedProduct',
        payload: nr
    };
};

export const defaultProduct = (nr) => {
    return {
        type: 'defaultProduct',
        payload: nr
    };
};

export const getBasketItems = (nr) => {
    return {
        type: 'getBasketItems',
        payload: nr
    };
};