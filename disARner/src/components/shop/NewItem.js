/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ImageBackground,
  ScrollView,
} from 'react-native';

import Colors from '../../constants/Colors';

const NewItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    // <TouchableCmp>
    <View style={styles.product}>
      <View>
        <ImageBackground
          source={{uri: props.image}}
          style={styles.imageContainer}>
          <View style={{flex: 2}} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <ScrollView>
              {/* <View> */}
              <Text style={styles.description}>{props.description}</Text>
            </ScrollView>
            {/* </View> */}
          </View>
        </ImageBackground>
      </View>
    </View>
    // </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 374,
    elevation: 2,
    margin: 20,
    width: 282,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    overflow: 'hidden',
  },
  infoContainer: {
    alignContent: 'flex-end',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    fontFamily: 'AirbnbCerealExtraBold',
    color: Colors.grayish,
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'AirbnbCerealBook',
  },
  description: {
    color: Colors.grayish,
    fontFamily: 'AirbnbCerealLight',
  },
});

export default NewItem;
