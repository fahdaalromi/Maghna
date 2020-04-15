/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { combineReducers } from 'redux';
import initialState from './initialState';
import * as firebase from "firebase";
import { Alert } from 'react-native';

async function updateHomeSwitches(state = initialState.homeSwitches, action) {
    switch (action.type) {
      case 'TOGGLE':
        var tempState = JSON.parse(JSON.stringify(state));
        tempState[action.index] = !tempState[action.index];
        tempState[action.index] = await _toggleWithFirebaseUpdate(tempState[action.index],action.index);
        return { ...tempState };
      case 'SET':
        var tempState = JSON.parse(JSON.stringify(state));
        tempState[action.index] = action.value;
        return { ...tempState };
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
    var theId;
    var routineName = routineInfo[toggleIndex].name;
    var user = firebase.auth().currentUser;
    var userRoutineArr = [];
    let returnToggleValue = toggleIndexValue;
    if (toggleIndexValue) {
      await firebase
        .database()
        .ref("/routine")
        .once("value", (snapshot) => {
          let alertDisplay = false;
          snapshot.forEach((item) => {
            var temp = item.val();
            if (temp.userID == user.uid) {
              userRoutineArr.push(temp.name);
              console.log(temp.name);
            } //end if
            if (userRoutineArr.indexOf(routineName) != -1) {
              theId = item.key;
              firebase
                .database()
                .ref("routine/" + theId)
                .update({
                  status: 1,
                });
            } else {
              if(!alertDisplay)
              {
                Alert.alert("عذراً", routineInfo[toggleIndex].alert);
                alertDisplay = true;
                returnToggleValue = false;
              }
            }
          }); //end forEach
        }); //end snapshot..
    } else {
      await firebase
        .database()
        .ref("/routine")
        .once("value", (snapshot) => {
          snapshot.forEach((item) => {
            var temp = item.val();
            if (temp.userID == user.uid) {
              userRoutineArr.push(temp.name);
              console.log(temp.name);
            } //end if
            if (userRoutineArr.indexOf(routineName) != -1) {
              theId = item.key;
              firebase
                .database()
                .ref("routine/" + theId)
                .update({
                  status: 0,
                });
            }
          }); //end forEach
        }); //end snapshot..
    }
    return returnToggleValue;
}

export default combineReducers({
  homeSwitches : updateHomeSwitches
})