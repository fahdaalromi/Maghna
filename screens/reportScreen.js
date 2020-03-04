import React from 'react';
const { width, height } = Dimensions.get('window');
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Header, Left, Body, Right, Footer, FooterTab, Button, Icon } from 'native-base';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import {LinearGradient} from 'expo-linear-gradient';
import { FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import Home from './Home';

export default function reportScreen() {
  
  return (

  <View style={styles.container}>
  
    <ImageBackground source={require('../assets/images/infobackground.png')} style={styles.bg_container}>

<ScrollView
    
    contentContainerStyle={styles.contentContainer}>
<Text>
  with reem
</Text>

  </ScrollView>
  </ImageBackground>
  </View>
  );
}

reportScreen.navigationOptions = ({navigation})=> ({

  headerTint:'#F7FAFF',
  headerTitle: 'التقارير',
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
    
    //flex: 1,
   justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFF',
  },
  contentContainer: {
  },

  header: {
    height: 50,
    ...ifIphoneX({
      marginTop: 50
    }, {
      marginTop: 24
    }),
    justifyContent: 'center',
  },
  headerItem: {
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 75,
  },
  bg_container: {
   height:"100%",
    justifyContent: 'center',
    alignItems: 'center'
  },

  view: {
    width: width,
    height: height,
  },
  articleView: {

    width: 0.9 * width,
    height:0.2*height,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    opacity: 0.9,
    marginTop: 20,
    borderRadius: 30,
    padding: 16,
  },
  articleTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2287ac',
  },
  articleDescription: {
    marginTop:20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#8abbc6',
  },
  articleFoot: {
    fontSize: 14,
    textAlign: 'right',
    color: '#8abbc6',
  },
  icon: {
    width: 30,
    height: 30,
  }
});