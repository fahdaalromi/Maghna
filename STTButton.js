import React, { Component } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform,
  AsyncStorage,Alert
} from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import { Audio } from 'expo-av';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from './navigation/NavigationService';
import * as Helper from "./components/Helper";

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
    marginTop: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 5,
    width: '150%',
    alignItems: 'center',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
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
      curTime: 0,
      isOn:true
    }

  }


  storeData = async () => {
    try {
      await AsyncStorage.setItem('currentTime', '' + this.state.curTime);
    } catch (error) {
      // Error saving data
    }

  }

  storeStatus = async () => {
    try {
      await AsyncStorage.setItem('status', '' + this.state.isOn);
    } catch (error) {
      // Error saving data
    }

  }

  onTimer() {
    this.setState(prevState => {
      // change here ? it works! but the stopping
      return { curTime: prevState.curTime + 1 };
    }, function () {
      console.log(this.state.curTime);

    });
  }

  myInterval;
  async  wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }




  async componentDidMount() {
    while (true) {
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
      // console.log('There was an error deleting recorded file', error)
    }
  }
  // I need this 


  deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI())
      await FileSystem.deleteAsync(info.uri)
    } catch (error) {
      // console.log('There was an error deleting recorded file', error)
    }
  }

  getTranscription = async () => {
    console.log("this:",this);
    this.setState({ isFetching: true })
    try {
      const { uri } = await FileSystem.getInfoAsync(this.recording.getURI())

      const formData = new FormData()
      formData.append('file', {
        uri,
        type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
        name: Platform.OS === 'ios' ? `${Date.now()}.wav` : `${Date.now()}.m4a`,
      })

      const { data } = await axios.post('http://localhost:3004/speech', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      this.setState({ transcript: data.transcript })
    } catch (error) {
      // console.log('There was an error reading file', error)
      this.stopRecording()
      this.resetRecording()
    }

    const {
      transcript
    } = this.state
    this.setState({ isFetching: false })


    if (this.state.timer == 2592000) {
      clearInterval(myInterval);
      this.setState(() => {
        return {

          countDown: false,
        };
      });

    }


    if (transcript == "تشغيل النور") {
       // did this part linked because this is the trigger to the change of state 
       this.setState({isOn:true});
        Helper.setLightStatus(true);

      //here the start 
      rnTimer.setInterval("duration", () => {
        this.setState(prevState => {
          // change here ? it works! but the stopping
          return { curTime: prevState.curTime + 1 };
        }, function () {  
          console.log(this.state.curTime);

        });
      }, 1000);


      axios.put('http://192.168.100.14/api/1DQ8S2CiZCGaI5WT7A33pyrL19Y47F2PmGiXnv20/lights/3/state',
        { 'on': true })
        .then(res => res.json())
        .then(res => {
          RTCCertificate
          // console.log(res)
        })
        .catch(error => {
          console.log();
        })
    }

    if (transcript == "ايقاف النور") {

      Helper.setLightStatus(false);
    
      // Here the stopping 
      this.storeData();

      console.log('Hi');


      rnTimer.clearInterval("duration");




      axios.put('http://192.168.100.14/api/1DQ8S2CiZCGaI5WT7A33pyrL19Y47F2PmGiXnv20/lights/3/state',
        { 'on': false })
        .then(res => res.json())
        .then(res => {
          // console.log(res)
        })
        .catch(error => {
          // console.log(error);
        })
    }

    if (transcript == "التعليمات") {

      NavigationService.navigate('instructions')
    }

    if(    transcript == "الصفحه الشخصيه" ){
      NavigationService.navigate('profile')
    
        }

        if(    transcript == "الانماط" ){
          NavigationService.navigate('routine')
    
            }

            if(    transcript == "رجوع" ){
              NavigationService.navigate('Home')
                }
                if(    transcript == "التقارير" ){
                  NavigationService.navigate('report')
                    }
                //starting from here all the methods and variables related to homescreen
                    if(    transcript == "تفعيل الوضع الصباحي" ){
                    //_onPress2()
                        }
                        if(    transcript == "تفعيل الوضع المسائي" ){
                          //_onPress4()
                              }
                            
                            if(    transcript == "تفعيل وضع الخروج من المنزل" ){
                              //_onPress3()
                                  }
                                  if(    transcript == "تفعيل وضع العوده الى المنزل" ){
                                    //_onPress1()
                                        }

                                        if(    transcript == "إلغاء تفعيل الوضع الصباحي" ){
                                          //toggle1 = false
                                              }
                                              if(    transcript == "إلغاء تفعيل الوضع المسائي" ){
                                                //toggle4 = false
                                                    }
                                                  
                                                  if(    transcript == "إلغاء تفعيل وضع الخروج من المنزل" ){
                                                    //toggle3 = false
                                                        }
                                                        if(    transcript == " إلغاء تفعيل وضع العوده الى المنزل" ){
                                                          //toggle1=false 
                                                              }

                                                              // Starting from here related to routineScreen
                                                              //
                                                              //
                                                              if(transcript == "تحرير الوضع الصباحي"){
                                                              //this.release_button_action(0);

                                                              }
                                                              if(transcript == "الوقت"){
                                                              //this.setState({date_picker_display:true});

                                                              }
                                                              if (transcript == "إلغاء"){
                                                                //this.setState({date_picker_display: false}); 
                                                                //this.init_hourminute_array()
                                                              }
                                                              if( transcript == "تشغيل المكيف" ) {
                                                              //click_togglebutton(0)
                                                            }
                                                            if (transcript == "دقيقه") {
                                                              //select_minute(0)
                                                            }
                                                            if(transcript == "الساعه الواحده صباحاً "){
                                                             // this.select_hour(0)
                                                            }
                                                            if(transcript == "حفظ الوقت "){
                                                              // this.setState({date_picker_display: false})
                                                             }
                                                             if(transcript == "حفظ الوضع الصباحي "){
                                                              // this.save_button_action(0)
                                                             }

  }

  startRecording = async () => {
    // console.log(recording)
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
      // console.log(error)
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


  render() {
    const {
      isRecording, transcript, isFetching,
    } = this.state

    return (


      <View style={styles.container}>
        {/* <Text>{this.state.curTime}</Text> */}
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