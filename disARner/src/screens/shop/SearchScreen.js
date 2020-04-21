import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';

const SearchScreen = props => {
  const [text, setText] = useState('');

  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const backButton = () => {
    props.navigation.dispatch(CommonActions.goBack());
  };

  return (
    <View>
      <View style={styles.searchBoxOutter}>
        <View style={styles.serachBoxContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                backButton();
              }}>
              <Ionicons name="md-arrow-back" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBox}>
            <TextInput
              onChangeText={value => setText(value)}
              defaultValue={text}
              textAlign={'left'}
              placeholder='Try "Nike"'
              style={styles.inputStyle}
            />
          </View>
          <View>
            <TouchableOpacity>
              <Ionicons name="md-search" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxOutter: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#f7f7f7',
    elevation: 2,
    borderRadius: 4,
  },
  searchBox: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 2,
  },
  serachBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputStyle: {
    fontFamily: 'AirbnbCerealLight',
  },
});

export default SearchScreen;
