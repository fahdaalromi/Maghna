
import * as WebBrowser from 'expo-web-browser';
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import {Input, Button} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';
import { ifIphoneX } from 'react-native-iphone-x-helper'



export default function WelcomeScreen () {

    return (

        <View style={styles.container}>
      
        <Image 
        style={{ width: 230, height: 190, bottom: 110 }}
        source={require('../assets/images/white.png')} />
        <Text style={{ fontSize:25, color: '#ffffff', bottom: 93 }}>مرحبًا بك</Text>
  
  <View style={{ backgroundColor: '#6FA0AF', width: 260, borderRadius: 25, paddingLeft: 45, marginHorizontal: 25, paddingLeft: 2, top: 50,borderWidth: 4, borderColor: '#fff'}}>
        <Button title= "إنشاء حساب" color= 'white' onPress={() => this.props.navigation.navigate('SignUp')} > 
         
        </Button>
        </View>
  
        <View style={{ backgroundColor: '#ffffff', width: 260, borderRadius: 25, marginHorizontal: 25, paddingLeft: 2, top: 70,borderWidth: 4, borderColor: '#fff'}}>
        <Button title= "تسجيل دخول" color= '#6FA0AF'>
         
        </Button>
        
        </View>
  
      </View>
    );
  }





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6FA0AF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });





