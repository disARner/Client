import api from '../../api';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    const response = await api.get('http://localhost:3000/item');
    const loadedData = response.data;

    dispatch({type: SET_PRODUCTS, products: loadedData});
  };
};
