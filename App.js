/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
//import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator , createAppContainer } from 'react-navigation';
import Trailers from './Trailers';
import Trailer from './Trailer';


const AppNavigator = createStackNavigator({
  Trailers: { screen: Trailers },
  Trailer: { screen: Trailer },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
        <AppContainer/>
    );
  }
}



