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
import {LinearGradient} from 'expo-linear-gradient';
import * as firebase from 'firebase';

export default class SignUP extends Component{

  state = {
  username:"test",
  email: "",
  password: "",
  confPassword: "",
  errorMsg:null,
};

UNSAFE_componentWillMount(){

  const firebaseConfig = {

    apiKey: "AIzaSyAAM7t0ls6TRpHDDmHZ4-JWaCLaGWZOokI",
    authDomain: "maghnaapplication.firebaseapp.com",
    databaseURL: "https://maghnaapplication.firebaseio.com",
    projectId: "maghnaapplication",
    storageBucket: "maghnaapplication.appspot.com",
    messagingSenderId: "244460583192",
    appId: "1:244460583192:web:f650fa57532a682962c66d",
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

}

handelSignUp =() =>{
    try{
  firebase
  .auth()
  .createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then((data) => {

    firebase
    .auth()
    .onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid
        user.sendEmailVerification();
        firebase.database().ref('mgnUsers/'+this.userId).set(
          {
            name: this.state.username,
          })

         this.props.navigation.navigate('SignIn')
      }
    }
    );
    Alert.alert("تم التسجيل بنجاح، تفقد بريدك الإلكترني")

    })
  
  .catch(error => console.log(error.message))

    }catch(e){console.log(e.message)}

};



  render(){  
  return (

<View>

<View style={styles.container}>

<View style={{backgroundColor :"#3E82A7", height:"19%",width:"100%", justifyContent: 'center',
   alignItems: 'center'}}>

   <Text style={styles.header}> التسجيل </Text>

   </View>

<ImageBackground source={require('../assets/images/halfBlue.png') } style={{ height:"100%",justifyContent: 'center',alignItems: 'center'}}>

<Text style={styles.perInfo}>──  المعلومات الشخصية  ──</Text>

<View style={styles.smallContainer}>


<View style={styles.firstContainer}>
<View style={styles.inputContainer} style={styles.inputContainer} >

<TextInput style={styles.inputs}
placeholder="أسم المستخدم"
keyboardType="acci-capable"
underlineColorAndroid='transparent'
onChangeText={(text) => { this.setState({username: text}) }}
/>
</View>
</View>
<View style={styles.inputContainer}>

<TextInput style={styles.inputs}
placeholder="البريد الإلكتروني"
keyboardType="email-address"
underlineColorAndroid='transparent'
onChangeText={(text) => { this.setState({email: text}) }}
/>
</View>


<View style={styles.inputContainer}>

<TextInput style={styles.inputs}
  placeholder="كلمة المرور"
  secureTextEntry={true}
  underlineColorAndroid='transparent'
  onChangeText={(text) => { this.setState({password: text}) }}
  />
</View>

<View style={styles.inputContainer}>
<TextInput style={styles.inputs}
placeholder="تأكيد كلمة المرور"
secureTextEntry={true}
underlineColorAndroid='transparent'
onChangeText={(text) => { this.setState({confPassword: text}) }}
/>
</View>


<TouchableHighlight style={[styles.LocationButtonContainer, styles.AddlocationButton]} onPress={()=>{this.props.navigation.navigate('locationPage')}} >
        <Text style={styles.addLocationText}> إضافة موقع</Text>
        </TouchableHighlight>


       <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.handelSignUp} >
       <LinearGradient 
                            colors={['#1784ab', '#9dd1d9']} style={styles.gradient}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                        >
     <Text style={styles.signUpText}>  تسجيل جديد </Text>
     </LinearGradient>
   </TouchableHighlight>


  </View>
</ImageBackground>
  </View>

  </View>

);
}
}
SignUP.navigationOptions = ({navigation})=> ({

  headerTint:'#F7FAFF',
  headerTitle: 'التسجيل ',
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
}  
);

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
    marginBottom:19,
    bottom: 20,
    borderColor: '#3E82A7',
    shadowOpacity: 0.1,

  },

  smallContainer:{
    margin:70,
   marginTop:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:30,
      width:300,
      height:430,
      shadowOpacity: 0.1

      
  },
 
  perInfo:{
    color: '#9F9F9F',
    fontSize: 20,
    bottom: 30,
    marginTop: -300,
    marginBottom:20,
  },

  inputs:{
    overflow:'visible',
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
   shadowOpacity: 0.17

  },
  gradient: {
   // flex: 1,
   // borderRadius: 32,
   // height: 46,
    //justifyContent: 'center',
    marginTop:20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:255,
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
   //backgroundColor: "#3E82A7",
    
  },

  LocationButtonContainer:{
  
    height:45,
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop:10,
   // marginBottom:20,
    width:'85%',
    borderRadius:45,
    borderColor:'#6FA0AF',
    borderWidth:1,
    shadowOpacity: 0.14,
    height:35,

   },
  
   AddlocationButton: {
    backgroundColor: "#ffffff",
    marginTop:-10,
    marginBottom:15,
  
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

