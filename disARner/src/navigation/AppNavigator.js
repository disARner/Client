import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {ProductsNavigator, AuthNavigator} from './ShopNavigator';
import * as authActions from '../store/actions/auth';

const AppNavigator = props => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.userdata.auth);

  useEffect(() => {
    dispatch(authActions.checkLogin());
  }, [dispatch]);

  return (
    <NavigationContainer>
      {auth ? <ProductsNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
