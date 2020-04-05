import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npma
import { Card } from 'react-native-paper';
BackgroundFetch.setMinimumIntervalAsync(1);
const taskName = 'test-background-fetch';
TaskManager.defineTask(taskName, async () => {
  alert('background featch running');
  return BackgroundFetch.Result.NewData;
});


export default class App extends React.Component {
  componentDidMount() {
    this.registerTaskAsync;
  }

  registerTaskAsync = async () => {
    await BackgroundFetch.registerTaskAsync(taskName);
    alert('task registered');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your psasahone! Save to
          get a shareable url.
        </Text>
        <Card>
          <AssetExample />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
const functions = require('firebase-functions');
const axios = require('axios')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
var allActions=[];
var  hour , minute;
//Initial function call:




  exports.scheduledFunctionUpdate = functions.pubsub.schedule('every 1 minutes')
  .onRun((context) => {
    var actionArr =[] ;
    var date = new Date();
   var time = date.getHours();
   var timez = date.toLocaleTimeString();
   var timeH = timez.substring(0,2);
   var timeM= timez.substring(3,5);
   var minInt = parseInt(timeM);
   var hourInt = parseInt(timeH);
   var hourInRiyadh;
   if(hourInt == 22 ){

    hourInRiyadh =1;
   }
   else if ( hourInt == 23){
    hourInRiyadh = 2 ;
   }
   else if ( hourInt ==24){
    hourInRiyadh = 3;
   }
   else {
    var hourInRiyadh = hourInt +3 ;
   }
   
   //var user = context.auth;
    var routineArr  = [];

  var routineTrig = [];
 
  var j,i;
  var routineName ; 
  var routineTime  ; 
  var RminInt ,  RhourInt;
  
   admin.database().ref('/routine').once("value").then((snapshot)=>{
console.log("enter to database");


  snapshot.forEach(item => {
    var temp = item.val();
    actionArr = temp.actionsID;
    routineName = temp.name;
    routineTime= temp.time;
    hour = routineTime.substring (0,2);
    minute = routineTime.substring(3);
    RminInt = parseInt(minute);
    RhourInt = parseInt(hour);
    if(hourInRiyadh == RhourInt && RminInt == minInt && temp.status == 1){
        if (actionArr.indexOf("001")!= -1){
            console.log("It is true id is 001")
            axios.put('http://192.168.100.14/api/1DQ8S2CiZCGaI5WT7A33pyrL19Y47F2PmGiXnv20/lights/3/state',
             {'on':true} )
           .then(res => res.json())
           console.log("I turn on");
        }
        else if(actionsArr.indexOf("002")!= -1) {
            axios.put('http://192.168.100.14/api/1DQ8S2CiZCGaI5WT7A33pyrL19Y47F2PmGiXnv20/lights/3/state',
            {'on':false} )
          .then(res => res.json())
        }
    }
  
    return false;
}); //end forEach ..
});

  return true;
  }); //end onRun..