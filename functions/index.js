

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

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
             axios.put("http://192.168.1.23/api/EDWNwjvDC-Wg9LYLvx4nNTPBjmMMKuyIB-GWYH1Y/lights/2/state",
             {on:true} )
           .then((res )=> res.json(),
           (res )=> {return res})
           .catch((e)=>{
            console.log();
           })
           console.log("------I turn on-------")
        }
        else if(actionsArr.indexOf("002")!= -1) {
            axios.put("http://192.168.1.23/api/EDWNwjvDC-Wg9LYLvx4nNTPBjmMMKuyIB-GWYH1Y/lights/2/state",
            {on:false} )
          .then(res => res.json())
        }
 } 
  
    return false;
}); //end forEach ..
});

  return true;
  }); //end onRun..
