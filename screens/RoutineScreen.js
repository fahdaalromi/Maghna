import React ,{ Component ,useState}  from 'react';
import { ScrollView,
 StyleSheet,
 Text,
 View,
 TextInput,
 Button,
 TouchableHighlight,
 TouchableOpacity,
 Image,
 Alert,
 ImageBackground,
 Platform,
} from 'react-native';
import { FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons} from "@expo/vector-icons";
import { Root, Popup } from 'popup-ui'


export default function RoutineScreen() {

  return (
   
      <View style={styles.container}>

   <ImageBackground source={require('../assets/images/halfBlue.png') } style={{ height:"100%", width: "100%" ,justifyContent: 'center',alignItems: 'center'}}>

   <Root>

  
   <View style={styles.smallContainer}>
   <View style={{flexDirection: 'row'}} > 
   <Feather name="sunrise" style={styles.icons} size={24} color="#CDCCCE" />
   <Text>
     روتين الصباح
   </Text>
   </View>

   <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} 
   onPress={() =>
              Popup.show({
                type: 'Success', 
                title: 'Upload complete',
                button: false,
                textBody: 'Congrats! Your upload successfully done', 
                buttontext: ' ',
                callback: () => Popup.hide()
              })
            } >
     <Text style={styles.signUpText}>  تحرير </Text>
   </TouchableHighlight>
   
      
 

   </View>
   

<View style={styles.smallContainer}>

  <View style={{flexDirection: 'row'}} >  
<MaterialCommunityIcons name="exit-run" size={24} color="#CDCCCE" />
<Text>
  روتين الخروج من المنزل
</Text>
</View>
</View>

<View style={styles.smallContainer}>
<View style={{flexDirection: 'row'}} > 
   <AntDesign name="home" size={24} color="#CDCCCE" />
  <Text>
    روتين العودة للمنزل
  </Text>
</View>
</View>

<View style={styles.smallContainer}>
<View style={{flexDirection: 'row'}} > 
<MaterialCommunityIcons name="weather-night" size={24} color="#CDCCCE" />
<Text>
روتين المساء
</Text>
</View>
</View>
</Root>
   </ImageBackground>

      </View>
      
  

  );
}

RoutineScreen.navigationOptions= {
  title: 'الأنماط الشخصية',
};

const styles = StyleSheet.create({
  container: {
    
    //flex: 1,
   justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFF',
  },

  backgroundIMG:{
   flex:1,
   width:'100%',
   height:'100%',
 
  },

  inputContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderWidth: 1,
      width:250,
      height:35,
      marginBottom:15,
      bottom: 20,
      borderColor: '#EAEAEA'
  },

  smallContainer:{
    margin:20,
   // marginTop:-100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:10,
      width:350,
      height:140,
     // flexDirection: 'row'
  },
 
  perInfo:{
    color: '#9F9F9F',
    fontSize: 20,
    bottom: 30,
    marginTop: 20,
    marginBottom:20,
  },

  inputs:{
      //flex:1,
      height:40,
      alignSelf:'flex-end',
      borderColor: '#EAEAEA',
      marginRight:20,
     //marginLeft:-50,
 
  },
 

 icons:{
 // size : 30

 },

 buttonContainer: {
  //height:40,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
 // marginBottom:10,
  marginTop:20,
  //width:70,
  
  borderRadius:20,
 },

  AnalysisButtonContainer:{
    height:45,
    width:70,
 borderWidth:1,
 marginRight:150,
 marginBottom:10,
 backgroundColor:'#3E82A7',
 //backgroundColor: this.sate.active?'#3E82A7':'red',
   //height:45,
   //flexDirection: 'row',
   //justifyContent: 'center',
   //alignItems: 'center',
   //marginBottom:10,
   //width:100,
   borderRadius:20,
  },

  AnalysisButton:{
    height:45,
    width:70,
   backgroundColor:'#BBCCCF',
   alignItems:'center',
   justifyContent:'center',
   borderRadius:20,
   //left:this.state.active ? 50 : 0 
   //marginRight:150,
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
   
    
  },

  LocationButtonContainer:{
   height:45,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom:10,
   width:'80%',
   borderRadius:45,
   borderColor:'#BBCCCF',
   borderWidth:1,
  },
 
  AddlocationButton: {
   backgroundColor: "#ffffff",
   margin:7,
 
 },
 
 addLocationText:{
   color: '#BBC3D4',
   fontSize:15,
 },
 
  signUpText: {
    color: '#BBCCCF',
    fontSize:15,
  },

  AnalysisText:{
   color: '#BBCCCF',
   marginLeft:150,
   marginBottom:-200,
   marginTop:10,
   
  },

  inline:{
   //flex:1,
   flexDirection:'row',
   justifyContent:'center',
   //marginRight:50,
   //marginLeft:50,
   
   
  },
});
