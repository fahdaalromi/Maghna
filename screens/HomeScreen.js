import React, { Component } from 'react';

import { ScrollView, StyleSheet, 
  ActivityIndicator,Text, View, Image,
   Button, backgroundColor, Alert, border, 
   WIDTH, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome5 ,AntDesign,Feather
  ,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";

import { withNavigation } from 'react-navigation';
import { Ionicons} from '@expo/vector-icons';
import { render } from 'react-dom';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import { Audio } from 'expo-av';
import * as firebase from 'firebase';
import  moment from 'moment';



export default class HomeScreen extends Component {
    

  async  wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

 
  
  
   async componentDidMount(){

    this.props.navigation.setParams({
      headerLeft: (<TouchableOpacity onPress={this.handelSignOut}>
         <SimpleLineIcons name="logout" size={24} color='white' style={{marginLeft:15}} />
      </TouchableOpacity>)
})

    const firebaseConfig = {


      apiKey: "AIzaSyAAM7t0ls6TRpHDDmHZ4-JWaCLaGWZOokI",
      authDomain: "maghnaapplication.firebaseapp.com",
      databaseURL: "https://maghnaapplication.firebaseio.com",
      projectId: "maghnaapplication",
      storageBucket: "maghnaapplication.appspot.com",
      messagingSenderId: "244460583192",
      appId: "1:244460583192:web:f650fa57532a682962c66d",


    //  apiKey: "AIzaSyBUBKLW6Wrk48NQ_TcgUerucTZFphw6l-c",
     // authDomain: "maghna-62c55.firebaseapp.com",
     // databaseURL: "https://maghna-62c55.firebaseio.com",
     // projectId: "maghna-62c55",
    //  storageBucket: "maghna-62c55.appspot.com",
    //  messagingSenderId: "21464439338",
     // appId: "1:21464439338:web:8c6bb486fb3673e5d14153",
     // measurementId: "G-R3BQPCTCTM"
    };
   

      while(true){
    await this.startRecording()
    await this.wait(3000);
    await this.stopRecording();
    await  this.getTranscription();
    await this.resetRecording();
    firebase.database().ref('mgnUsers/'+firebase.auth().currentUser.uid).once('value',(snap)=>{ 
if(snap.val().isActive)
{
   this.insertRoutine();
   this.checkData();
  console.log("in if is active "+snap.val().isActive);
}

    })

    



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

      firebase.database().ref('mgnUsers/'+firebase.auth().currentUser.uid).once('value',(snap)=>{ 
        if(snap.val().isActive===true)
        {
          this.analysis('001');
        }
        
            })

this.analysis('001');
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

      firebase.database().ref('mgnUsers/'+firebase.auth().currentUser.uid).once('value',(snap)=>{ 
        if(snap.val().isActive===true)
        {
          this.analysis('002');
        }
        
            })



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


   analysis =  async  (actionid)=>{

    
    //check if it is't the first command
    console.log('before definition of flage')
   var flag=false;
   console.log('hiii')
await firebase.database().ref('userActions/').once ('value', async (snap)=>{ 
        console.log("iafter definition ")
     await   snap.forEach((child)=>{
            if(child.val().userID===firebase.auth().currentUser.uid && child.val().ActionID== actionid && child.val().day=== moment().format('dddd'))
            
                if (child.val().time=== new Date().getHours()|| (new Date().getHours()===((child.val().time+1)%24) &&(new Date().getMinutes<=10) ) ||( new Date().getHours()===( (child.val().time-1+24 )%24)  && new Date().getMinutes()>=49 ) ) {
            var plus=parseInt(child.val().Repetition)+1;
            console.log("before first use")
            flag=true;
            console.log("before first use 2")
         firebase.database().ref('userActions/'+child.key).update(
            {

          
               
                Repetition:plus, 
            }
               
            ).then(() => {
                console.log('inserted the update')
            }).catch((error)=>{
                console.log(error)
            });
         } })
    }
    ).finally(()=>{
        if(flag===false)
        this.insertUserAction();
    });

}

insertUserAction= async  ()=>{
  console.log("inside inserUserAction")
  var userActionKey =firebase.database().ref().child('userActions').push().key;
  firebase.database().ref('userActions/'+userActionKey).set(
      {
      
      userID: firebase.auth().currentUser.uid,
      ActionID:'001',
      time:new Date().getHours(),
      day:moment().format('dddd'),
      Repetition:'1',
      inRoutine:'0',
      insertedDate: new Date().getFullYear()+'/'+new Date().getMonth()+'/'+new Date().getDate(),
      }).then(() => {
          console.log('inserted')
      }).catch((error)=>{
          console.log(error)
      });
}


 insertRoutine= async  ()=>{
  console.log("inside inserRoutine");
  var routineKey = await firebase.database().ref().child('routine').push().key;
  await firebase.database().ref('userActions/').once('value',async (snap) =>{
      snap.forEach((child)=>{
          var date1= new Date(new Date().getFullYear()+'/'+new Date().getMonth()+'/'+new Date().getDate());
          console.log("print date1"+date1)
          var date2=new Date(child.val().insertedDate);
      var timeDiff= date1.getTime() - date2.getTime();
      console.log("data1 get time "+date1.getTime())
      console.log("data2 get time "+date2.getTime())
      console.log("print timeDiff"+timeDiff)
     var dayDiff= timeDiff/(1000 * 3600 * 24);
     console.log("before if 19")
     console.log("dayDiff"+dayDiff)
          if(child.val().Repetition===18)
          if(dayDiff<=30)
          if(child.val().inRoutine==='0')
         {
         firebase.database().ref('userActions/'+child.key).update(
            {

          
               
               inRoutine:'1', 
            }
              
            )
              console.log("inside if 18 "); 
             firebase.database() .ref('routine/'+routineKey).set(
                 {
                    name:'analysis',
                    actionID: child.val().ActionID,
                    userID: child.val().userID,
                    day: child.val().day,
                    time: child.val().time,
                    timeinserted: child.val().insertedDate,
              
                 }
             )

          }

      })
  })
}


checkData= async  ()=>{
  console.log("inside checkData  ");

  firebase.database().ref('routine/').once('value',(snap)=>{
      snap.forEach((child)=>{
        var date1= new Date(new Date().getFullYear()+'/'+new Date().getMonth()+'/'+new Date().getDate());
        var date2=new Date(child.val().timeinserted);
    var timeDiff= date1.getTime()- date2.getTime();
    console.log("check date data1"+date1)
    console.log("check date data2"+date2)
    console.log("check date timeDiff"+timeDiff)
          dayDiff=timeDiff/(1000 * 3600 * 24);
          if(dayDiff>90){
              firebase.database().ref('routine/'+child.key).remove();
          }
          
      })
  
  })
  
  }





  handelSignOut =() =>{
    var {navigation}=this.props;
    console.log("logout method");
    
    console.log("inside");
    try{
      console.log(this.state);
     firebase
      .auth()
      .signOut()
      .then(function(){
     navigation.navigate('WelcomeStackNavigator')
      })
      
      .catch(error => console.log(error.message))
      console.log("after"+this.state.email);
      }catch(e){console.log(e.message)}
      
  };



    static navigationOptions = ({navigation})=> ({

        headerTint:'#F7FAFF',
        headerTitle: 'الصفحة الرئيسية',
        headerRight:()=>(
          <TouchableOpacity onPress={()=>{navigation.navigate('instructions')}} style={{marginRight:15}}>
            <MaterialCommunityIcons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
      
        ),
        headerLeft: navigation.state.params && navigation.state.params.headerLeft,
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

    
  newMethod() {
    return "before inserRoutine";
  }

    _onPress1(){
        const newState = !this.state.toggle1;
        this.setState({toggle1:newState})
    }
    
    
    _onPress2(){
        const newState = !this.state.toggle2;
        this.setState({toggle2:newState})
    }
    
    
    _onPress3(){
        const newState = !this.state.toggle3;
        this.setState({toggle3:newState})
    }
    
    
    _onPress4(){
        const newState = !this.state.toggle4;
        this.setState({toggle4:newState})
    }
    render() {

        const {toggle1}= this.state;
        const {toggle2}= this.state;
        const {toggle3}= this.state;
        const {toggle4}= this.state;
        
       
       
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor: '#F7FAFF' }}>
                <Text style={{ fontSize:25, color: '#6FA0AF', bottom: -200 , paddingLeft: 180 }}>الأنماط الحياتية</Text>
                <TouchableOpacity
                    onPress={()=>this._onPress1()}
                    style={{ fontSize:25, backgroundColor:toggle1?'white':'#6FA0AF' , color: '#6FA0AF', justifyContent: 'center', width: 150, height: 140, left:80, borderRadius: 25, marginHorizontal: 25, paddingLeft: 28, paddingRight:10, paddingTop: 9, bottom: -250,shadowOpacity: 0.3}}>
                    <Ionicons style={{ left:17, paddingLeft: -40, paddingRight:5, paddingTop: 9, bottom: 90, top: -10}} name="md-home" size={70} color= {toggle1?'#6FA0AF':'white'} />
                    <Text style={{ left:0, paddingLeft: -40, paddingRight:5, bottom: 90, top: -10, color: toggle1?'#6FA0AF':'white' , fontWeight: 'bold', fontSize:13}}>الرجوع إلى المنزل</Text>
                </TouchableOpacity>

                
                <TouchableOpacity
                    onPress={()=>this._onPress2()}
                    style={{ fontSize:25, backgroundColor:toggle2?'white':'#6FA0AF' , color: '#6FA0AF', justifyContent: 'center', width: 150, height: 140, left:80, borderRadius: 25, marginHorizontal: 25, paddingLeft: 28, paddingRight:10, paddingTop: 9, bottom: -270,shadowOpacity: 0.3}}>
                    <Ionicons style={{ left:17, paddingLeft: -40, paddingRight:5, paddingTop: 9, bottom: 90, top: -10}} name="md-sunny" size={70} color= {toggle2?'#6FA0AF':'white'} />
                    <Text style={{ left:5, paddingLeft: -40, paddingRight:5, bottom: 90, top: -10, color: toggle2?'#6FA0AF':'white' , fontWeight: 'bold', fontSize:13}}>الوضع الصباحي</Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity
                    onPress={()=>this._onPress3()}
                    style={{ fontSize:25, backgroundColor:toggle3?'white':'#6FA0AF' , color: '#6FA0AF', justifyContent: 'center', width: 150, height: 140, left:-80, borderRadius: 25, marginHorizontal: 25, paddingLeft: 28, paddingRight:10, paddingTop: 9, bottom: -130,shadowOpacity: 0.3}}>
                    <MaterialCommunityIcons style={{ left:17, paddingLeft: -40, paddingRight:5, paddingTop: 9, bottom: 90, top: -10}} name="door-open" size={70} color= {toggle3?'#6FA0AF':'white'} ></MaterialCommunityIcons>
                    <Text style={{ left:0, paddingLeft: -60, paddingRight:5, bottom: 90, top: -10, color: toggle3?'#6FA0AF':'white' , fontWeight: 'bold', fontSize:13}}>الخروج من المنزل</Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity
                    onPress={()=>this._onPress4()}
                    style={{ fontSize:25, backgroundColor:toggle4?'white':'#6FA0AF' , color: '#6FA0AF', justifyContent: 'center', width: 150, height: 140, left:-80, borderRadius: 25, marginHorizontal: 25, paddingLeft: 28, paddingRight:10, paddingTop: 9, bottom: 170,shadowOpacity: 0.3}}>
                    <MaterialCommunityIcons style={{ left:17, paddingLeft: -40, paddingRight:5, paddingTop: 9, bottom: 90, top: -10}} name="weather-night" size={70} color= {toggle4?'#6FA0AF':'white'} ></MaterialCommunityIcons>
                    <Text style={{ left:5, paddingLeft: -40, paddingRight:5, bottom: 90, top: -10, color: toggle4?'#6FA0AF':'white' , fontWeight: 'bold', fontSize:13}}>الوضع المسائي</Text>
                </TouchableOpacity>
                
            
                <Image 
                    style={{ width: 440, height: 360, bottom: -20 }}
                    source={require('./222.png')} />

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
  flex: 1,
  backgroundColor: 'red',
  alignItems: 'center',
  justifyContent: 'center',
  },

  container: {
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  
