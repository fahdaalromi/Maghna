import React from 'react';
import { Platform ,I18nManager} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen"
import WelcomeScreen from "../screens/WelcomeScreen";

const welcomeStack = createStackNavigator(
    {
      welcome: WelcomeScreen,
      SignIn: SignInScreen,
      SignUp:SignUpScreen,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
            backgroundColor: '#2d8cb1',
        },
        initialRouteName: 'welcome'
    }
);

export default createAppContainer(welcomeStack);