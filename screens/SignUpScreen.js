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
import * as firebase from 'firebase';

export default class SignUP extends Component {

  register = () => {
    if (this.state.fullName == '' || this.state.email == ''||this.state.password == ''||this.state.confirmPassword=='') {
      this.setState({formErrorMsg: 'عفوًا، جميع الحقول مطلوبة'})
      this.setState({errorMsgVisibilty: 'flex'})
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({formErrorMsg: 'عفوًا، أدخل كلمة مرور أكثر من ٦ خانات'})
      this.setState({errorMsgVisibilty: 'flex'})
      return;
    }


if (this.state.passError != 'none')  {
    return;
}

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then( (data) => {
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
              this.userId = user.uid;
              user.sendEmailVerification();

              firebase.database().ref(this.userId).set(
                {
                  name: this.state.fullName,
                })

                this.props.navigation.navigate('login')
            }
          });
            Alert.alert("تم التسجيل بنجاح، تفقد بريدك الإلكترني")
    })
    .catch((error) => {
      console.log(error.message)
      this.setState({ errorMessage: error.message })
      //or password is less than 6 characters, the below msg shows for both. which doesnt make sense
      this.setState({formErrorMsg: 'البريد الإلكتروني مسجل مسبقًا، قم بتسجيل الدخول'})
      this.setState({errorMsgVisibilty: 'flex'})
    })

}//end register

  validateEmail = (email) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(this.state.email)== false)
    {
    this.setState({emailBorder:'red'})
      }
    else {
      this.setState({emailBorder:'#91b804'})
    }
  }

  identicalPass = (password) => {
    if (this.state.password != this.state.confirmPassword){
      this.setState({passError: 'flex'})
    }
    else {
      this.setState({passError: 'none'})
    }

    }//end identical check


  state = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword:'',
    phoneNo:'',
  }

  UNSAFE_componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyBUBKLW6Wrk48NQ_TcgUerucTZFphw6l-c",
      authDomain: "maghna-62c55.firebaseapp.com",
      databaseURL: "https://maghna-62c55.firebaseio.com",
      projectId: "maghna-62c55",
      storageBucket: "maghna-62c55.appspot.com",
      messagingSenderId: "21464439338",
      appId: "1:21464439338:web:8c6bb486fb3673e5d14153",
      measurementId: "G-R3BQPCTCTM"
    });
  }

render(){
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
underlineColorAndroid='transparent'

onChangeText={(fullName) => {
  this.setState({fullName})
  this.setState({nameBorder: '#EAEAEA'})
} }
/>
</View>
</View>
<View style={styles.inputContainer}>

<TextInput style={styles.inputs}
placeholder="البريد الإلكتروني"
keyboardType="email-address"
underlineColorAndroid='transparent'
onChangeText={(email) => {
  this.setState({email})
  this.setState({emailBorder: '#EAEAEA'})
}
}
onEndEditing={(email) => this.validateEmail(email)}
value={this.state.email}
/>
</View>


<View style={styles.inputContainer}>

<TextInput style={styles.inputs}
  placeholder="كلمة المرور"
  secureTextEntry={true}
  underlineColorAndroid='transparent'

  onChangeText={(password) => {
    this.setState({password})
    this.setState({passwordBorder: '#EAEAEA'})
  } }
  value={this.state.password}
  />
</View>
<View style={styles.inputContainer}>

<TextInput style={styles.inputs}
placeholder="تأكيد كلمة المرور"
secureTextEntry={true}
underlineColorAndroid='transparent'
onChangeText={(confirmPassword) => {
  this.setState({confirmPassword})
  this.setState({conPasswordBorder: '#EAEAEA'})
  this.setState({passError: 'none'})
} }
  onEndEditing={(confirmPassword) =>{this.identicalPass(confirmPassword)} }
value={this.state.confirmPassword}
/>
</View>

<View>

<Text style={[styles.warning,styles.fontStyle, {display: this.state.passError}]}> كلمة المرور غير متطابقة </Text>
</View>


<TouchableHighlight style={[styles.LocationButtonContainer, styles.AddlocationButton]} onPress={()=>{this.props.navigation.navigate('locationPage')}} >
        <Text style={styles.addLocationText}> إضافة موقع</Text>
        </TouchableHighlight>


       <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} >
     <Text style={styles.signUpText}  onPress={this.register}>  تسجيل جديد </Text>
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
