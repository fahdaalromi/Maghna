import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    
  //WelcomeScreen : WelcomeScreen,
  //Home:HomeScreen,
    Main: MainTabNavigator,
  })
);

