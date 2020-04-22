import React, { Component } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform,TouchableHighlight
} from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import { Audio } from 'expo-av';
import './global';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from './navigation/NavigationService';


// Here I use this time, I open the package 
const rnTimer = require('react-native-timer');

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
}


const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#1e88e5',
      //paddingVertical: 10,
      width: 100,
      //alignItems: 'center',
      borderRadius: 5,
      //padding: 8,
      marginTop: 5,
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
    text: {
      color: '#fff',
    }
  }) 


export default class SpeechToTextButton extends Component {
    constructor(props) {
      super(props)
      this.recording = null

      this.state = {
        isFetching: false,
        isRecording: false,
        transcript: '',
        //This is the dueation 
        //this variable here in stt button I use to store the duration in seconds in
        curTime : 0
      }

    }

    onTimer() {
      this.setState(prevState => {
        // change here ? it works! but the stopping
        return {curTime : prevState.curTime + 1};
      }, function (){
 console.log(this.state.curTime);
   
      });

    }


  async  wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }


  
  
  async componentDidMount(){

      while(true){
      await this.startRecording()
      await this.wait(3000);
       await this.stopRecording();
       await this.getTranscription();
       await this.resetRecording();
    }    
  }
  deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI())
      await FileSystem.deleteAsync(info.uri)
    } catch (error) {
      console.log('There was an error deleting recorded file', error)
    }
  }
// I need this 


  deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI())
      await FileSystem.deleteAsync(info.uri)
    } catch (error) {
      console.log('There was an error deleting recorded file', error)
    }
  }

  getTranscription = async () => { 
    this.setState({ isFetching: true })
    try {
      const { uri } = await FileSystem.getInfoAsync(this.recording.getURI())

      const formData = new FormData()
      formData.append('file', {
        uri,
        type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
        name: Platform.OS === 'ios' ? `${Date.now()}.wav` :`${Date.now()}.m4a`,
      })

<<<<<<< Updated upstream
      const { data } = await axios.post('http://localhost:3004/speech', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
=======
      //here the start
      rnTimer.setInterval(
        "duration",
        () => {
          this.setState(
            (prevState) => {
              // change here ? it works! but the stopping
              return { curTime: prevState.curTime + 1 };
            },
            function () {
             // console.log(this.state.curTime);
            }
          );
        },
        1000
      );

      firebase
      .database()
      .ref("mgnUsers/" + firebase.auth().currentUser.uid)
      .once("value", (snap) => {
        if (snap.val().isActive === true) {
          this.analysis("001");
        }
      });

    this.analysis("001");
      axios
        .put(
          "http://192.168.1.23/api/4nLoCmufbQULukYCCycoJGWggxzAHVdaRQlwG-zx/lights/2/state",
          { on: true }
        )
        .then((res) => res.json())
        .then((res) => {
          RTCCertificate;
          // console.log(res)
        })
        .catch((error) => {
          console.log();
        });
    }

    if (transcript == "ايقاف النور") {
      Helper.setLightStatus(false);

      // Here the stopping
      this.storeData();

      console.log("Hi");

      rnTimer.clearInterval("duration");
      firebase
        .database()
        .ref("mgnUsers/" + firebase.auth().currentUser.uid)
        .once("value", (snap) => {
          if (snap.val().isActive === true) {
            this.analysis("002");
          }
        });
      axios
        .put(
          "http://192.168.1.23/api/4nLoCmufbQULukYCCycoJGWggxzAHVdaRQlwG-zx/lights/2/state",
          { on: false }
        )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res)
        })
        .catch((error) => {
          // console.log(error);
        });
    }
    if (transcript == "قراءت التعليمات") {
      this.setState({TTSInstruction:true});
      this.TTSInstruction();
      NavigationService.navigate("instructions");
    }

    if (transcript == "التعليمات") {
      this.setState({TTSInstruction:false});
      this.TTSInstruction();
      NavigationService.navigate("instructions");
    }

    if (transcript == "قراءت التقارير") {
      this.setState({TTSReport:true});
      this.TTSReport();
      NavigationService.navigate("report");
    }

>>>>>>> Stashed changes

      this.setState({ transcript: data.transcript })
    } catch (error) {
      console.log('There was an error reading file', error)
      this.stopRecording()
      this.resetRecording()
    }

    const {
       transcript
      } = this.state
    this.setState({ isFetching: false })


   if(this.state.timer == 2592000){
    clearInterval(myInterval);
    this.setState(() => {
      return {
        
        countDown : false,
      };
    });

    }


    if(    transcript == "تشغيل النور" ){
      //here the start 
      var myInterval;
   this.onTimer = this.onTimer.bind(this);
    myInterval=setInterval(this.onTimer, 1000);



axios.put('http://192.168.100.14/api/1DQ8S2CiZCGaI5WT7A33pyrL19Y47F2PmGiXnv20/lights/3/state',
  {'on':true} )
.then(res => res.json())
.then(res => {RTCCertificate
  console.log(res)
}) 
.catch(error => {console.log(error);
})
    }

    if(    transcript == "اطفاء النور" ){
// Here the stopping 

console.log('Hi');
    
		this.setState(prevState => {
		  return {
			countDown : false,
		  };
		});
      clearInterval(myInterval);
  
  
  
    
      axios.put('http://192.168.100.14/api/1DQ8S2CiZCGaI5WT7A33pyrL19Y47F2PmGiXnv20/lights/3/state',
      {'on':false} )
    .then(res => res.json())
    .then(res => {
      console.log(res)
    }) 
    .catch(error => {console.log(error);
    })
        }

        if(    transcript == "التعليمات" ){
          this.props.navigation.navigate('instructions');
            }


  }

  startRecording = async () => {
      console.log(recording)
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    if (status !== 'granted') return

    this.setState({ isRecording: true })
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    })
    const recording = new Audio.Recording()

    try {
      await recording.prepareToRecordAsync(recordingOptions)
      await recording.startAsync()
    } catch (error) {
      console.log(error)
      this.stopRecording()
    }

    this.recording = recording
  }

  stopRecording = async () => {
    this.setState({ isRecording: false })
    try {
      await this.recording.stopAndUnloadAsync()
    } catch (error) {
      // noop
    }
  }

  resetRecording = () => {
    this.deleteRecordingFile();
    this.recording = null
  };

  
  render(){
    const {
        isRecording, transcript, isFetching,
      } = this.state

      return(


        <View style={styles.container}>

          <TouchableHighlight style={[styles.buttonContainer,]} onPress={()=>{NavigationService.navigate('profile')}} >

       <Text style={styles.signUpText}>  إرسال  </Text>
    
     </TouchableHighlight>

        <TouchableOpacity
          style={styles.button}
          onPressIn={this.startRecording}
          onPressOut={this.handleOnPressOut}
        >

            
          {isFetching && <ActivityIndicator color="#ffffff" />}
          {!isFetching && 
            <Text style={styles.text}>
              {isRecording ? 'انا اسمعك فضلاً تحدث...' : 'فهمت!'}
            </Text>
          }
        </TouchableOpacity>
        <Text>
          {`${transcript}`}
        </Text>
      </View>
      );

  }

}
