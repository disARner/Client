import PRODUCTS from '../../dummy_data/product';

import {SET_PRODUCTS} from '../actions/products';
const initialState = {
  availableProducts: PRODUCTS,
  // userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
      };
    default:
      return state;
  }
};
