import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import { FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";

import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';

import { MonoText } from '../components/StyledText';

export default function supdevicesScreen() {
  return (

    <View style={styles.container}>
    
<Text  style={styles.getStartedText}  >
  not ready
</Text>
     
   


    </View>
  );
}




supdevicesScreen.navigationOptions = ({navigation})=> ({

  headerTitle:  'الأجهزة المتصلة',
  headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#CDCCCE" />
    </TouchableOpacity>

  ),
  headerLeft:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('')}} style={{marginLeft:15}}>
      <SimpleLineIcons name="logout" size={24} color="#CDCCCE" />
    </TouchableOpacity>
  ),

});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
   // height:'100%'
    
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

 
  navigationFilename: {
    marginTop: 5,
  },

  

});
