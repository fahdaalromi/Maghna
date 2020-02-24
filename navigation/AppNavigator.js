import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignIn from "../screens/SignIn";

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    
   // screen: SignIn,
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