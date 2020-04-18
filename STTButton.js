import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  AsyncStorage,
  Image, Button,Text
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { Audio } from "expo-av";
import NavigationService from "./navigation/NavigationService";
import * as Helper from "./components/Helper";
// import { Button } from "native-base";

// Here I use this time, I open the package
const rnTimer = require("react-native-timer");

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
  },
  Indicator: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 110,
  },
  Indicator1: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 110,
  },

  text: {
    color: "#fff",
  },
});

export default class SpeechToTextButton extends Component {
  constructor(props) {
    super(props);
    this.recording = null;

    this.state = {
      isFetching: false,
      isRecording: false,
      transcript: "",
      //This is the dueation
      //this variable here in STTButton I use to store the duration in seconds in
      curTime: 0,
      isOn: true,
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
    while (true) {
      await this.startRecording();
      await this.wait(5000);
      await this.stopRecording();
      await this.getTranscription();
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

  getTranscription = async () => {

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
    //starting from here all the methods and letiables related to homescreen
    if (transcript == "تفعيل الوضع الصباحي") {
      //_onPress2()
      alert("Hi");
      this.props.store.dispatch({type:'TOGGLE',index:'toggle3'});

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
      this.props.store.dispatch({type:'SET',index:'toggle3',value:false});
    }
    if (transcript == "إلغاء تفعيل الوضع المسائي") {
      //toggle4 = false
      this.props.store.dispatch({type:'SET',index:'toggle4',value:false});
    }

    if (transcript == "إلغاء تفعيل وضع الخروج من المنزل") {
      //toggle3 = false
      this.props.store.dispatch({type:'SET',index:'toggle2',value:false});
    }
    if (transcript == " إلغاء تفعيل وضع العوده الى المنزل") {
      //toggle1=false
      this.props.store.dispatch({type:'SET',index:'toggle1',value:false});
    }

    // Starting from here related to routineScreen
    //
    //
    if (transcript == "الوضع الصباحي") {
      //this.release_button_action(0);
    }
    if (transcript == "الوقت") {
      //this.setState({date_picker_display:true});
    }
    if (transcript == "إلغاء") {
      //this.setState({date_picker_display: false});
      //this.init_hourminute_array()
    }
    if (transcript == "تشغيل المكيف") {
      //click_togglebutton(0)
    }
    if (transcript == "دقيقه") {
      //select_minute(0)
    }
    if (transcript == "الساعه الواحده صباحاً ") {
      // this.select_hour(0)
    }
    if (transcript == "حفظ الوقت ") {
      // this.setState({date_picker_display: false})
    }
    if (transcript == "حفظ الوضع الصباحي ") {
      // this.save_button_action(0)
    }
  };

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

  render() {
    const { isRecording, transcript, isFetching } = this.state;
    const color_toggle = true;
    return (
      <View style={styles.container}>
        
        {/* <Button 
          title = "click"
          onPress = {() => {this.props.store.dispatch({type : 'TOGGLE', index : 'toggle3'})}}
          color = 'red'

          // write on press it appears 
        /> */}

        <View

          onPressIn={this.startRecording}
          onPressOut={this.handleOnPressOut}
        >


          {isFetching &&    <Image source={require('./crop2.gif')} style={styles.Indicator} />
}
          {!isFetching &&  <Image source={require('./crop.gif')} style={styles.Indicator1} />}
        </View>

      </View>
    );
  }
}
