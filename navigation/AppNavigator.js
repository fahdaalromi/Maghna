import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import MainTabNavigator from './MainTabNavigator';
import SignUpScreen from '../screens/SignUpScreen';

export default createAppContainer(
  createSwitchNavigator({
    signup:SignUpScreen,
 // WelcomeScreen : WelcomeScreen,
 // Home:HomeScreen,
    Main: MainTabNavigator,
  })
);

