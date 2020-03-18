import React from 'react';
import { Platform ,I18nManager} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome5,FontAwesome ,AntDesign,Feather,MaterialCommunityIcons,Foundation} from "@expo/vector-icons";
import TabBarIcon from '../components/TabBarIcon';
import supdevicesScreen from '../screens/supdevicesScreen';
import RoutineScreen from '../screens/RoutineScreen';
import reportScreen from '../screens/reportScreen';
import profileScreen from '../screens/profileScreen';
import AddButton from "../components/AddButton";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen"
import HomeScreen from "../screens/HomeScreen";
import instructionsScreen from "../screens/instructionsScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

import {LinearGradient} from 'expo-linear-gradient';
import locationPage from "../screens/locationPage";
import routineSubPage from "../screens/routineSubPage";

I18nManager.forceRTL(false)


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const welcomeStack = createStackNavigator(
  {
    welcome:WelcomeScreen,
    SignIn: SignInScreen,
    SignUp:SignUpScreen,
  },
  config
);
welcomeStack.path = '';



const HomeStack = createStackNavigator(
  {
   
    Home:HomeScreen,
    instructions:instructionsScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: ' الرئيسية',
  tabBarIcon:
  <MaterialCommunityIcons name="home-heart" size={43} color='white' />
};
HomeStack.path = '';

const ProfileStack = createStackNavigator(
  {
    profile: profileScreen,
    Home:HomeScreen,
    location:locationPage,
    SignIn:SignInScreen
    
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: ' الصفحة الشخصية',
  
  tabBarIcon:
    <FontAwesome5 name="user" size={24} color="#CDCCCE" />
  
};

ProfileStack.path = '';

const RoutineStack = createStackNavigator(
  {
    Routine: RoutineScreen,
    Home:HomeScreen,
    subRoutine:routineSubPage,
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
    Home:HomeScreen,
  },
  config
);

supdevicesStack.navigationOptions = {
  tabBarLabel: 'الأجهزة المتصلة',
  tabBarIcon: ({ focused }) => (
   // <LinearGradient colors={['#1784ab', '#9dd1d9']} style={{flex: 1}}>
    <AntDesign name="sharealt" size={24} color="#CDCCCE" />
  //  </LinearGradient>
  ),
};

supdevicesStack.path = '';



const reportStack = createStackNavigator(
  {
    report: reportScreen,
    Home:HomeScreen,
    //instructions:instructionsScreen,
  },
  config
);

reportStack.navigationOptions = {
  tabBarLabel: 'التقارير',
  tabBarIcon: ({ focused }) => (
    
    
    <FontAwesome name="newspaper-o" size={24} color="#CDCCCE" />
  ),
};

reportStack.path = '';




const tabNavigator = createBottomTabNavigator({
  ProfileStack,
  RoutineStack,
  HomeStack,
  supdevicesStack,
  reportStack,
}, 
{
   tabBarOptions: {
     style: {
      backgroundColor: '#4b9cb5'
     },
     labelStyle: {
       color: '#ffffff'
     }
   }
});



tabNavigator.path = '';

export default tabNavigator;
