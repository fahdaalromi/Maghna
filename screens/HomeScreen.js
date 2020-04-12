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
 



  
  
   async componentDidMount(){
   this.checkRoutine();
    this.props.navigation.setParams({
      headerLeft: (<TouchableOpacity onPress={this.handelSignOut}>
         <SimpleLineIcons name="logout" size={24} color='white' style={{marginLeft:15}} />
      </TouchableOpacity>)
    
})


    const firebaseConfig = {


      // apiKey: "AIzaSyAAM7t0ls6TRpHDDmHZ4-JWaCLaGWZOokI",
      // authDomain: "maghnaapplication.firebaseapp.com",
      // databaseURL: "https://maghnaapplication.firebaseio.com",
      // projectId: "maghnaapplication",
      // storageBucket: "maghnaapplication.appspot.com",
      // messagingSenderId: "244460583192",
      // appId: "1:244460583192:web:f650fa57532a682962c66d",



/*
      apiKey: "AIzaSyBUBKLW6Wrk48NQ_TcgUerucTZFphw6l-c",
      authDomain: "maghna-62c55.firebaseapp.com",
      databaseURL: "https://maghna-62c55.firebaseio.com",
      projectId: "maghna-62c55",
      storageBucket: "maghna-62c55.appspot.com",
      messagingSenderId: "21464439338",
      appId: "1:21464439338:web:8c6bb486fb3673e5d14153",
      measurementId: "G-R3BQPCTCTM"
      */

    
    apiKey: "AIzaSyCsKoPxvbEp7rAol5m-v3nvgF9t8gUDdNc",
    authDomain: "maghnatest.firebaseapp.com",
    databaseURL: "https://maghnatest.firebaseio.com",
    projectId: "maghnatest",
    storageBucket: "maghnatest.appspot.com",
    messagingSenderId: "769071221745",
    appId: "1:769071221745:web:1f0708d203330948655250" ,

    };
   

   /*   while(true){
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

    



      }*/
      //this._onPress1()
     // this._onPress2()
//this._onPress3()
     // this._onPress4()
  }


  deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI())
      await FileSystem.deleteAsync(info.uri)
    } catch (error) {
      console.log('There was an error deleting recorded file', error)
    }
  }

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
      var theId;
      var routineName = 'come routine';
      var user = firebase.auth().currentUser;
        var  userRoutineArr =[];
       
        if (newState){
          firebase.database().ref('/routine').once("value",snapshot=>{
            snapshot.forEach(item => {
             var temp = item.val();
             if(temp.userID == user.uid){
                
               userRoutineArr.push(temp.name);
               console.log(temp.name);
             }//end if 
             if(userRoutineArr.indexOf(routineName)!= -1){
              theId = item.key;
              firebase.database().ref('routine/'+theId).update(  {
                status: 1,
      
              }); 
              this.setState({toggle1:newState}) }
             
      
             });//end forEach
             if (userRoutineArr.indexOf(routineName)== -1){
              
                Alert.alert("عذراً", " لم تقم بإنشاء وضع العودة إلى المنزل من قبل ، عليك أولاً إنشاؤه");
                this.setState({toggle1:!newState})
  
               
             }
          }); //end snapshot..
      
         }
         else {
          firebase.database().ref('/routine').once("value",snapshot=>{
            snapshot.forEach(item => {
             var temp = item.val();
             if(temp.userID == user.uid){
                
               userRoutineArr.push(temp.name);
               console.log(temp.name);
             }//end if 
             if(userRoutineArr.indexOf(routineName)!= -1){
              theId = item.key;
              firebase.database().ref('routine/'+theId).update(  {
                status: 0,
      
              }); 
             }
      
             this.setState({toggle1:newState})});//end forEach
          }); //end snapshot..
         }

     
   // });
 // }
}
    
    
    _onPress2(){
      var theId;
      var routineName = 'morning routine';
      var user = firebase.auth().currentUser;
        var  userRoutineArr =[];
   
        const newState = !this.state.toggle2;
        if (newState){
          firebase.database().ref('/routine').once("value",snapshot=>{
            snapshot.forEach(item => {
             var temp = item.val();
             if(temp.userID == user.uid){
                
               userRoutineArr.push(temp.name);
               console.log(temp.name);
             }//end if 
             if(userRoutineArr.indexOf(routineName)!= -1){
              theId = item.key;
              firebase.database().ref('routine/'+theId).update(  {
                status: 1,
      
              }); 
              this.setState({toggle2:newState}) }
           
      
             });//end forEach
             if(userRoutineArr.indexOf(routineName)== -1){
              
                Alert.alert("عذراً", " لم تقم بإنشاء الوضع الصباحي من قبل ، عليك أولاً إنشاؤه");
                this.setState({toggle2:!newState})
  
               
             }
          }); //end snapshot..
      
         }
         else {
          firebase.database().ref('/routine').once("value",snapshot=>{
            snapshot.forEach(item => {
             var temp = item.val();
             if(temp.userID == user.uid){
                
               userRoutineArr.push(temp.name);
               console.log(temp.name);
             }//end if 
             if(userRoutineArr.indexOf(routineName)!= -1){
              theId = item.key;
              firebase.database().ref('routine/'+theId).update(  {
                status: 0,
      
              }); 
             }
      
             this.setState({toggle2:newState})});//end forEach
          }); //end snapshot..
         }

       
     // });
    
   // }
  }
    
    
    _onPress3(){
      var theId;
      var routineName = 'leave routine';
    var user = firebase.auth().currentUser;
      var  userRoutineArr =[];
      
    const newState = !this.state.toggle3;
   if (newState){
    firebase.database().ref('/routine').once("value",snapshot=>{
      snapshot.forEach(item => {
       var temp = item.val();
       if(temp.userID == user.uid){
          
         userRoutineArr.push(temp.name);
         console.log(temp.name);
       }//end if 
       if(userRoutineArr.indexOf(routineName)!= -1){
        theId = item.key;
        firebase.database().ref('routine/'+theId).update(  {
          status: 1,

        }); 
       
       this.setState({toggle3:newState}) }
      

        });//end forEach
        if(userRoutineArr.indexOf(routineName) == -1){
       
            Alert.alert("عذراً", " لم تقم بإنشاء وضع الخروج من المنزل من قبل ، عليك أولاً إنشاؤه");
            this.setState({toggle3:!newState})
    
           
        }
    }); //end snapshot..

   }
   else {
    firebase.database().ref('/routine').once("value",snapshot=>{
      snapshot.forEach(item => {
       var temp = item.val();
       if(temp.userID == user.uid){
          
         userRoutineArr.push(temp.name);
         console.log(temp.name);
       }//end if 
       if(userRoutineArr.indexOf(routineName)!= -1){
        theId = item.key;
        firebase.database().ref('routine/'+theId).update(  {
          status: 0,

        }); 
        this.setState({toggle3:newState})
       }
       

       });//end forEach
    }); //end snapshot..
   }
      
    }
    
    
    _onPress4(){
      var theId;
      var routineName = 'night routine';
      var user = firebase.auth().currentUser;
        var  userRoutineArr =[];
        const newState = !this.state.toggle4;
        if (newState){
          firebase.database().ref('/routine').once("value",snapshot=>{
            snapshot.forEach(item => {
             var temp = item.val();
             if(temp.userID == user.uid){
                
               userRoutineArr.push(temp.name);
               console.log(temp.name);
             }//end if 
             if(userRoutineArr.indexOf(routineName)!= -1){
              theId = item.key;
              firebase.database().ref('routine/'+theId).update(  {
                status: 1,
      
              }); 
              this.setState({toggle4:newState}) }
           
      
              });//end forEach
              if (userRoutineArr.indexOf(routineName)== -1) {
                Alert.alert("عذراً", " لم تقم بإنشاء الوضع المسائي من قبل ، عليك أولاً إنشاؤه");
                this.setState({toggle4:!newState})
  
               }
          }); //end snapshot..
      
         }
         else {
          firebase.database().ref('/routine').once("value",snapshot=>{
            snapshot.forEach(item => {
             var temp = item.val();
             if(temp.userID == user.uid){
                
               userRoutineArr.push(temp.name);
               console.log(temp.name);
             }//end if 
             if(userRoutineArr.indexOf(routineName)!= -1){
              theId = item.key;
              firebase.database().ref('routine/'+theId).update(  {
                status: 0,
      
              }); 
             }
      
             this.setState({toggle4:newState})});//end forEach
          }); //end snapshot..
         }
       
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
  
