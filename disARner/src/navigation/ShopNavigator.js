import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Platform, TouchableOpacity, StyleSheet} from 'react-native';

import ProductsOverviewScreen, {
  screenOptions as ProductOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, {
  screenOptions as ProductDetailScreenOptions,
} from '../screens/shop/ProductDetailScreen';
import SearchScreen from '../screens/shop/SearchScreen';
import CartScreen from '../screens/shop/CartScreen';
import LoginsCreen from '../screens/user/LoginScreen';
import RegisterScreen from '../screens/user/RegisterScreen';

import Colors from '../constants/Colors';
import LoginScreen from '../screens/user/LoginScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleStyle: {
    fontFamily: 'AirbnbCerealBold',
  },
  headerBackTitleStyle: {
    fontFamily: 'AirbnbCerealAppExtraBold',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const Tab = createBottomTabNavigator();
// const defaultBottomTabOption = {

// };

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let iconName;
        if (route.name === 'Home') {
          iconName = 'md-home';
        } else if (route.name === 'Cart') {
          iconName = 'md-list-box';
        } else if (route.name === 'Profile') {
          iconName = 'md-contact';
        } else if (route.name === 'Search') {
          iconName = 'md-search';
        }
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}>
            <Ionicons
              name={iconName}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{textAlign: 'center'}}
              color={isFocused ? Colors.blackish : Colors.grayish}
              size={25}
            />
            <Text style={{color: isFocused ? Colors.blackish : Colors.grayish}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={ProductsOverviewScreen} />
      <Tab.Screen
        name="Cart"
        options={{tabBarVisible: false}}
        component={CartScreen}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProductsOverviewScreen} />
    </Tab.Navigator>
  );
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={HomeTabs}
        options={ProductOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={ProductDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="CartScreen"
        component={CartScreen}
        options={ProductDetailScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'white',
    elevation: 6,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
});

const AuthStackNavigator = createStackNavigator();
const authScreenOptions = {
  headerShown: false,
};
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={authScreenOptions}>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{animationTypeForReplace: 'pop'}}
      />
      <AuthStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: true}}
      />
    </AuthStackNavigator.Navigator>
  );
};
