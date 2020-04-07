import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState,useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View ,TouchableHighlight,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
//import Header from './components/Header';
import STTButton from './STTButton';
import global from './global';
import { AsyncStorage } from 'react-native';
import NavigationService from './navigation/NavigationService';

export default function App(props) {

  
const [displayMic, setDisplayMic] = useState(false);

useEffect (()=>{
 },[])

 useEffect (()=>{
  
  retrieveLoginStatus();
  console.log('displayMic is:'+displayMic)
 })



  async function retrieveLoginStatus() {
    if(displayMic){return;
    }
    
   
         try{
  let display= await AsyncStorage.getItem("loggedIn");
  
  if (display=='friday'){
    console.log('11- were inside retrieving from asyncStorage and display='+display)
    setDisplayMic(true)
  }

  
          
             } 
              catch(e) {
            console.log('error retrieving login status')
             }
            }


  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    const varible= <AppNavigator />;
    console.log(varible)
    return (
      <View style={styles.container}>
      {/* <Header/> */}
  
   {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

      
      <AppNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      >      
      </AppNavigator>
            <View style={{position:'absolute', display:'flex', zIndex:1000,bottom: 85, right:20}}>
            <View style={[styles.buttonContainer,]} >
    
        <STTButton/>
    
        </View>
        </View>

      </View>


     );
  }
}
//await return AsyncStorage.getItem("loggedIn")
async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:250,
    borderRadius:30,
    shadowOpacity: 0.17,
    backgroundColor: '#fff',
 
   },
});