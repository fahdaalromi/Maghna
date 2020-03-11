import React from 'react';
import { Platform ,I18nManager} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome5 ,AntDesign,Feather} from "@expo/vector-icons";
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
HomeStack.path = '';

const ProfileStack = createStackNavigator(
  {
    profile: profileScreen,
    Home:HomeScreen,
    location:locationPage
    
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
    <AntDesign name="sharealt" size={24} color="#CDCCCE" />
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
