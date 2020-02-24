import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome5 ,AntDesign,Feather} from "@expo/vector-icons";

import TabBarIcon from '../components/TabBarIcon';
import supdevicesScreen from '../screens/supdevicesScreen';
import RoutineScreen from '../screens/RoutineScreen';
import reportScreen from '../screens/reportScreen';
import profileScreen from '../screens/profileScreen';
import AddButton from "../components/AddButton";
import SignIn from "../screens/SignIn";


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ProfileStack = createStackNavigator(
  {
    profile: profileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'الملف الشخصي',
  tabBarIcon:
    <FontAwesome5 name="user" size={24} color="#CDCCCE" />
  
};



ProfileStack.path = '';

const RoutineStack = createStackNavigator(
  {
    Routine: RoutineScreen,
  },
  config
);

RoutineStack.navigationOptions = {
  tabBarLabel: 'الأنماط',
  tabBarIcon: ({ focused }) => (
    <AntDesign name="sync" size={24} color="#CDCCCE" />
  ),
};

RoutineStack.path = '';



const supdevicesStack = createStackNavigator(
  {
    supdevices: supdevicesScreen,
  },
  config
);

supdevicesStack.navigationOptions = {
  tabBarLabel: 'الأجهزة المتصلة',
  tabBarIcon: ({ focused }) => (
    <AntDesign name="sharealt" size={24} color="#CDCCCE" />
  ),
};

supdevicesStack.path = '';



const reportStack = createStackNavigator(
  {
    report: reportScreen,
  },
  config
);

reportStack.navigationOptions = {
  tabBarLabel: 'التقارير',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

reportStack.path = '';

const tabNavigator = createBottomTabNavigator({
  profileScreen,
  RoutineStack,
  supdevicesStack,
  reportStack,

});

tabNavigator.path = '';

export default tabNavigator;