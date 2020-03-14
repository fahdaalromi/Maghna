import React ,{ Component } from 'react';
import { ScrollView,
 StyleSheet,
 Text,
 View,
 TextInput,
 Button,
 TouchableHighlight,
 Image,
 Alert,
 ImageBackground,
 TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import WelcomeScreen from './WelcomeScreen';
import locationPage from './locationPage';

export default function SignUP() {

  return (

<View>

<View style={styles.container}>

<View style={{backgroundColor :"#3E82A7", height:"19%",width:"100%", justifyContent: 'center',
   alignItems: 'center'}}>

   <Text style={styles.header}> التسجيل </Text>

   </View>

<ImageBackground source={require('../assets/images/halfBlue.png') } style={{ height:"100%",justifyContent: 'center',alignItems: 'center'}}>

<Text style={styles.perInfo}>──── المعلومات الشخصية ────</Text>

<View style={styles.smallContainer}>


<View style={styles.firstContainer}>
<View style={styles.inputContainer} style={styles.inputContainer} >

<TextInput style={styles.inputs}
placeholder="أسم المستخدم"
keyboardType="acci-capable"
underlineColorAndroid='transparent'
/>
</View>
</View>
<View style={styles.inputContainer}>

<TextInput style={styles.inputs}
placeholder="البريد الإلكتروني"
keyboardType="email-address"
underlineColorAndroid='transparent'
/>
</View>


<View style={styles.inputContainer}>

<TextInput style={styles.inputs}
  placeholder="كلمة المرور"
  secureTextEntry={true}
  underlineColorAndroid='transparent'
  />
</View>
<View style={styles.inputContainer}>

<TextInput style={styles.inputs}
placeholder="تأكيد كلمة المرور"
secureTextEntry={true}
underlineColorAndroid='transparent'
/>
</View>
<TouchableHighlight style={[styles.LocationButtonContainer, styles.AddlocationButton]} onPress={()=>{this.props.navigation.navigate('locationPage')}} >
        <Text style={styles.addLocationText}> إضافة موقع</Text>
        </TouchableHighlight>


       <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} >
     <Text style={styles.signUpText}>  تسجيل جديد </Text>
   </TouchableHighlight>

  </View>
</ImageBackground>
  </View>

  </View>

);
}

SignUP.navigationOptions = ({navigation})=> ({

  headerTint:'#F7FAFF',
  headerTitle: 'الملف الشخصي',
  headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('WelcomeScreen')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#CDCCCE" />
    </TouchableOpacity>

  ),

  headerStyle: {
    backgroundColor: '#4b9cb5',
    color:'white'
    
 },
 headerTitleStyle: {
  color: '#fff'
}
    
});


const styles = StyleSheet.create({

 
  header:{
    marginTop:130,
    color: 'white',
    fontSize:25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },

  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },

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
    borderColor: '#3E82A7'
  },

  smallContainer:{
    margin:70,
   marginTop:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:30,
      width:300,
      height:430
      
  },
 
  perInfo:{
    color: '#9F9F9F',
    fontSize: 20,
    bottom: 30,
    marginTop: -300,
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
  firstContainer:{
  marginTop:40,
  },

  buttonContainer: {
   height:45,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom:10,
   width:250,
   borderRadius:30,
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
   backgroundColor: "#3E82A7",
    
  },

  LocationButtonContainer:{
  
    height:45,
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    width:'85%',
    borderRadius:45,
    borderColor:'#6FA0AF',
    borderWidth:1,
   },
  
   AddlocationButton: {
    backgroundColor: "#ffffff",
    marginTop:-20,
    marginBottom:20,
  
  },
 
  addLocationText:{
    color: '#6FA0AF',
    fontSize:15,
  },
 
  signUpText: {
    color: 'white',
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

const navigationConnected =withNavigation(SignUP)
export {navigationConnected as SignUP}
