/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { combineReducers } from 'redux';
import initialState from './initialState';
import { Alert } from 'react-native';
import firebase from '../constants/FireBase.js';



const updateHomeSwitches = async(state = initialState.homeSwitches, action) => {
    switch (action.type) {
      case 'TOGGLE':
        var tempState = JSON.parse(JSON.stringify(state));
        _toggleWithFirebaseUpdate(tempState[action.index],action.index).then((response) => {
            tempState[action.index] = response;
            return { ...tempState };
        });
      case 'SET':
        var tempState = JSON.parse(JSON.stringify(state));
        tempState[action.index] = action.value;
        return { ...tempState };
      case 'INITIAL':
        return state;
      default:
        return state;
    }
}



const _toggleWithFirebaseUpdate = async (toggleIndexValue,toggleIndex) =>
{

    let routineInfo = {
      toggle1: {
        name: "come routine",
        alert:
          " لم تقم بإنشاء وضع العودة إلى المنزل من قبل ، عليك أولاً إنشاؤه",
      },
      toggle2: {
        name: "leave routine",
        alert: " لم تقم بإنشاء وضع الخروج من المنزل من قبل ، عليك أولاً إنشاؤه",
      },
      toggle3: {
        name: "morning routine",
        alert: " لم تقم بإنشاء الوضع الصباحي من قبل ، عليك أولاً إنشاؤه",
      },
      toggle4: {
        name: "night routine",
        alert: " لم تقم بإنشاء الوضع المسائي من قبل ، عليك أولاً إنشاؤه",
      },
    };

   let request = new Promise((resolve, reject) => {

      let theId;
      let routineName = routineInfo[toggleIndex].name;
      let user = firebase.auth().currentUser;
      let  userRoutineArr =[];
      let alertDisplay = false;
      let returnToggleValue = !toggleIndexValue;
      if (returnToggleValue){
         firebase.database().ref('/routine').once("value",snapshot=>{
            snapshot.forEach(item => {
               let temp = item.val();
               if(temp.userID == user.uid){

                  userRoutineArr.push(temp.name);
                  console.log(temp.name);
               }//end if
               if(userRoutineArr.indexOf(routineName)!= -1){
                  theId = item.key;
                  firebase.database().ref('routine/' + theId).update(  {
                     status: 1,
                  });
                  resolve(returnToggleValue);
               }

            });//end forEach
            if (userRoutineArr.indexOf(routineName)== -1){
               if(!alertDisplay)
               {
                  Alert.alert("عذراً", routineInfo[toggleIndex].alert);
                  alertDisplay = true;
                  resolve(!returnToggleValue);
               }
            }
         }); //end snapshot..

      }
      else {
         firebase.database().ref('/routine').once("value",snapshot=>{
            snapshot.forEach(item => {
               let temp = item.val();
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
               resolve(returnToggleValue);
            });//end forEach
         }); //end snapshot..
      }
   });

   return request;
}

export default combineReducers({
  homeSwitches : updateHomeSwitches
})
