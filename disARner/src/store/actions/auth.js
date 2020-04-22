import api from '../../api';
import AsyncStorage from '@react-native-community/async-storage';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export const login = (email, password) => async dispatch => {
  try {
    const result = await api.post('/login', {
      email: email,
      password: password,
    });
    dispatch({type: SET_TOKEN, payload: result.data.token});
    dispatch({type: SET_AUTHENTICATED, payload: true});
    await AsyncStorage.setItem('token', result.data.token);
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
    }
  }
};

export const checkLogin = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      dispatch({type: SET_AUTHENTICATED, payload: true});
    } else {
      dispatch({type: SET_AUTHENTICATED, payload: false});
    }
  } catch (e) {
    dispatch({type: SET_AUTHENTICATED, payload: false});
  }
};

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.clear();
    dispatch({type: SET_AUTHENTICATED, payload: false});
  } catch (e) {
    console.log(e);
    dispatch({type: SET_AUTHENTICATED, payload: true});
  }
};
