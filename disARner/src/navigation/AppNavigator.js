import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductsNavigator} from './ShopNavigator';

const Tab = createBottomTabNavigator();
// const defaultBottomTabOption = {

// };

const AppNavigator = props => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={ProductsNavigator} />
        <Tab.Screen name="Setting" component={ProductsNavigator} />
        <Tab.Screen name="Profile" component={ProductsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
