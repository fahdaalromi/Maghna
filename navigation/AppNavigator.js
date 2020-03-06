import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from "../screens/WelcomeScreen";

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    
   //WelcomeScreen : WelcomeScreen,
    Main: MainTabNavigator,
  })
);

/*
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignIn from "../screens/SignIn";

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    screen: SignIn,
    Main: MainTabNavigator,
  })
);*/