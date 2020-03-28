
import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Platform,
    StyleSheet, Text, View, Image, Button, backgroundColor, Alert, border, WIDTH, TouchableHighlight, 
    TouchableOpacity, ScrollView, ImageBackground
} from 'react-native';
import { FontAwesome,FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons , Entypo} from "@expo/vector-icons";
import { MonoText } from '../components/StyledText';
import {LinearGradient} from 'expo-linear-gradient';
import STTButton from '../STTButton'
import axios from 'axios'

export default class  supdevicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    isLambConnected : '',
    isLambOn : '' 

    } 
}
  async componentDidMount(){
    this.showLambStatus();
    }

    showLambStatus(){
      axios.get('https://192.168.100.17/api/gFkvbAB2-8SKjoqdgiTg5iWEHnpRtpo-gR9WVzoR/lights/3')
      .then(res => res.json())
      .then(res => {
        console.log(res.state.on)
      }) 
      .catch(error => {console.log(error);
        isLambConnected = 'غير متصله',
        isLambOn = 'مغلقه' 
      })

      if(res.state.on == true){
        isLambConnected = 'متصله',
        isLambOn = 'مفتوحه' 
      }

      if(res.state.on == false){
        isLambConnected = 'متصله',
        isLambOn = 'مغلقه' 
      }
    }
  


render(){
    return (

      <ScrollView>

    <View style={{ width:'100%' , height:'100%', flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#F7FAFF'}}>

    <ImageBackground source={require('./otherhalf.png')} style={{ width:'100%' , height:'120%', flex: 1, justifyContent: "center", alignItems: "center"}}>

    <View style={styles.scontainer}>
    <Text style={styles.openText}>الإنارة</Text>
    <Text style={styles.bottomText}>{this.state.isLambConnected}</Text>
    <Text style={styles.bottomText}>{this.state.isLambOn}</Text>
    <MaterialCommunityIcons style={{ right:190, bottom: 17}} name="lightbulb-on-outline" size={55} color= {'#2cb457'} />
    </View>
    
    
    <View style={styles.scontainer}>
    <Text style={styles.colseText}>التلفاز</Text>
    <Text style={styles.bottomText}>غير متصل</Text>
    <FontAwesome style={{ right:190, bottom: 17}} name="tv" size={55} color= {'#6FA0AF'} />
    </View>
    
    
    <View style={styles.scontainer}>
    <Text style={styles.NotConnText}>البوابة</Text>
    <Text style={styles.bottomText}>غير متصلة</Text>
    <MaterialCommunityIcons style={{ right:190, bottom: 17}} name="garage" size={55} color= {'grey'} />
    </View>
    
    
    <View style={styles.scontainer}>
    <Text style={styles.colseText}>الانترنت</Text>
    <Text style={styles.bottomText}> متصل</Text>
    <Feather style={{ right:190, bottom: 17}} name="wifi" size={55} color= {'#6FA0AF'} />
    </View>


    </ImageBackground>
    
    

    
    </View>
    </ScrollView>
    );
}
    
}




supdevicesScreen.navigationOptions = ({navigation})=> ({

  headerTitle:  'الأجهزة المتصلة',
  
 /* headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#fff" />
    </TouchableOpacity>
  ),
  */
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

  scontainer:{ 
    fontSize:25, 
    backgroundColor:'white', 
    color: '#6FA0AF', 
    justifyContent: 'center', 
    width: 295, 
    height: 90, 
    left:8, 
    marginTop:20,
    borderRadius: 25, 
    marginHorizontal: 25, 
    paddingLeft: 220, 
    paddingRight:10, 
    paddingBottom: 15, 
    bottom: -40,
    shadowOpacity: 0.1,
    opacity: 0.9,
    
  },

    colseText:{
      color: '#6FA0AF' ,
      fontWeight: 'bold', 
      fontSize:19, 
      top:37,
      width:200,
      marginLeft:-20,
    },

      bottomText:{
        color: 'grey' ,
        fontWeight: 'bold', 
        fontSize:12, 
        paddingTop:8, 
        paddingRight:13,
        top:40,
        width:80,
        marginLeft:-20,
        
      },

      openText:
      {color: '#2cb457' ,
      fontWeight: 'bold', 
      fontSize:22, 
      top:37,
      //width:80,
     
      marginLeft:-20,

    },
    NotConnText:{
      color: 'grey' ,
      fontWeight: 'bold', 
      fontSize:22, 
      top:37,
      marginLeft:-20,
    }
});
