import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/Headerbutton';

import {ViroARSceneNavigator} from 'react-viro';
const UNSET = 'UNSET';
const defaultNavigatorType = UNSET;
const AR_NAVIGATOR_TYPE = 'AR';

const sharedprops = {
  apiKey: 'API_KEY_HERE',
};

const InitialARScene = require('./../AR/helper.js');

const ProductDetailScreen = props => {
  const [navigatorType, setNavigatorType] = useState(defaultNavigatorType);
  const [sharedProps, setSharedProps] = useState(sharedprops);

  const productId = props.route.params.productId;
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  const dispatch = useDispatch();
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableOpacity;
  }

  const back = () => {
    props.navigation.dispatch(CommonActions.goBack());
  };

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('window').height;

  if (navigatorType == UNSET) {
    return (
      <ScrollView>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor="transparent"
        />
        <View style={styles.headerBar}>
          <View style={[styles.headerContainer, {width: windowWidth}]}>
            <View style={styles.circle}>
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  buttonWrapperStyle={styles.circleWrapper}
                  title="Back"
                  iconName="md-arrow-back"
                  onPress={() => {
                    back();
                  }}
                />
              </HeaderButtons>
            </View>
            <View stylee={styles.circle}>
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  buttonWrapperStyle={styles.circleWrapper}
                  title="Cart"
                  iconName="md-cart"
                  onPress={() => {}}
                />
              </HeaderButtons>
            </View>
          </View>
        </View>
        <View style={{width: windowWidth}}>
          <View style={{width: windowWidth, height: 508}}>
            <Image
              style={styles.image}
              source={{uri: selectedProduct.imageUrl}}
            />
          </View>
          <View style={styles.action}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{selectedProduct.name}</Text>
              <Text style={styles.price}>
                Rp. {selectedProduct.price.toFixed(2)}
              </Text>
              <Text style={styles.descriptionText}>
                {selectedProduct.description}
              </Text>
            </View>
            <View style={{backgroundColor: 'white', paddingVertical: '5%'}} />
            <View style={[styles.buttonContainer]}>
              <TouchableCmp onPress={() => {}}>
                <View style={styles.buttonCircle}>
                  <Ionicons size={28} color="black" name="md-heart" />
                </View>
              </TouchableCmp>
              <TouchableCmp
                onPress={() => {
                  console.log('test');
                  console.log(AR_NAVIGATOR_TYPE);
                  _getExperienceButtonOnPress(AR_NAVIGATOR_TYPE);
                }}>
                <View style={styles.buttonCircle}>
                  <Ionicons size={28} color="black" name="md-shirt" />
                </View>
              </TouchableCmp>
              <TouchableCmp
                onPress={() => {
                  dispatch(cartActions.addToCart(selectedProduct));
                }}>
                <View style={styles.buttonAdd}>
                  <Text style={styles.buttonAddText}>Add to Cart</Text>
                </View>
              </TouchableCmp>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  } else if (navigatorType == AR_NAVIGATOR_TYPE) {
    return _getARNavigator();
  }

  function _getARNavigator() {
    return (
      <>
        <ViroARSceneNavigator
          {...sharedProps}
          initialScene={{scene: InitialARScene}}
        />
        <Text
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            bottom: 10,
            margin: 10,
          }}>
          Back Button
        </Text>
      </>
    );
  }
  function _getExperienceButtonOnPress(navigatorType) {
    return () => {
      console.log(navigatorType);
      setNavigatorType(navigatorType);
    };
  }
};

export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.productTitle,
    headerStyle: {
      // backgroundColor: 'transparent',
      opacity: 100,
    },
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 508,
    resizeMode: 'cover',
  },
  action: {
    height: '100%',
  },
  buttonContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flexGrow: 1,
    // paddingVertical: '15%',
    justifyContent: 'center',
  },
  price: {
    fontSize: 20,
    color: Colors.accent,
    marginVertical: 20,
    fontFamily: 'AirbnbCerealMedium',
  },
  descriptionText: {
    fontFamily: 'AirbnbCerealLight',
    color: Colors.blackish,
    fontSize: 14,
  },
  buttonAdd: {
    height: 50,
    width: 180,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonAddText: {
    color: 'white',
    fontFamily: 'AirbnbCerealMedium',
    fontSize: 14,
    fontWeight: '400',
  },
  buttonCircle: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    backgroundColor: '#d8d8d8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  name: {
    fontFamily: 'AirbnbCerealMedium',
    fontSize: 16,
    color: Colors.blackish,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  headerBar: {
    position: 'absolute',
    zIndex: 1,
  },
  headerContainer: {
    backgroundColor: 'transparent',
    marginVertical: 30,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  circle: {
    position: 'relative',
  },
  circleWrapper: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 8,
    elevation: 8,
  },
});

export default ProductDetailScreen;
