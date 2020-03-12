import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Platform,
    StyleSheet, Text, View, Image, Button, backgroundColor, Alert, border, WIDTH, TouchableHighlight, 
    TouchableOpacity, ScrollView, ImageBackground
} from 'react-native';
import { FontAwesome,FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import { MonoText } from '../components/StyledText';
import {LinearGradient} from 'expo-linear-gradient';

export default class supdevicesScreen extends Component {
  render() {


    return (
    <View style={{ width:'100%' , height:'100%', flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#F7FAFF'}}>
    <ImageBackground source={require('./otherhalf.png')} style={{ width:'100%' , height:'120%', flex: 1, justifyContent: "center", alignItems: "center"}}>
    <View style={{ fontSize:25, backgroundColor:'white', color: '#6FA0AF', justifyContent: 'center', width: 295, height: 90, left:8, borderRadius: 25, marginHorizontal: 25, paddingLeft: 220, paddingRight:10, paddingBottom: 15, bottom: 20}}>
    <Text style={{color: '#2cb457' ,fontWeight: 'bold', fontSize:22, top:37}}>الإنارة</Text>
    <Text style={{color: 'grey' ,fontWeight: 'bold', fontSize:12, paddingTop:8, paddingLeft:6,top:40}}>مفتوحة</Text>
    <MaterialCommunityIcons style={{ right:190, bottom: 17}} name="lightbulb-on-outline" size={55} color= {'#2cb457'} />
    </View>
    
    
    <View style={{ fontSize:25, backgroundColor:'white', color: '#6FA0AF', justifyContent: 'center', width: 295, height: 90, left:8, borderRadius: 25, marginHorizontal: 25, paddingLeft: 220, paddingRight:10, paddingBottom: 15, bottom: 0}}>
    <Text style={{color: '#6FA0AF' ,fontWeight: 'bold', fontSize:22, top:37}}>التلفاز</Text>
    <Text style={{color: 'grey' ,fontWeight: 'bold', fontSize:12, paddingTop:8, paddingLeft:11,top:40}}>مغلق</Text>
    <FontAwesome style={{ right:190, bottom: 17}} name="tv" size={55} color= {'#6FA0AF'} />
    </View>
    
    
    <View style={{ fontSize:25, backgroundColor:'white', color: '#6FA0AF', justifyContent: 'center', width: 295, height: 90, left:8, borderRadius: 25, marginHorizontal: 25, paddingLeft: 220, paddingRight:10, paddingBottom: 15, bottom: -20}}>
    <Text style={{color: 'grey' ,fontWeight: 'bold', fontSize:22, top:37}}>البوابة</Text>
    <Text style={{color: 'grey' ,fontWeight: 'bold', fontSize:12, paddingTop:6, paddingLeft:1,top:40}}>غير متصلة</Text>
    <MaterialCommunityIcons style={{ right:190, bottom: 17}} name="garage" size={55} color= {'grey'} />
    </View>
    
    
    <View style={{ fontSize:25, backgroundColor:'white', color: '#6FA0AF', justifyContent: 'center', width: 295, height: 90, left:8, borderRadius: 25, marginHorizontal: 25, paddingLeft: 220, paddingRight:10, paddingBottom: 15, bottom: -40}}>
    <Text style={{color: '#6FA0AF' ,fontWeight: 'bold', fontSize:19, top:37}}>الانترنت</Text>
    <Text style={{color: 'grey' ,fontWeight: 'bold', fontSize:12, paddingTop:8, paddingLeft:13,top:40}}>مغلق</Text>
    <Feather style={{ right:190, bottom: 17}} name="wifi" size={55} color= {'#6FA0AF'} />
    </View>
    
    
    </ImageBackground>
    
    
    
    
    </View>
    );
    }
    
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
      <SimpleLineIcons name="logout" size={24} color="#fff" />
    </TouchableOpacity>
  ),
  headerStyle: {
    backgroundColor: '#8BC4D0',
    color:'white'
    
 }
,
 headerTitleStyle: {
  color: '#fff'
}
,

});




const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

  tabBarInfoText: {
    fontSize: 17,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },

  mapStyle: {
    alignSelf: 'stretch',
    height:'100%'
    //flex:1,
    //margin : 70,
  },
  signupButton: {

    height:40,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom:10,
   width:70,
   borderRadius:45,
   borderColor:'#BBCCCF',
   borderWidth:1,
   backgroundColor: "#3E82A7",
   //paddingBottom:10
   
    
  },
  signUpText: {
    color: 'white',
    fontSize:15,
  },
});
