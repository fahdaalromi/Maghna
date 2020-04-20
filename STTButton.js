import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  AsyncStorage,
  Image
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { Audio } from "expo-av";
import NavigationService from "./navigation/NavigationService";
import * as Helper from "./components/Helper";
import * as firebase from "firebase";
import {Button} from "react-native-elements";
import { connect } from 'react-redux';
import moment from "moment";
// Here I use this time, I open the package



const rnTimer = require("react-native-timer");


import { Alert } from 'react-native';
import firebaseInitial from './constants/FireBase.js';

const recordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection : 'row'
  },
  Indicator: {
    alignSelf: 'center',
    width: 110,
    height: 110,
    marginTop: 110,
  },
  Indicator1: {
    alignSelf: 'center',
    width: 110,
    height: 110,
    marginTop: 110,
  },

  text: {
    color: "#fff",
  },
});

class SpeechToTextButton extends Component {
  constructor(props) {
    super(props);
    this.recording = null;
    routineArr=[];

    this.state = {
      isFetching: false,
      isRecording: false,
      transcript: "",
      //This is the dueation
      //this variable here in STTButton I use to store the duration in seconds in
      curTime: 0,
      isOn: true,
      
      info:"",

    };

  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem("currentTime", "" + this.state.curTime);
    } catch (error) {
      // Error saving data
    }
  };

  storeStatus = async () => {
    try {
      await AsyncStorage.setItem("status", "" + this.state.isOn);
    } catch (error) {
      // Error saving data
    }
  };

  onTimer() {
    this.setState(
      (prevState) => {
        // change here ? it works! but the stopping
        return { curTime: prevState.curTime + 1 };
      },
      function () {
        console.log(this.state.curTime);
      }
    );
  }

  myInterval;
  async wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async componentDidMount() {
    const firebaseConfig = {

      apiKey: "AIzaSyCsKoPxvbEp7rAol5m-v3nvgF9t8gUDdNc",
      authDomain: "maghnatest.firebaseapp.com",
      databaseURL: "https://maghnatest.firebaseio.com",
      projectId: "maghnatest",
      storageBucket: "maghnatest.appspot.com",
      messagingSenderId: "769071221745",
      appId: "1:769071221745:web:1f0708d203330948655250" ,
    };
    while (true) {
      await this.startRecording();
      await this.wait(3000);
      await this.stopRecording();
      await this.gettranscription();
      await this.resetRecording();
    }
  }
 

  analysis = async (actionid) => {
    //check if it is't the first command
    console.log("before definition of flage");
    let flag = false;
    console.log("hiii");
    await firebase
      .database()
      .ref("userActions/")
      .once("value", async (snap) => {
        console.log("iafter definition ");
        await snap.forEach((child) => {
          if (
            child.val().userID === firebase.auth().currentUser.uid &&
            child.val().ActionID == actionid &&
            child.val().day === moment().format("dddd")
          )
            if (
              child.val().time === new Date().getHours() ||
              (new Date().getHours() === (child.val().time + 1) % 24 &&
                new Date().getMinutes <= 10) ||
              (new Date().getHours() === (child.val().time - 1 + 24) % 24 &&
                new Date().getMinutes() >= 49)
            ) {
              let plus = parseInt(child.val().Repetition) + 1;
              console.log("before first use");
              flag = true;
              console.log("before first use 2");
              firebase
                .database()
                .ref("userActions/" + child.key)
                .update({
                  Repetition: plus,
                })
                .then(() => {
                  console.log("inserted the update");
                })
                .catch((error) => {
                  console.log(error);
                });
            }
        });
      })
      .finally(() => {
        if (flag === false) this.insertUserAction();
      });
  };

  insertUserAction = async () => {
    console.log("inside inserUserAction");
    let userActionKey = firebase.database().ref().child("userActions").push()
      .key;
    firebase
      .database()
      .ref("userActions/" + userActionKey)
      .set({
        userID: firebase.auth().currentUser.uid,
        ActionID: "001",
        time: new Date().getHours(),
        day: moment().format("dddd"),
        Repetition: "1",
        inRoutine: "0",
        insertedDate:
          new Date().getFullYear() +
          "/" +
          new Date().getMonth() +
          "/" +
          new Date().getDate(),
      })
      .then(() => {
        console.log("inserted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  insertRoutine = async () => {
    console.log("inside inserRoutine");
    let routineKey = await firebase.database().ref().child("routine").push()
      .key;
    await firebase
      .database()
      .ref("userActions/")
      .once("value", async (snap) => {
        snap.forEach((child) => {
          let date1 = new Date(
            new Date().getFullYear() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getDate()
          );
          console.log("print date1" + date1);
          let date2 = new Date(child.val().insertedDate);
          let timeDiff = date1.getTime() - date2.getTime();
          console.log("data1 get time " + date1.getTime());
          console.log("data2 get time " + date2.getTime());
          console.log("print timeDiff" + timeDiff);
          let dayDiff = timeDiff / (1000 * 3600 * 24);
          console.log("before if 19");
          console.log("dayDiff" + dayDiff);
          if (child.val().Repetition === 18)
            if (dayDiff <= 30)
              if (child.val().inRoutine === "0") {
                firebase
                  .database()
                  .ref("userActions/" + child.key)
                  .update({
                    inRoutine: "1",
                  });
                console.log("inside if 18 ");
                firebase
                  .database()
                  .ref("routine/" + routineKey)
                  .set({
                    name: "analysis",
                    actionID: child.val().ActionID,
                    userID: child.val().userID,
                    day: child.val().day,
                    time: child.val().time,
                    timeinserted: child.val().insertedDate,
                  });
              }
        });
      });
  };

  checkData = async () => {
    console.log("inside checkData  ");

    firebase
      .database()
      .ref("routine/")
      .once("value", (snap) => {
        snap.forEach((child) => {
          let date1 = new Date(
            new Date().getFullYear() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getDate()
          );
          let date2 = new Date(child.val().timeinserted);
          let timeDiff = date1.getTime() - date2.getTime();
          let dayDiff;
          console.log("check date data1" + date1);
          console.log("check date data2" + date2);
          console.log("check date timeDiff" + timeDiff);
          dayDiff = timeDiff / (1000 * 3600 * 24);
          if (dayDiff > 90) {
            firebase
              .database()
              .ref("routine/" + child.key)
              .remove();
          }
        });
      });
  };
  // I need this

  deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      await FileSystem.deleteAsync(info.uri);
    } catch (error) {
      // console.log('There was an error deleting recorded file', error)
    }
  };

  gettranscription = async () => {

    this.setState({ isFetching: true });
    try {
      const { uri } = await FileSystem.getInfoAsync(this.recording.getURI());

      const formData = new FormData();
      formData.append("file", {
        uri,
        type: Platform.OS === "ios" ? "audio/x-wav" : "audio/m4a",
        name: Platform.OS === "ios" ? `${Date.now()}.wav` : `${Date.now()}.m4a`,
      });

      const { data } = await axios.post(
        "http://35.184.93.99:3004/speech",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      this.setState({ transcript: data.transcript });
    } catch (error) {
      // console.log('There was an error reading file', error)
      this.stopRecording();
      this.resetRecording();
    }

    const { transcript } = this.state;
    this.setState({ isFetching: false });

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
      this.setState({ isOn: true });
      Helper.setLightStatus(true);

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
              console.log(this.state.curTime);
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
          "http://192.168.8.104/api/UFWVG8q5nDKl1Icqatr5Nwjx3G4aFQRxeJ8GsnZi/lights/1/state",
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
          "http://192.168.8.104/api/UFWVG8q5nDKl1Icqatr5Nwjx3G4aFQRxeJ8GsnZi/lights/1/state",
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


    if (transcript == "التعليمات") {
      NavigationService.navigate("instructions");
    }

  
    if (transcript == "الصفحه الشخصيه") {
      NavigationService.navigate("profile");
    }


    if (transcript == "الانماط") {
      NavigationService.navigate("Routine");
    }

   
    if (transcript == "رجوع") {
      NavigationService.navigate("Home");
    }
    if (transcript == "التقارير") {
      NavigationService.navigate("report");
    }
    if(transcript == "الاجهزه المتصله"){
      NavigationService.navigate("supdevices");
    }
    //starting from here all the methods and variables related to homescreen
    if (transcript == "تفعيل الوضع الصباحي") {
      //_onPress2()

// LEt say hi for test ok ? 
// Here after this executed it sticks and hanging like an infinite loop 
// this.props.store.dispatch({type:'TOGGLE',index:'toggle3'});

this.click_btn();
alert("Hello in if statement");

      //after this statement is not executing ! 
      alert("Hello Ending");
//it is because of redux call
// So redux end execution ? sure
//How to solve this ?I don't know the reason//anyway, If I click the new button, the morning button works,. right?
// it works with voice but stops the whole function! 
// after the redux call 
//:((((( This is the main thing 
    }
    if (transcript == "تفعيل الوضع المسائي") {
      //_onPress4()
      this.props.store.dispatch({type:'TOGGLE',index:'toggle4'});
    }

    if (transcript == "تفعيل وضع الخروج من المنزل") {
      //_onPress3()
      this.props.store.dispatch({type:'TOGGLE',index:'toggle2'});
    }
    if (transcript == "تفعيل وضع العوده الى المنزل") {
      //_onPress1()
      this.props.store.dispatch({type:'TOGGLE',index:'toggle1'});
    }

    if (transcript == "إلغاء تفعيل الوضع الصباحي") {
      //toggle1 = false
      this.props.store.dispatch({type:'SET',index:'toggle2',value:false});
    }
    if (transcript == "إلغاء تفعيل الوضع المسائي") {
      //toggle4 = false
      this.props.store.dispatch({type:'SET',index:'toggle4',value:false});
    }

    if (transcript == "إلغاء تفعيل وضع الخروج من المنزل") {
      //toggle3 = false
      this.props.store.dispatch({type:'SET',index:'toggle3',value:false});
    }
    if (transcript == " إلغاء تفعيل وضع العوده الى المنزل") {
      //toggle1=false
      this.props.store.dispatch({type:'SET',index:'toggle1',value:false});
    }

    // Starting from here related to routineScreen
    //
    //
    if (transcript == "Morning situation") {
      //this.release_button_action(0);
    }
    if (transcript == "Time") {
      //this.setState({date_picker_display:true});
    }
    if (transcript == "Cancellation") {
      //this.setState({date_picker_display: false});
      //this.init_hourminute_array()
    }
    if (transcript == "Turn on the AC") {
      //click_togglebutton(0)
    }
    if (transcript == "minute") {
      //select_minute(0)
    }
    if (transcript == "It is one o'clock in the morning ") {
      // this.select_hour(0)
    }
    if (transcript == "saving time ") {
      // this.setState({date_picker_display: false})
    }
    if (transcript == "Morning mode saved ") {
      // this.save_button_action(0)
    }

    if(transcript == "الوضع الصباحي" ){
      routineArr.push('morning routine');
      console.log(" mmmmmoooorrrning");
  }

  if(transcript == "الوضع المسائي" ){
      routineArr.push('night routine');
  }
  if(transcript == "وضع الخروج" ){
    routineArr.push('leave routine');
}

if(transcript == "وضع العوده" ){
  routineArr.push('back routine');
}

  if(routineArr[0]=='morning routine' || routineArr[0]=='night routine'
   || routineArr[0]=='leave routine' ||routineArr[0]=='back routine'){
  if(transcript == "تشغيل النور")
{
  routineArr.push('turnOnLight');
  console.log("llllliiighhhttt");
}
 
if(transcript == "إغلاق النور")
{
  routineArr.push('turnOffLight');
}
  }

  if (routineArr.length == 2 ){
  if(transcript == "الواحده"){
   
    routineArr.push(0);
    console.log("oooonnneeee");
}
 if(transcript == "الساعة الثانية صباحاً"){
   
    routineArr.push(1)
}
if(transcript == "الساعة الثالثة صباحاً"){
  
    routineArr.push(2)
}
if(transcript == "الساعة الرابعة صباحاً"){
   
    routineArr.push(3)
}
 if(transcript == "الساعة الخامسة صباحاً"){
   
    routineArr.push(4)
}
 if(transcript == "الساعة السادسة صباحاً"){
   
    routineArr.push(5)
}
 if(transcript == "الساعة السابعة صباحاً"){
   
    routineArr.push(6)
}
 if(transcript == "الساعة الثامنة صباحاً"){
   
    routineArr.push(7)
}
  if(transcript == "الساعة التاسعة صباحاً"){
   
    routineArr.push(8)
}
 if(transcript == "الساعة العاشرة صباحاً"){
   
    routineArr.push(9)
}
if(transcript == "الساعة الحادية عشر صباحاً"){
   
    routineArr.push(10)
}
if(transcript== "الساعة الثانية عشر صباحاً"){
  
    routineArr.push(11)
}}

if(routineArr.length ==  3){
if(transcript == "دقيقة"){
   
   routineArr.push(1) 
}
if(transcript == "دقيقتان"){
   
   routineArr.push(2) ;
   console.log("twwwwoooo");
}
if(transcript == "ثلاث دقائق"){
   
   routineArr.push(3) 
}
if(transcript == "أربع دقائق"){
   
   routineArr.push(4) 
}
 if(transcript == "خمس دقائق"){
   
   routineArr.push(5) 
}
if(transcript == "ست دقائق"){
   
   routineArr.push(6) 
}
 if(transcript == "سبع دقائق"){
   
   routineArr.push(7) 
}
 if(transcript == "ثمان دقائق"){
  
   routineArr.push(8) 
}
 if(transcript == "تسع دقائق"){
  
   routineArr.push(9) 
}

 if(transcript == "عشر دقائق"){
   
   routineArr.push(10) 
}
 if(transcript == "احدى عشر دقيقة"){
  
   routineArr.push(11) 
}
 if(transcript == "اثنا عشر دقيقة"){
   
   routineArr.push(12) 
}
 if(transcript == "ثلاث عشر دقيقة"){
   
   routineArr.push(13) 
}
 if(transcript == "اربعة عشر دقيقة"){
  
   routineArr.push(14) 
}
 if(transcript == "خمسة عشر دقيقة"){
   
   routineArr.push(15) 
}
  if(transcript == " ستة عشر دقيقة"){
   
   routineArr.push(16) 
}
  if(transcript == "سبعة عشر دقيقة"){
   
   routineArr.push(17) 
}
  if(transcript == "ثمانية عشر دقيقة"){
   
   routineArr.push(18) 
}
  if(transcript == "تسعة عشر دقيقة"){
  
   routineArr.push(19) 
}
   if(transcript == " عشرون دقيقة"){
   
   routineArr.push(20) 
}
   if(transcript == " واحد وعشرون دقيقة"){
   
   routineArr.push(21) 
}
if(transcript == " اثنان وعشرون دقيقة"){
   
   routineArr.push(22) 
}
if(transcript == " ثلاث وعشرون دقيقة"){
   
   routineArr.push(23) 
}
if(transcript == " اربعة وعشرون دقيقة"){
  
   routineArr.push(24) 
}
if(transcript == " خمسة وعشرون دقيقة"){
   
   routineArr.push(25) 
}
if(transcript == " ستة وعشرون دقيقة"){
  
   routineArr.push(26) 
}
if(transcript == " سبعة وعشرون دقيقة"){
   
   routineArr.push(27) 
}
if(transcript == "ثمانية وعشرون دقيقة"){
   
   routineArr.push(28) 
}
if(transcript == "تسعة وعشرون دقيقة"){
   
   routineArr.push(29) 
}
if(transcript == "ثلاثون دقيقة"){
  
   routineArr.push(30) 
}
 if(transcript == "واحد وثلاثون دقيقة"){

   routineArr.push(31) 
}
if(transcript == "اثنان وثلاثون دقيقة"){
  
   routineArr.push(32) 
}
if(transcript == "ثلاث وثلاثون دقيقة"){
   
   routineArr.push(33) 
}
if(transcript == "اربعة وثلاثون دقيقة"){
  
   routineArr.push(34) 
}
if(transcript == "خمسة وثلاثون دقيقة"){
   
   routineArr.push(35) 
}
if(transcript == "ستة وثلاثون دقيقة"){
  
   routineArr.push(36) 
}
if(transcript == "سبعة وثلاثون دقيقة"){
   
   routineArr.push(37) 
}
if(transcript == "ثمانية وثلاثون دقيقة"){
  
   routineArr.push(38) 
}
if(transcript == "تسعة وثلاثون دقيقة"){
  
   routineArr.push(39) 
}
if(transcript == "اربعون دقيقة"){
    
   routineArr.push(40) 
}
if(transcript == "واحد واربعون دقيقة"){
   
   routineArr.push(41) 
}
 if(transcript == "اثنان واربعون دقيقة"){
   
   routineArr.push(42) 
}
 if(transcript == "ثلاث واربعون دقيقة"){
   
   routineArr.push(43) 
}
 if(transcript == "اربعة واربعون دقيقة"){
   
   routineArr.push(44) 
}
 if(transcript == "خمسة واربعون دقيقة"){
   
   routineArr.push(45) 
}
 if(transcript == "ستة واربعون دقيقة"){
  
   routineArr.push(46) 
}
 if(transcript == "سبعة واربعون دقيقة"){
    
   routineArr.push(47) 
}
 if(transcript == "ثمانية واربعون دقيقة"){
    
   routineArr.push(48) 
}
 if(transcript == "تسعة واربعون دقيقة"){
    
   routineArr.push(49) 
}
 if(transcript == "خمسون دقيقة"){
   
   routineArr.push(50) 
}
 if(transcript == "واحد وخمسون دقيقة"){
  
   routineArr.push(51) 
}
  if(transcript == "اثنان وخمسون دقيقة"){
   
   routineArr.push(52) 
}
  if(transcript == "ثلاث وخمسون دقيقة"){
  
   routineArr.push(53) 
}
  if(transcript == "اربعة وخمسون دقيقة"){
   
   routineArr.push(54) 
}
  if(transcript == "خمسة وخمسون دقيقة"){
  
   routineArr.push(55) 
}
  if(transcript == "ستة وخمسون دقيقة"){
   
   routineArr.push(56) 
}
  if(transcript == "سبعة وخمسون دقيقة"){
  
   routineArr.push(57) 
}
  if(transcript == "ثمانية وخمسون دقيقة"){
  
   routineArr.push(58) 
}
  if(transcript == "تسعة وخمسون دقيقة"){
   
   routineArr.push(59) 
}
}
if(transcript == "حفظ")
{
  routineArr.push('save');
  console.log("sssaaaaavvveee");
  this.routineSpeechValidate();

}
  };



  async routineSpeechValidate(){
    
    if(routineArr[0]==='morning routine')
    {
      if (routineArr.length == 5 ){
        if(routineArr[1]==='turnOffLight' ||routineArr[1]==='turnOnLight'  )
        {
             if(routineArr[4]==='save'){
             this.save_button_action(0);

             }
          
        }
        else{
           // here alerat with aduio " عذرا، اتبع نفس الطريقة التي بالتعليمات"  

        }
      }
      else{
       // here alerat with aduio " عذرا، اتبع نفس الطريقة التي بالتعليمات" 
      }
    }

    if(routineArr[0]==='night routine')
    {
      if (routineArr.length == 5 ){
        if(routineArr[1]==='turnOffLight' ||routineArr[1]==='turnOnLight'  )
        {
          if(routineArr[4]==='save'){
            this.save_button_action(3);
             }
          
        }
        else{
          // here alerat with aduio " عذرا، اتبع نفس الطريقة التي بالتعليمات" 
        }
    }
    else{
      // here alerat with aduio " عذرا، اتبع نفس الطريقة التي بالتعليمات" 
    }
  }
  
  else
  
    if(routineArr[0]==='leave routine')
    {
      if (routineArr.length == 3 ){

        if(routineArr[1]==='turnOffLight' ||routineArr[1]==='turnOnLight'  )
        {
             if(routineArr[2]==='0'){
              this.save_button_action(1);
             }
          
        }
        else{
          // here alerat with aduio " عذرا، اتبع نفس الطريقة التي بالتعليمات" 
        }
      }
      else{
        // here alerat with aduio " عذرا، اتبع نفس الطريقة التي بالتعليمات" 
      }
    }

    if(routineArr[0]==='back routine')
    {
      if (routineArr.length == 3 ){
        if(routineArr[1]==='turnOffLight' ||routineArr[1]==='turnOnLight'  )
        {
             if(routineArr[2]==='0'){
              this.save_button_action(2);
             }
          
        }
        else{
                  // here alerat with aduio " عذرا، اتبع نفس الطريقة التي بالتعليمات" 

        }
      }
      else {
                // here alerat with aduio " عذرا، اتبع نفس الطريقة التي بالتعليمات" 

      }
    }

  
  


}

save_button_action(index) {
  var lat , lng , i;
 
  var user = firebase.auth().currentUser;
  console.log(user.uid)
  var routineName,routineTime , disRoutine
  var tmp_str = "" ;
  var actions = [];
  var i ,j;
  var flag = false
  var flagH = false ;
  firebase.database().ref('mgnUsers/'+firebase.auth().currentUser.uid).once('value',(snap)=>{ 
  
   lat= snap.val().latitude;
   lng= snap.val().longitude;})

  

      //var routineTable =  firebase.database().ref('routine/'); 
   // this.setActionTable();
      
      if(index==0) {
          flagH = false ;
          routineName = "morning routine";
 
          disRoutine = "الوضع الصباحي";

          if(routineArr[1]==='turnOffLight'){
            actions.push("001");
          }
          else{
            actions.push("002");
          }
          routineTime = routineArr[2]+":"+routineArr[3];
  
   
  
      }// end if for morning routine
       else if(index==1) {
        
           
           if(lat === 0 && lng===0){
            
                //here alerat with aduio "عذراً، عليك تفعيل خاصية الموقع حتى يتم انشاء وضع الخروج",
                
           }// end if check location
           else {
           
          routineName="leave routine";
         
           disRoutine = "وضع الخروج";
           flag = true
           routineTime = "empty"
           // check location
         
          
                  if(routineArr[1]==='turnOffLight'){
                    actions.push("001");
                  }
                  else{
                    actions.push("002");
                  }
      }//end loop

      }// end if for leave routine
       else if(index==2) {
          if(lat === 0 && lng===0){
             
            
               //here alerat with aduio "عذراً، عليك تفعيل خاصية الموقع حتى يتم انشاء وضع العودة",
           }
           else {
            
           
          routineName="come routine";
        
          disRoutine="وضع العودة";
          routineTime = "empty"
          flag =true
          // set If cindition for check location
          
                  if(routineArr[1]==='turnOffLight'){
                    actions.push("001");
                  }
                  else{
                    actions.push("002");
                  }
      }//end loop
  
      }//end if for come routine
       else if(index==3) {
        
          flagH=false;
          routineName="night routine";
         
          disRoutine="الوضع المسائي";

          if(routineArr[1]==='turnOffLight'){
            actions.push("001");
          }
          else{
            actions.push("002");
          }

          routineTime = routineArr[2]+":"+routineArr[3];

  
    
      }//end if for night routine
     
 
       if (( routineName == "morning routine" || routineName == "night routine" )){
        
           console.log("in if save")
           var userRoutineArr = [];
           var trueSave=false;
           firebase.database().ref('/routine').once("value",snapshot=>{
              snapshot.forEach(item => {
               var temp = item.val();
               if(temp.userID == user.uid){
                   console.log("yes have user");
                  userRoutineArr.push(temp.name);
                  console.log(temp.name);
               }//end if 
              });//end forEach
      
          
        
          if(userRoutineArr.indexOf(routineName)!=-1){
              console.log("enter if check")
              firebase.database().ref('/routine').once("value" , (snapshot)=>{
                  snapshot.forEach(item => {
                      
                   var temp = item.val();
                   console.log(temp);
                   if(temp.userID == user.uid && temp.name == routineName){
                       var theId = item.key;
              
                  
                   firebase.database().ref('routine/'+theId).update(  {
                      name: routineName,
                     time: routineTime,
                      actionsID: actions,
                      day: ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"],
                      userID: user.uid,
                      status: 1,
        
                    }); 
                   
                 
                
                   }//end if 
                  });//end forEach
          
               });//end snapshot..
               }
          else {
              firebase.database().ref('routine/').push(
                  {
                    name: routineName,
                    time: routineTime,
                    actionsID: actions,
                    day: ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"],
                    userID: user.uid,
                    status: 1,
      
                  })//end set routine.
                  
                 
          }
       
     });//end snapshot..
    
       
  
  //here alerat with aduio "تم حفظ  " + disRoutine
 
       
    
         
     
   }//end set morning or night routine.


   //Leave come Firebase
    else if(routineName == "leave routine" || routineName == "come routine" 
                  && user.longitude != 0 && user.latitude !=0 ){
                      var userRoutineArr = [];
                      firebase.database().ref('/routine').once("value",snapshot=>{
                         snapshot.forEach(item => {
                          var temp = item.val();
                          if(temp.userID == user.uid){
                              console.log("yes have user");
                             userRoutineArr.push(temp.name);
                             console.log(temp.name);
                          }//end if 
                         });//end forEach
                 
                     
                   
                     if(userRoutineArr.indexOf(routineName)!=-1){
                         console.log("enter if check")
                         firebase.database().ref('/routine').once("value" , (snapshot)=>{
                             snapshot.forEach(item => {
                                 
                              var temp = item.val();
                              console.log(temp);
                              if(temp.userID == user.uid && temp.name == routineName){
                                  var theId = item.key;
                         
                             //Morning and night firebase
                              firebase.database().ref('routine/'+theId).update(  {
                                 name: routineName,
                                time: routineTime,
                                 actionsID: actions,
                                 day: ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"],
                                 userID: user.uid,
                                 status: 1,
                   
                               }); 
                              
                            
                           
                              }//end if 
                             });//end forEach
                     
                          
                          
                          });//end snapshot..
                          
          }
          else{
          firebase.database().ref('routine/').push(
              {
                name: routineName,
                time: routineTime,
                actionsID: actions,
                day: ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"],
                userID: user.uid,
                status: 1,
  
              })//end set routine. 
          
          }  });//end snapshot..
        
         // here alerat with aduio "تم حفظ  " + disRoutine
         
    
      console.log("save routine");
      

     
  }
}


  startRecording = async () => {
    // console.log(recording)
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== "granted") return;

    this.setState({ isRecording: true });
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    const recording = new Audio.Recording();

    try {
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
    } catch (error) {
      // console.log(error)
      this.stopRecording();
    }

    this.recording = recording;
  };

  stopRecording = async () => {
    this.setState({ isRecording: false });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // noop
    }
  };

  resetRecording = () => {
    this.deleteRecordingFile();
    this.recording = null;
  };

  click_btn = async () => {
    alert("hi");
    let routineInfo = {
      toggle1: {
        name: "come routine",
        alert:
          " You haven't created a homecoming mode before, you must first create it",
      },
      toggle3: {
        name: "leave routine",
        alert: " You haven't created an exit home mode before, you first have to create it",
      },
      toggle2: {
        name: "morning routine",
        alert: " You haven't creatited Morning Mode before, you must first create it",
      },
      toggle4: {
        name: "night routine",
        alert: " You haven't created evening mode before, you have to first create it",
      },
    };
    const toggleIndex = 'toggle2';
    const toggleIndexValue = this.props.toggle2;
    this.props.dispatch({type : 'TOGGLE', index : 'toggle2', value: !toggleIndexValue });

    

  }

  render() {
    const { isRecording, transcript, isFetching } = this.state;

    return (
      <View style={styles.container}>


        {/* <Button
          title="click"
          onPress={() => {this.click_btn()}}
        /> */}
        <View
          onPressIn={this.startRecording}
          // onPressOut={this.handleOnPressOut}
        >

          {isFetching &&    <Image source={require('./crop2.gif')} style={styles.Indicator} />}
          {!isFetching &&  <Image source={require('./crop.gif')} style={styles.Indicator1} />}
        </View>
      </View>
    );
  }
}

function mapStateToProps (store) {
  return {
    toggle2: store.homeSwitches.toggle2
  }
}

export default connect(mapStateToProps)(SpeechToTextButton);
// export default SpeechToTextButton;
