import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';


export default createAppContainer(
  createSwitchNavigator({
  
  // signIp:SignInScreen,
   //WelcomeScreen : WelcomeScreen,
 // Home:HomeScreen,
    Main: MainTabNavigator,
  })
);

