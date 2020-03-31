import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Platform,
    StyleSheet, Text, View, Image, Button, backgroundColor, Alert, border, WIDTH, TouchableHighlight, 
    TouchableOpacity, ScrollView, ImageBackground,AsyncStorage,ActivityIndicator,
} from 'react-native';
import { FontAwesome,FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import { MonoText } from '../components/StyledText';
import {LinearGradient} from 'expo-linear-gradient';
import { StackActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import ProgressCircle from 'react-native-progress-circle'
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import { Audio } from 'expo-av';
import STTButton from '../STTButton'


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
  

export default class reportScreen extends Component {



    constructor(props) {
        super(props);
        this.state = {
            show_shape: false,
            profile_percent: 50,
            profile_color: '#56b058',

        }
    }
    
    
    async componentDidMount(){
 

        await this.sendSpeechNotification(); 
        await this.wait(1000);

        await this.getAudio();

        await this.calculateTotalConsuming();
        await this.colorChange(); 

    }

    async  wait(ms) { 
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
      }


    async getAudio () {  
 // Read report

        
 let fileURL = '';    
 const text =  '  عزيزي المُسْتَخْدِم إجْمَالِي إسْتِهْلاكِكْ هُوَ خمسُووووون بِالمِئَةِ مِن مُجْمَلِ فَاتُورَتِكَ المُدخَلهْ وَتَفْصِيْلْ الْإسْتِهْلاكْ هُوَ  الإنَارَه سَبْعُونَ بِالمِئَة التِّلْفَازْ صِفْرٌ بِالمِئَة ';

        axios.post(`http://45.32.251.50`,  {text} )
          .then(res => {
             console.log("----------------------xxxx--------------------------"+res.data);
            fileURL = res.data;
                console.log(fileURL);
                this.playAudio(fileURL);

          })
        }
        async playAudio(fileURL){
        

          await Audio.setAudioModeAsync({
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
           playsInSilentModeIOS: true,
           playsInSilentLockedModeIOS: true,
           shouldDuckAndroid: true,
           interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
           playThroughEarpieceAndroid: false,
           staysActiveInBackground: true,
         });
   
   
   
   
      
         // OR
         const playbackObject = await Audio.Sound.createAsync(
           { uri: fileURL },
           { shouldPlay: true }
         );

          
    
    //http://localhost/fiels/output-0.6839748394381258.mp3
      }

    async sendSpeechNotification(){
 
        // Send audio request 
        if(this.state.profile_percent >= 50){  
  
            let fileURL = '';    
            const text =  'ِعزيزي المُسْتَخْدِم لَقَدْ إستَهْلَكْتْ خَمسُوووون بِالمِئَةِ مِن مُجْمَلِ فَاتُورَتِكَ المُدخَل';

            axios.post(`http://45.32.251.50`,  {text} )
              .then(res => {
                 console.log("----------------------xxxx--------------------------"+res.data);   
                fileURL = res.data;
       
                    this.playAudio(fileURL); 
    
              })
         }

         if(this.state.profile_percent >= 79){  
  
            let fileURL = '';    
            const text =  'ِعزيزي المُسْتَخْدِم لَقَدْ إستَهْلَكْتْ ثَمَانُووون بِالمِئَةِ مِن مُجْمَلِ فَاتُورَتِكَ المُدخَل';
            axios.post(`http://45.32.251.50`,  {text} )
              .then(res => {
                 console.log("----------------------xxxx--------------------------"+res.data);   
                fileURL = res.data;
       
                    this.playAudio(fileURL); 
    
              })
         }k


         if(this.state.profile_percent >= 100){  
  
            let fileURL = '';    
            const text =  'ِعزيزي المُسْتَخْدِم لَقَدْ إستَهْلَكْتْ 100 بِالمِئَةِ مِن مُجْمَلِ فَاتُورَتِكَ المُدخَل';
          
            axios.post(`http://45.32.251.50`,  {text} )
              .then(res => {
                 console.log("----------------------xxxx--------------------------"+res.data);   
                fileURL = res.data;
       
                    this.playAudio(fileURL); 
    
              })
         }
    }

    calculateTotalConsuming(){
  

        let workingHours = this.props.state.curTime;
        let totalConsuming;
        let watts=40;
         // in this screen I want to use the timer data which is the duration 

        let kwh= watts*workingHours/1000;
     


        if(kwh > 6000){ 
            totalConsuming=kwh*0.3*100;
         }
         if(kwh <= 6000){ 
            totalConsuming=kwh*0.18*100; 
         }

         this.setState.profile_percent = totalConsuming;
    }

  
    colorChange(){

        if(this.state.profile_percent < 50){ 
           this.setState({profile_color : '#56b058'});
        }
        if(this.state.profile_percent  >=50 && this.state.profile_percent  <80 ){ 
            this.setState({profile_color : '#fffb00'});
        }
        if(this.state.profile_percent  >=80 && this.state.profile_percent  <100 ){ 
            this.setState({profile_color : '#f58f00'});
        }
       
        if(this.state.profile_percent  >= 100 ){ 
            this.setState({profile_color : '#ff3126'});
        }
       
      return  this.setState.profile_color
    }
    open_profile() {

        
        const navigateAction = NavigationActions.navigate({
            routeName: 'profile',
            action: NavigationActions.navigate({ routeName: 'profile' }), 
        });
    
        this.props.navigation.dispatch(navigateAction);
    }
    
    render() {
    
        const {
            profile_percent,
            profile_color
          } = this.state    

        return (
            <View style={styles.container}>
                <ImageBackground source={require('./otherhalf.png')} style={{ width:'100%' , height:'150%', flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ScrollView style = {{width: '100%', padding: 20}}>
                        <View style = {{width: '100%', alignItems: 'flex-end'}}>
                            <Text style={styles.routineTitle}> إجمالي الإستهلاك </Text>
                        </View>
                        {

                        !this.state.show_shape &&
                        <View style = {{width: '100%', borderRadius: 10, alignItems: 'center', padding: 15, backgroundColor: '#ffffff', marginTop: 10, marginBottom: 10,shadowOpacity: 0.1, opacity: 0.9,}}>
                            <Text style = {styles.contentText}> إذا كنت تريد تفعيل هذة الخاصية يرجى ملء خانة "الحد الإئتماني للفاتورة" </Text>
                            <TouchableOpacity style = {styles.button_style} onPress = {() => this.open_profile(),
                                                                                    () => this.setState({show_shape: true})}>
                                <Text style = {styles.button_text}> أنقر هنا</Text>
                            </TouchableOpacity>
                        </View>
                        }
                        {
                            this.state.show_shape &&
                            <View style = {{width: '100%', borderRadius: 10, alignItems: 'center', padding: 15, backgroundColor: '#ffffff', marginTop: 10, marginBottom: 10,opacity: 0.9,}}>
                             <ProgressCircle
                              
                                percent={this.state.profile_percent}
                                 radius={60}
                                 borderWidth={14}
                                color={this.state.profile_color}
                                shadowColor="#ffffff"
                               bgColor="#fff"
                                                    >
                                 <Text style={{ fontSize: 16 , color: "#757575" }}>{this.state.profile_percent}{"%"}</Text>
                                </ProgressCircle>
                                 </View>
                        }
                        <View style = {{width: '100%', alignItems: 'flex-end'}}>
                            <Text style={styles.routineTitle}> تفصيل الإستهلاك </Text>
                        </View>
                        <View style = {{width: '100%', borderRadius: 10, alignItems: 'center', padding: 15, paddingBottom: 0, backgroundColor: '#ffffff', marginTop: 10, marginBottom: 10,shadowOpacity: 0.1,opacity: 0.9,}}>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#8abbc6', '#ffffff']} start = {[0, 0]} end = {[0.7, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ٧٠٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> الإنارة </Text>
                                </View>
                            </View>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#8abbc6', '#ffffff']} start = {[0, 0]} end = {[0, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ٠٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> التلفاز </Text>
                                </View>
                            </View>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#8abbc6', '#ffffff']} start = {[0, 0]} end = {[0, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ٠٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> البوابة </Text>
                                </View>
                            </View>

                            {/* <STTButton/> */}

                        </View>
                        <View style = {{height: 30}}/>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
    
}




reportScreen.navigationOptions = ({navigation})=> ({

  headerTitle:  'التقارير',
  
 /* headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#fff" />
    </TouchableOpacity>
  ),*/

  headerLeft:navigation.state.params && navigation.state.params.headerLeft,

  headerStyle: {
    backgroundColor: '#8BC4D0',
    color:'white'
    
 },
 headerTitleStyle: {
  color: '#fff'
}
});


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7FAFF'
    },
    routineTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2287ac',
        marginTop:20,
        marginBottom:10,
    },
    contentText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#8abbc6',
    },
    button_style: {
        width: 200,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2287ac',
        marginTop: 20
    },
    button_text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
    component_view: {
       width: '100%',
       marginBottom: 7,
       marginTop: 10,
       flexDirection: 'row',
       justifyContent: 'space-around',
       alignItems: 'center'
    },
    component_bar_view: {
        marginTop: 6,
        flex: 1, 
        marginRight: 10,
        justifyContent: 'center'
    },
    component_text_view: {
        width: 100, 
        justifyContent: 'flex-end'
    },
    component_bar: {
        width: '100%',
        height: 10,
        borderWidth: 0.5,
        borderColor: '#BBCCCF'
    },
    bar_text: {
        fontSize: 14,
        textAlign: 'center',
        color: '#8abbc6',
    }
});
