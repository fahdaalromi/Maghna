
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
  Alert
} from 'react-native';
import {Input, Button} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import * as firebase from 'firebase';

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {

      email: '' ,
      password: '',
      errorMessage: null,
      visibilty: 'none',
      emailBorders:'#EAEAEA',
        
    }
}


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

  handleLogin = () => {

    const {email, password} = this.state
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userData) => {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.userId = user.uid

          if (!user.emailVerified){
            Alert.alert("يرجى تفعيل البريد الإلكتروني");
          }else{
            firebase.database().ref('mgnUsers/'+user.uid).on('value', snapshot => {
              Alert.alert("تم تسجيلك بنجاح");
              if (snapshot.exists()){
                this.props.navigation.navigate('HomeStack')}
          })
        }

  }});
})}



    
      async redirectRoute(route) {
        const { navigation }  = this.props;
        navigation.navigate(route);
      }
      
  render() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <LinearGradient colors={['#1784ab', '#9dd1d9']} style={{flex: 1}}>
                <View style={styles.view}>
                <View style={styles.form}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />

                    <TextInput style={styles.input} 
                    placeholder="اسم المستخدم" 
                    onChangeText={(text) => { this.setState({email: text}) }}
                    keyboardType="email-address"
                    autoCapitalize="none"/>

                    <TextInput style={styles.input} 
                    placeholder="كلمة المرور " 
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({password: text}) }}/>


                    <Button style={styles.button} onPress={this.handleLogin}  /*onPress={() => this.props.navigation.navigate('HomeStack', {name: 'Jane'})}*/>
                        <LinearGradient 
                            colors={['#1784ab', '#9dd1d9']} style={styles.gradient}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.buttonText} >تسجيل الدخول </Text>
                        </LinearGradient>
                    </Button>
                    <Text style={styles.note}>هل نسيت كلمة المرور؟</Text>
                </View>
                </View>
            </LinearGradient>
        </ScrollView>
      );
}
 }



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     shadowOpacity: 0.1
    },
    scrollView: {
      backgroundColor: '#2d8cb1',
      width: width,
      height: height,
    },
    view: {
      width: width,
      height: height,
      justifyContent: 'center',
    },
    form: {
      backgroundColor: 'white',
      alignSelf: 'center',
      borderRadius: 40,
      ...ifIphoneX({
        width: 0.9 * width,
        height: 0.65 * height,
      }, {
        width: 0.8 * width,
        height: 0.75 * height,
      }),
    },
    logo: {
      alignSelf: 'center',
      width: 0.6 * width,
      height: 0.3 * height,
      marginTop: 30,
      marginBottom: 40,
      
    },
    input: {
      alignSelf: 'center',
      overflow:'visible',
      //marginTop:20,
      shadowOpacity: 0.1,
      borderColor: '#7db4cb',
      textAlign: 'right',
      borderWidth: 1,
      height: 46,
      width: 250,
      ...ifIphoneX({
        margin: 0.01 * height,
        borderRadius: 20,
      }, {
        margin: 0.02 * height,
        borderRadius: 0.05 * height,
      }),
    },
    button: {
      margin: 0.025 * height,
      borderRadius: 0.05 * height,
      backgroundColor: 'white',
      borderWidth: 0,
      width: 250,
      height: 46,
      alignSelf: 'center',
    },
    gradient: {
      flex: 1,
      borderRadius: 23,
      height: 46,
      justifyContent: 'center',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 20,
      textAlign: 'center',
    },
    note: {
      marginBottom: 30,
      color: '#4398b9',
      marginRight: 38,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'right',
    },
  });

