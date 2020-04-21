import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import {} from '../../store';
import Colors from '../../constants/Colors';


const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const windowWidth = Dimensions.get('screen').width;

  const handleSubmit = () => {
    //dispatch()
    console.log(email, password)
  };

  return (
    <View style={{ backgroundColor: '#F5FCFF'}}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View style={{width: windowWidth}}>
        <Text style={styles.titleText}>
          Login
        </Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput 
            style={styles.textInput}
            autoFocus
            autoCompleteType="off"
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput 
            style={styles.textInput}
            autoFocus
            autoCompleteType="off"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
        </View>

        <View style={{ ...styles.button, width: 150, marginVertical: 15, paddingHorizontal: 5 }} onTouchStart={handleSubmit}>
          <Text style={{ ...styles.buttonText, fontSize: 15 }}>Login</Text>
        </View>
      </View>
    </View>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputGroup: {
    padding: 5
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 5
  },
  textInput: {
    height: 40, 
    backgroundColor: '#fdfdfd',
    borderRadius: 15,
    width: 300,
    paddingHorizontal: 10
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    width: 200
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#fdfdfd',
    backgroundColor: 'transparent',
  }
});