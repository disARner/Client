import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';

import ProductsOverviewScreen, {
  screenOptions as ProductOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, {
  screenOptions as ProductDetailScreenOptions,
} from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'AirbnbCerealBold',
  },
  headerBackTitleStyle: {
    fontFamily: 'AirbnbCerealAppExtraBold',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={ProductOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={ProductDetailScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   },
// );

// export default createAppContainer(ProductsNavigator);
