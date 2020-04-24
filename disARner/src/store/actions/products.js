import api from '../../api';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await api.get('/item');
      const loadedData = response.data;
      dispatch({type: SET_PRODUCTS, products: loadedData});
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data);
      }
    }
  };
};
