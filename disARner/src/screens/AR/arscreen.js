import React from 'react';
import {Text} from 'react-native';
import {ViroARSceneNavigator} from 'react-viro';

const sharedProps = {
  apiKey: 'API_KEY_HERE',
};
const InitialARScene = require('./helper');

export default function _getARNavigator() {
  console.log('masuk di ARSCreen');
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
