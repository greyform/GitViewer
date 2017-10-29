/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';

import Login from './src/screens/Login';
import FirstScreen from './src/FirstScreen';




const App = StackNavigator({
  Login: { screen: Login },
  Main: { screen: FirstScreen },
}, {
  headerMode: 'none',
});


export default App