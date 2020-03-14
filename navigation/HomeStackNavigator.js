import React from 'react';
import { Platform ,I18nManager} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";

const HomeStack = createStackNavigator(
    {
        HomeScreen: HomeScreen,
    },
    {
        navigationOptions: {
            backgroundColor: '#2d8cb1',
        },
    }
);

export default createAppContainer(HomeStack);