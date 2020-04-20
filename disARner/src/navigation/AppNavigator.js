import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ProductsNavigator} from './ShopNavigator';
import Colors from '../constants/Colors';

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
        } else if (route.name === 'Wishlist') {
          iconName = 'md-heart';
        } else if (route.name === 'Profile') {
          iconName = 'md-contact';
        }
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Ionicons
              name={iconName}
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

const AppNavigator = props => {
  return (
    <NavigationContainer>
      {/* <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'md-home' : 'md-home';
            } else if (route.name === 'Wishlist') {
              iconName = focused ? 'md-heart' : 'ios-heart';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-contact' : 'md-contact';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.blackish,
          inactiveTintColor: Colors.grayish,
          style: {height: 100, elevation: 0.9},
          labelStyle: {position: 'relative'},
        }}> */}
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={ProductsNavigator} />
        <Tab.Screen name="Wishlist" component={ProductsNavigator} />
        <Tab.Screen name="Profile" component={ProductsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'white',
    elevation: 10,
  },
});

export default AppNavigator;
