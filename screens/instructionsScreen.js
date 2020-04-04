import React, { Component } from 'react';
const { width, height } = Dimensions.get('window');
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Button, 
} from 'react-native';
import { Header, Left, Body, Right, Footer, FooterTab,Icon } from 'native-base';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import {LinearGradient} from 'expo-linear-gradient';
import { FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import { withNavigation } from 'react-navigation';
import { Ionicons} from '@expo/vector-icons';
import { render } from 'react-dom';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import { Audio } from 'expo-av';



export default class instructionsScreen extends Component {
    

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

      const { data } = await axios.post('http://localhost:3004/speech', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

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
    if(    transcript == "تشغيل النور" ){


  axios.put('http://192.168.100.14/api/1DQ8S2CiZCGaI5WT7A33pyrL19Y47F2PmGiXnv20/lights/3/state',
  {'on':true} )
.then(res => res.json())
.then(res => {
  console.log(res)
}) 
.catch(error => {console.log(error);
})
    }

    if(    transcript == "اطفاء النور" ){


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

            if(    transcript == "رجوع" ){
              this.props.navigation.navigate('Home');
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


static navigationOptions = ({navigation})=> ({

      headerTint:'#F7FAFF',
      headerTitle: 'التعليمات ',
      headerRight:()=>(
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{marginRight:15}}>
          <AntDesign name="right" size={24} color="#fff" />
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
        
     },
     headerTitleStyle: {
      color: '#fff'
    }
    })
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
        super(props)
        this.recording = null
        this.state = {
          isFetching: false,
          isRecording: false,
          transcript: '',
        }
        
    }


    render() {

        const {
            isRecording, transcript, isFetching,
          } = this.state

        
        
        return (
           
  <View style={styles.container}>
  
  <ImageBackground source={require('../assets/images/infobackground.png')} style={styles.bg_container}>

<ScrollView
  
  contentContainerStyle={styles.contentContainer}>

    <View style={styles.view}>
      <View style={styles.articleView}>
        <Text style={styles.articleTitle}>تحرير الأنماط</Text>
        <Text style={styles.articleDescription}>
          لتحرير الأنماط يجب عليك:
          قول "تحرير الأنماط الحياتية"
          ثم اختيار نوع النمط
          ومن ثم تحديد الاجهزه
      </Text>
        <Text style={styles.articleFoot}>
          اذا كان النمط صباحي / مسائي يجب عليك تحديد الوقت
          اذا كان خروج/عودة يجب عليك حفظ موقع المنزل
      </Text>
      </View>
      <View style={styles.articleView}>
        <Text style={styles.articleTitle}>عرض التقارير </Text>
        <Text style={styles.articleDescription}>
          لعرض الاجهزه المتصله يجب عليك:
          قول "التقرير"
          يمكنك ايضاً عرضها عن طريق النقر على خانه "التقارير"
      </Text>
      </View>
      <View style={styles.articleView}>
        <Text style={styles.articleTitle}>عرض الاجهزه المتصله </Text>
        <Text style={styles.articleDescription}>
          لعرض  الاجهزه المتصله يجب عليك:
          قول "الاجهزه المتصله"
          يمكنك ايضاً عرضها عن طريق النقر على خانه " الاجهزه المتصله "
      </Text>
      </View>
    </View>
 

</ScrollView>
</ImageBackground>

<View style={styles.container}>
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
                
</View>



        );
    }
    
}

// HomeScreen.navigationOptions = ({navigation})=> ({

//   headerTint:'#F7FAFF',
//   headerTitle: 'الصفحة الرئيسية',
//   headerRight:()=>(
//     <TouchableOpacity onPress={()=>{navigation.navigate('instructions')}} style={{marginRight:15}}>
//       <MaterialCommunityIcons name="settings-outline" size={24} color="#CDCCCE" />
//     </TouchableOpacity>

//   ),
//   headerLeft:()=>(
//     <TouchableOpacity onPress={()=>{navigation.navigate('')}} style={{marginLeft:15}}>
//       <SimpleLineIcons name="logout" size={24} color="#CDCCCE" />
//     </TouchableOpacity>
//   ),
    
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });

const styles = StyleSheet.create({
  container: {
    
    //flex: 1,
   justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFF',
  },
  contentContainer: {
  },

  header: {
    height: 50,
    ...ifIphoneX({
      marginTop: 50
    }, {
      marginTop: 24
    }),
    justifyContent: 'center',
  },
  headerItem: {
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 75,
  },
  bg_container: {
   height:"100%",
    justifyContent: 'center',
    alignItems: 'center'
  },

  view: {
    width: width,
    height: height,
  },
  articleView: {
    shadowOpacity: 0.07,
    width: 0.9 * width,
    height:0.2*height,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    opacity: 0.9,
    marginTop: 20,
    borderRadius: 30,
    padding: 16,
  },
  articleTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2287ac',
  },
  articleDescription: {
    marginTop:20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#8abbc6',
  },
  articleFoot: {
    fontSize: 14,
    textAlign: 'right',
    color: '#8abbc6',
  },
  icon: {
    width: 30,
    height: 30,
  },

  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 20,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    padding: 8,
    marginTop: 20,
  },
  text: {
    color: '#fff',
  }
  });
  

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
