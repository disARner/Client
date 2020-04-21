import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput
} from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import {} from '../../store';
import Colors from '../../constants/Colors';


const LoginScreen = ({ navigation: { goBack }}) => {
  // const dispatch = useDispatch();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const windowWidth = Dimensions.get('screen').width;

  const handleSubmit = () => {
    //dispatch()
    console.log(username, email, password)
    goBack()
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View style={{ ...styles.container, width: windowWidth, marginBottom: 100 }}>
        <Text style={styles.titleText}>
          Register
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput 
            style={styles.textInput}
            autoFocus
            autoCompleteType="off"
            onChangeText={text => setUsername(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput 
            style={styles.textInput}
            autoFocus
            autoCompleteType="off"
            textContentType="emailAddress"
            keyboardType="email-address"
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

        <View style={{ ...styles.button, width: 150, marginVertical: 20, paddingHorizontal: 5 }} onTouchStart={handleSubmit}>
          <Text style={{ ...styles.buttonText, fontSize: 15 }}>Submit</Text>
        </View>
      </View>
    </View>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    color: '#37315e',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inputGroup: {
    padding: 5,
    margin: 10
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
    paddingHorizontal: 10,
    elevation: 5
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: Colors.blackish,
    width: 200,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#fdfdfd',
    backgroundColor: 'transparent',
  }
});