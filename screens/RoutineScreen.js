import React ,{ Component ,useState}  from 'react';
import { ScrollView,
 StyleSheet,
 Text,
 View,
 TextInput,
 Button,
 TouchableHighlight,
 TouchableOpacity,
 Image,
 Alert,
 ImageBackground,
 Platform,
 Modal
} from 'react-native';
import { FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons, Entypo, FontAwesome} from "@expo/vector-icons";
import { Root, Popup } from 'popup-ui'
import { Ionicons} from '@expo/vector-icons';
import * as firebase from 'firebase';



// save button in line 394 

export default class RoutineScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {

          uID:'',
          name:"",
          email: "",
          password: "",
          confPassword: "",
          errorMsg:null,
          latitude:0,
          longitude:0,
          isActive:false,
          amount:0,
          changePassword:false,
    
          passwordBorder:'#3E82A7',
          conPasswordBorder:'#3E82A7',
          emailBorder:'#3E82A7',
        
          formErrorMsg:'',
          errorMsgVisibilty:'none',
          passError:'none',
          errorMsg:null,
          nameBorders:"#3E82A7",

          morning_toggle: false,
          home_exit_toggle: false,
          home_toggle: false,
          evening_toggle: false,

          toggle_button_array: [
              { image: require('../assets/images/222.png'), clicked: false },
              { image: require('../assets/images/222.png'), clicked: false },
              { image: require('../assets/images/222.png'), clicked: false },
              { image: require('../assets/images/222.png'), clicked: false },
              { image: require('../assets/images/222.png'), clicked: false },
              { image: require('../assets/images/222.png'), clicked: false },
              { image: require('../assets/images/222.png'), clicked: false }
          ],
          devices_array: [
              { Text: " التكييف", clicked: false },
              { Text: " آلة القهوة", clicked: false },
              { Text: " باب المنزل", clicked: false },
              { Text: " التلفاز", clicked: false },
              { Text: " البوابة", clicked: false },
              { Text: " الإضاءة", clicked: false },
              { Text: " التكييف", clicked: false }
          ],

          date_picker_display: false,
          hours_array: [],
          minute_array: [],

            morning_toggle: false,
            home_exit_toggle: false,
            home_toggle: false,
            evening_toggle: false,

            toggle_button_array: [
                { image: require('../assets/images/222.png'), clicked: false },
                { image: require('../assets/images/222.png'), clicked: false },
                { image: require('../assets/images/222.png'), clicked: false },
                { image: require('../assets/images/222.png'), clicked: false },
                { image: require('../assets/images/222.png'), clicked: false },
                { image: require('../assets/images/222.png'), clicked: false },
                { image: require('../assets/images/222.png'), clicked: false }
            ],
            devices_array: [
                { Text: " التكييف", clicked: false },
                { Text: " آلة القهوة", clicked: false },
                { Text: " باب المنزل", clicked: false },
                { Text: " التلفاز", clicked: false },
                { Text: " البوابة", clicked: false },
                { Text: " الإضاءة", clicked: false },
                { Text: " التكييف", clicked: false }
            ],

            date_picker_display: false,
            hours_array: [],
            minute_array: [],
           

        }
    }
    
    UNSAFE_componentWillMount(){
    
      const firebaseConfig = {
    
        apiKey: "AIzaSyAAM7t0ls6TRpHDDmHZ4-JWaCLaGWZOokI",
        authDomain: "maghnaapplication.firebaseapp.com",
        databaseURL: "https://maghnaapplication.firebaseio.com",
        projectId: "maghnaapplication",
        storageBucket: "maghnaapplication.appspot.com",
        messagingSenderId: "244460583192",
        appId: "1:244460583192:web:f650fa57532a682962c66d",
      };
    
    
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    
    }
    componentDidMount(){
          
      this.props.navigation.setParams({
        headerLeft: (<TouchableOpacity onPress={this.handelSignOut}>
           <SimpleLineIcons name="logout" size={24} color='white' style={{marginLeft:15}} />
        </TouchableOpacity>)
    })
    }
    
    handelSignOut =() =>{
      var {navigation}=this.props;
      console.log("login method");
      
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
    
        }catch(e){console.log(e.message)}
        
    };
    
  

    UNSAFE_componentWillMount() {
        var hours_array = [];
        var minute_array = [];
        var i;
        for(i = 0; i < 60; i ++) {
            if(i < 10) {
                if( i == 0) {
                    //hours_array.push({value: '0' + i.toString(), clicked: true})
                    minute_array.push({value: '0' + i.toString(), clicked: true})
                } else {
                    hours_array.push({value: '0' + i.toString(), clicked: false})
                    minute_array.push({value: '0' + i.toString(), clicked: false})
                }
                
            } else {
                if(i > 24) {
                    minute_array.push({value: i.toString(), clicked: false})
                } else {
                    hours_array.push({value: i.toString(), clicked: false})
                    minute_array.push({value: i.toString(), clicked: false})
                }
            }
        }
        this.setState({
            minute_array: minute_array,
            hours_array: hours_array,
           
        })
        const firebaseConfig = {
            apiKey: "AIzaSyCsKoPxvbEp7rAol5m-v3nvgF9t8gUDdNc",
            authDomain: "maghnatest.firebaseapp.com",
            databaseURL: "https://maghnatest.firebaseio.com",
            projectId: "maghnatest",
            storageBucket: "maghnatest.appspot.com",
            messagingSenderId: "769071221745",
            appId: "1:769071221745:web:1f0708d203330948655250"
          };
        
        
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    click_togglebutton(index) {
        var toggle_button_array = this.state.toggle_button_array;
        // didn't understand ?
        toggle_button_array[index].clicked = !toggle_button_array[index].clicked;
        this.setState({
            toggle_button_array: toggle_button_array
        })
    }

    release_button_action(index) {
        if(index == 0) {
            this.setState({
                morning_toggle: true,
                home_exit_toggle: false,
                home_toggle: false,
                evening_toggle: false,
            })
        } else if(index == 1) {
            this.setState({
                morning_toggle: false,
                home_exit_toggle: true,
                home_toggle: false,
                evening_toggle: false,
            })
        } else if(index == 2) {
            this.setState({
                morning_toggle: false,
                home_exit_toggle: false,
                home_toggle: true,
                evening_toggle: false,
            })
        } else if(index == 3) {
            this.setState({
                morning_toggle: false,
                home_exit_toggle: false,
                home_toggle: false,
                evening_toggle: true,
            })
        }
    }
    // No need Now ..
    
    /*setActionTable = () =>{
        var action =0;
        var device="";
        var command ="";
      for (i = 1 ;i<=14 ;i++ ){
          switch(i){
              case 1: 
              action=1;
              device="acOn";
              command="Turn On AC";
              firebase.database().ref('action/'+action).set(
                {
                    actionID:action,
                deviceID: device,
                commandStatment: command,
    
                  
                 
                  
                })
              break;
              case 2:
                action=2;
                device="coffeeOn";
                command="Turn On Coffee Machine";
                firebase.database().ref('action/'+action).set(
                  {
                    actionID:action,
                  deviceID: device,
                  commandStatment:command,
      
                    
                   
                    
                  })
                break;
                case 3:
                    action=3;
                    device="doorOpen";
                    command="Open Door";
                    firebase.database().ref('action/'+action).set(
                      {
                    
                      deviceID: device,
                      commandStatment: command,
                      actionID:action,
                        
                       
                        
                      })
                    break;
                    case 4:
                    action=4;
                    device="tvOn";
                    command="Turn On TV";
                    firebase.database().ref('action/'+action).set(
                      {
                        actionID:action,
                      deviceID: device,
                      commandStatment:command,
          
                        
                       
                        
                      })
                    break;
                    case 5:
                        action=5;
                        device="openGarage";
                        command="Open Garage";
                        firebase.database().ref('action/'+action).set(
                          {
                            actionID:action,
                          deviceID: device,
                          commandStatment: command,
              
                            
                           
                            
                          })
                        break;
                        case 6:
                            action=6;
                            device="lightOn";
                            command="Turn On Light";
                            firebase.database().ref('action/'+action).set(
                              {
                                actionID:action,
                              deviceID: device,
                              commandStatment: command,
                  
                                
                               
                                
                              })
                            break;
                            case 7:
                                action=7;
                                device="wifiOn";
                                command="Turn On WiFi";
                                firebase.database().ref('action/'+action).set(
                                  {
                                    actionID:action,
                                  deviceID: device,
                                  commandStatment:command,
                      
                                    
                                   
                                    
                                  })
                                break;
                                 case 8:
                                action=8;
                                device="acOff";
                                command="Turn Off AC";
                                firebase.database().ref('action/'+action).set(
                                  {
                                  actionID:action,
                                  deviceID: device,
                                  commandStatment:command,
                      
                                    
                                   
                                    
                                  })
                                break;
                                 case 9:
                                action=9;
                                device="coffeeOff";
                                 command="Turn Off Coffee Machine";
                                firebase.database().ref('action/'+action).set(
                                  {
                                  actionID:action,
                                  deviceID: device,
                                  commandStatment:command,
                      
                                    
                                   
                                    
                                  })
                                break;
                                   case 10:
                                action=10;
                                device="doorClose";
                               command="Close Door";
                                firebase.database().ref('action/'+action).set(
                                  {
                                  actionID:action,
                                  deviceID: device,
                                  commandStatment:command,
                      
                                    
                                   
                                    
                                  })
                                break;
                                      case 11:
                                action=11;
                              device="tvOff";
                    command="Turn Off TV";
                                firebase.database().ref('action/'+action).set(
                                  {
                                  actionID:action,
                                  deviceID: device,
                                  commandStatment:command,
                      
                                    
                                   
                                    
                                  })
                                break;
                                 case 12:
                                action=12;
                            device="closeGarage";
                        command="close Garage";
                                firebase.database().ref('action/'+action).set(
                                  {
                                  actionID:action,
                                  deviceID: device,
                                  commandStatment:command,
                      
                                    
                                   
                                    
                                  })
                                break;
                                 case 13:
                                action=13;
                              device="lightOff";
                            command="Turn Off Light";
                                firebase.database().ref('action/'+action).set(
                                  {
                                  actionID:action,
                                  deviceID: device,
                                  commandStatment:command,
                      
                                    
                                   
                                    
                                  })
                                break; 
                                case 14:
                                action=14;
                              device="wifiOff";
                                command="Turn Off WiFi";
                                firebase.database().ref('action/'+action).set(
                                  {
                                  actionID:action,
                                  deviceID: device,
                                  commandStatment:command,
                      
                                    
                                   
                                    
                                  })
                                break;
                                

          }//end switch
      }//end loop

    }//end setActionTable */
    save_button_action(index) {
        var flagForRoutine =false;
        var arr =[]
        var i=0;
        //var routineTable =  firebase.database().ref('routine/'); 
      // this.setActionTable();
        var user = firebase.auth().currentUser;
        console.log(user.uid)
        var uId ;
        var routineName ="";
        var routineTime="";
        var actions = [];
        var disRoutine = ""
        var tmp_str = '';
        var i ,j;
        var flag = false
        var flagForRoutine = false
        if(this.state.morning_toggle&&index==0) {
            routineName = "morning routine";
            tmp_str += " الذي يحتوي على الأوامر الآتية:\n";
            disRoutine = "الوضع الصباحي";
            for(i =0;i<this.state.toggle_button_array.length;i++){
                if (this.state.toggle_button_array[i].clicked){
                    actions.push(i+1);

                }
                else {
                    actions.push(i+8);
                }
            }
        }// end if for morning routine
         else if(this.state.home_exit_toggle&&index==1) {
            routineName="leave routine";
            tmp_str += " الذي يحتوي على الأوامر الآتية:\n";
             disRoutine = "وضع الخروج";
             flag = true
             routineTime = "empty"
             // check location
            for(i =0;i<this.state.toggle_button_array.length;i++){
                if (this.state.toggle_button_array[i].clicked){
                    actions.push(i+1);

                }
                else {
                    actions.push(i+8);
                }
            }
        }// end if for leave routine
         else if(this.state.home_toggle&&index==2) {
            routineName="come routine";
            tmp_str += " الذي يحتوي على الأوامر الآتية:\n";
            disRoutine="وضع العودة";
            routineTime = "empty"
            flag =true
            // set If cindition for check location
            for(i =0;i<this.state.toggle_button_array.length;i++){
                if (this.state.toggle_button_array[i].clicked){
                  actions.push(i+1);

                }
                else {
                    actions.push(i+8);
                }
            }
        }//end if for come routine
         else if(this.state.evening_toggle&&index==3) {
            routineName="night routine";
            tmp_str += " الذي يحتوي على الأوامر الآتية:\n";
            disRoutine="الوضع المسائي";
            for(i =0;i<this.state.toggle_button_array.length;i++){
                if (this.state.toggle_button_array[i].clicked){
                    actions.push(i+1);

                }
                else {
                    actions.push(i+8);
                }
            }
        }//end if for night routine
        for(i = 0; i < this.state.toggle_button_array.length; i ++) {
            if(this.state.toggle_button_array[i].clicked) {
                switch(i){
                    case 0 : tmp_str+= "- تشغيل المكيف \n"
                    break;
                    case 1: tmp_str+= "- تشغيل آلة القهوة \n"
                    break;
                    case 2: tmp_str+= "- فتح الباب \n"
                    break;
                    case 3: tmp_str+="- تشغيل التلفاز \n"
                    break;
                    case 4: tmp_str+="- فتح البوابة \n "
                    break;
                    case 5: tmp_str+= "-تشغيل النور \n"
                    break;
                    case 6:  tmp_str+= "- تشغيل الإنترنت \n"
                    break;
                   
                }}
                 
                 else {
                    switch(i){
             case 0 : tmp_str+= "- إطفاء المكيف \n"
             break;
             case 1: tmp_str+= "- إطفاء القهوة \n"
             break;
             case 2: tmp_str+= "- إغلاق الباب \n"
             break;
             case 3: tmp_str+="- إطفاء التلفاز \n"
             break;
             case 4: tmp_str+="- إغلاق البوابة \n "
             break;
             case 5: tmp_str+= "-إطفاء النور \n"
             break;
             case 6:  tmp_str+= "- إطفاء الإنترنت \n"
             break; 
                 }}
              
              
            } // print routine info 
        
        for(i = 0; i < this.state.hours_array.length; i ++) {
            if(!flag&& this.state.hours_array[i].clicked) {
                tmp_str += "الساعة: " + this.state.hours_array[i].value + '\n';
                routineTime = this.state.hours_array[i].value;
                break;
            }
        }
        //test it 
        for(j = 0; j < this.state.minute_array.length; j ++) {
            if(!flag&&this.state.minute_array[j].clicked) {
                tmp_str += "الدقيقة: " + this.state.minute_array[j].value;
                routineTime+= ":"+this.state.minute_array[j].value;
                break;
            }
        }
        
       /* routineTable.once('value').then (snapshot => {
            snapshot.forEach(item => {
            var temp = item.val();
            arr.push(temp);
          return false;
                
       });
    });

    for (i=0 ; i<arr.length;i++){
        if ( arr[i].userID == user.uid && (ar[i].time == routineTime || arr[i].name == routineName)){
            flagForRoutine = true
            console.log("دخلت الميثود")
                Alert.alert("" , "لقد قمت من قبل إنشاء روتين "+disRoutine);
                
                break;

            }
    } */
        // if(user!=null){
        //     uId = user.uid;
        // }
         
         if (!flagForRoutine){
        firebase.database().ref('routine/').push(
            {
              name: routineName,
              time: routineTime,
              actionsID: actions,
              day: ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"],
              userID: user.uid

              
             
              
            })
            
        Alert.alert("تم حفظ نمط "+disRoutine, tmp_str);
        console.log("save routine")
         this.scheduleRoutines(user.uid);}



        if(index == 0) {
            this.setState({
                morning_toggle: false,
            })
        } else if(index == 1) {
            this.setState({
                home_exit_toggle: false,
            })
        } else if(index == 2) {
            this.setState({
                home_toggle: false,
            })
        } else if(index == 3) {
            this.setState({
                home_toggle: false,
            })
        }
        var toggle_button_array = this.state.toggle_button_array;
        for(i = 0; i < toggle_button_array.length; i ++) {
            toggle_button_array[i].clicked = false;
        }
        this.setState({
            toggle_button_array: toggle_button_array
        });

        this.init_hourminute_array()
    }

    select_hour(index) {
        var hours_array = this.state.hours_array;
        for(i = 0; i < hours_array.length; i ++) {
            if(i == index) {
                hours_array[i].clicked = true;
            } else {
                hours_array[i].clicked = false;
            }
        }
        this.setState({
            hours_array: hours_array
        })
    }// end save action..
      
    checkRoutine =  (usId , routineName , routineTime , disRoutine) => {
        var flagForRoutine =false;
        var arr =[]
        var i=0;
        var routineTable =  firebase.database().ref('routine/'); 
        routineTable.once('value').then (snapshot => {
            snapshot.forEach(item => {
            var temp = item.val();
            arr.push(temp);
          
                
       });
    });
    for (i=0 ; i<arr.length;i++){
        if ( arr[i].userID == usId && (ar[i].time == routineTime || arr[i].name == routineName)){
            flagForRoutine = true
            console.log("دخلت الميثود")
                Alert.alert("" , "لقد قمت من قبل إنشاء روتين "+disRoutine);
                
                break;

            }
    }
    return flagForRoutine;
    }
    // try first solution to trigger routine : 
     // 1- setTime method :
     // 2- schedule function using firebase: // buy 
     scheduleRoutines = (userId) =>{
         console.log("get userId" + userId)
         var i,j,routineTime,hour,minute;
       var routineTable= firebase.database().ref('/routine/');
       var routineArr =[];
       var actionArr =[];
       
       console.log("yeees1")
       //console.log(routineTable)
       
       routineTable.once('value').then (snapshot => {
        console.log("yeees2")
        snapshot.forEach(item => {
            var temp = item.val();
            routineArr.push(temp);
            return false;
   });
          
           for(j=0 ; j<routineArr.length ; j++){
               console.log(j)
               if(routineArr[j].userID ==userId){
                   //console.log("true found ID")
                actionArr = routineArr[j].actionsID;
                routineTime= routineArr[j].time;
                hour = routineTime.substring (0,2);
                console.log("Hour : "+hour)
                minute = routineTime.substring(3);
                console.log("Min :"+ minute)
                for (i=0;i<actionArr.length;i++){
                    var allActions =[];
                    // some error here
                    firebase.database().ref('action/').on('value', (snapshot) => {
                        if(snapshot.exists){
                            snapshot.forEach(item => {
                                var temp = item.val();
                                if (temp.actionID == actionArr[i]){
                                //console.log ("temp" + temp.actionID)
                                allActions.push(temp);}
                                return false;
                       });
                        }
                       
                     
                    //  console.log("I printed actions arr")
                      // code for turn on and turn off light only ..
                    // I know that is wrong 
                         for (var z = 0 ; z<allActions.length ; z++){
                      if(allActions[z].commandStatment =="Turn On Light"){

                          // how put the time ?? 
                    //       console.log("It is true found light ")
                    //     exports.scheduledFunctionCrontab = functions.pubsub.schedule('50 3 * * *')
                    //     .timeZone('SaudiArabia') 
                    //     .onRun((context) => {
                    //         Debug.WriteLine("yeees")
                    //         console.log('This will be run every day at 3:50 AM Eastern!');
                    //         Alert.alert("turn On Light");
                    //     return null;
                    //   });
                      }}
                    });//end action snapshot
                   
               }//end loop
               }//end if
           }// end biggest loop
        
     });//end routine snapshot
    }//end schedule function()

    select_minute(index) {
        var minute_array = this.state.minute_array;
        var i;
        for(i = 0; i < minute_array.length; i ++) {
            if(i == index) {
                minute_array[i].clicked = true;
            } else {
                minute_array[i].clicked = false;
            }
        }
        this.setState({
            minute_array: minute_array
        })
    }

    init_hourminute_array() {
        var hours_array = this.state.hours_array;
        for(i = 0; i < hours_array.length; i ++) {
            if(i == 0) {
                hours_array[i].clicked = true;
            } else {
                hours_array[i].clicked = false;
            }
            
        }
        var minute_array = this.state.minute_array;
        for(i = 0; i < minute_array.length; i ++) {
            if(i == 0) {
                minute_array[i].clicked = true;
            } else {
                minute_array[i].clicked = false;
            }
            
        }
        this.setState({
            hours_array: hours_array,
            minute_array: minute_array
        })
    }

    render() {
        return (
        
            <View style={styles.container}>
               

               
                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.date_picker_display}
                    backdropColor = {'#999999'}
                    backdropOpacity = {0.3}
                    onRequestClose={() => {
                        Alert.alert('تم إغلاق النمط');
                    }}>
                    <View style = {{flex: 1, }}>
                        <View style = {{width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, backgroundColor: '#000000', opacity: 0.5, justifyContent: 'center', alignItems: 'center'}}/>
                        <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <View style = {{width: '70%', height: 300, backgroundColor: '#ffffff', borderRadius: 5}}>
                                <View style = {{width: '100%', justifyContent: 'center', marginTop: 15, marginBottom: 15}}>
                                    <Text style = {styles.modalTitle}>{"قم باختيار الوقت المناسب"}</Text>
                                </View>
                                <View style = {{width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style = {{width: '45%', height: '100%'}}>
                                        <View style = {{width: '100%', alignItems: 'center'}}>
                                            <Text style={styles.signUpText}>الساعة</Text>
                                        </View>
                                        <ScrollView style = {{width: '100%'}}>
                                        {
                                            this.state.hours_array.map((item, index) => 
                                            <TouchableOpacity key = {index} style = {{width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: item.clicked ? '#e8e8e8' : null}} onPress = {() => this.select_hour(index)}>
                                                <Text style={styles.signUpText}>{item.value}</Text>
                                            </TouchableOpacity>
                                            )
                                        }
                                        </ScrollView>
                                    </View>
                                    <View style = {{width: '45%', height: '100%'}}>
                                        <View style = {{width: '100%', alignItems: 'center'}}>
                                            <Text style={styles.signUpText}>الدقيقة</Text>
                                        </View>
                                        <ScrollView style = {{width: '100%'}}>
                                        {
                                            this.state.minute_array.map((item, index) => 
                                            <TouchableOpacity key = {index} style = {{width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: item.clicked ? '#e8e8e8' : null}} onPress = {() => this.select_minute(index)}>
                                                <Text style={styles.signUpText}>{item.value}</Text>
                                            </TouchableOpacity>
                                            )
                                        }
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style = {{width: '100%', justifyContent: 'space-around', marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton,styles.timersButton , {color: '#8abbc6', marginTop: 0}]} onPress={() => this.setState({date_picker_display: false})} >
                                        <Text style={styles.signUpText ,{color: '#8abbc6',}}> حفظ </Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton, styles.timersButton ,{marginTop: 0}]} onPress={() => {this.setState({date_picker_display: false}); this.init_hourminute_array()}} >
                                        <Text style={styles.signUpText}> إلغاء </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ImageBackground source={require('../assets/images/halfBlue.png') } style={{ height:"100%",justifyContent: 'center',alignItems: 'center', marginTop:20, }}>
                <ScrollView>
                   <Root>
                    <ScrollView style = {{height:"100%", width: '100%'}}>
                        <View style={styles.smallContainer}>
                            <View style={{flexDirection: 'row' }} > 
                            <Ionicons style={styles.iconsSTY} name="md-sunny" color="#2287ac" size={70} />
                                    <Text style={styles.routineTitle}>
                                    الوضع الصباحي
                                    </Text>
                            </View>
                        {
                            this.state.morning_toggle &&
                            <View style = {{width: '100%', marginTop: 15}}>
                                <ScrollView style = {{width: '100%', height: 80}} horizontal = {true}>
                                {
                                    this.state.toggle_button_array.map((item, index) => 
                                    <TouchableOpacity key = {index} style = {[styles.toggle_button, {marginRight: 5}, item.clicked ? {backgroundColor: '#2287ac'} : {backgroundColor: '#c0c0c0'}]} onPress = {() => this.click_togglebutton(index)}>
                                    {
                                        (index == 0) &&
                                        < Entypo
                                            name="air"
                                            size={40}
                                            color=
                                            {'white'}
                                        />

                                    }
                                    {
                                        (index == 1) &&
                                        <MaterialCommunityIcons
                                            name="coffee-outline"
                                            size={40}
                                            color=
                                            {'white'}
                                        />
                                    }
                                    {
                                        (index == 2) &&
                                        <MaterialCommunityIcons
                                        name="door"
                                        size={40}
                                        color=
                                        {'white'}
                                        />
                                    }
                                    {
                                        (index == 3) &&
                                        <FontAwesome
                                            name="tv"
                                            size={40}
                                            color=
                                            {'white'}
                                            />
                                    }
                                    {
                                        (index == 4) &&
                                        <MaterialCommunityIcons
                                        name="garage"
                                        size={40}
                                        color=
                                        {'white'}
                                        />
                                    }
                                    {
                                        (index == 5) &&
                                        <MaterialCommunityIcons
                                            name="lightbulb-on-outline"
                                            size={40}
                                            color=
                                            {'white'}
                                            />
                                    }
                                    {
                                        (index == 6) &&
                                        < Entypo
                                            name="air"
                                            size={40}
                                            color=
                                            {'white'}
                                        />
                                    }

                                    </TouchableOpacity>
                                    
                                    )
                                }
                            
                                </ScrollView>
                                <View style = {{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.sTButton,{color: '#8abbc6',}]} onPress={() => this.save_button_action(0)} >
                                        <Text style={styles.signUpText,{color: '#8abbc6',}}> حفظ </Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.sTButton]} onPress={() => this.setState({date_picker_display: true})} >
                                        <Text style={styles.signUpText}> المؤقت </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        }
                        {
                            !this.state.morning_toggle &&
                            <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} 
                                onPress={() =>
                                        // Popup.show({
                                        // type: 'Success', 
                                        // title: 'تحرير النمط ',
                                        // button: false,
                                        // textBody: 'will chnage it to a new page ', 
                                        // buttontext: ' ',
                                        // callback: () => Popup.hide()
                                        // })
                                        this.release_button_action(0)
                                    } 
                            >
                                <Text style={styles.signUpText}>  تحرير </Text>
                            </TouchableHighlight>
                        }
                        </View>

                        <View style={styles.smallContainer}  >
                            <View style={{flexDirection: 'row'}}  >  
                            <MaterialCommunityIcons style={styles.iconsSTY} color="#2287ac" name="door-open" size={70} />
                                <Text style={styles.routineTitle} >
                            وضع الخروج
                                </Text>
                            </View>
                        {
                            this.state.home_exit_toggle &&
                            <View style = {{width: '100%', marginTop: 15}}>
                                <ScrollView style = {{width: '100%', height: 80}} horizontal = {true}>
                                {
                                    this.state.toggle_button_array.map((item, index) => 
                                    <TouchableOpacity key = {index} style = {[styles.toggle_button, {marginRight: 5}, item.clicked ? {backgroundColor: '#2287ac'} : {backgroundColor: '#c0c0c0'}]} onPress = {() => this.click_togglebutton(index)}>
                                        {/* <Image style = {{width: '100%', height: '100%', resizeMode: 'contain'}} source = {item.image}></Image> */}
                                        {
                                        (index == 0) &&
                                        < Entypo
                                            name="air"
                                            size={40}
                                            color=
                                            {'white'}
                                        />

                                    }
                                    {
                                        (index == 1) &&
                                        <MaterialCommunityIcons
                                            name="coffee-outline"
                                            size={40}
                                            color=
                                            {'white'}
                                        />
                                    }
                                    {
                                        (index == 2) &&
                                        <MaterialCommunityIcons
                                        name="door"
                                        size={40}
                                        color=
                                        {'white'}
                                        />
                                    }
                                    {
                                        (index == 3) &&
                                        <FontAwesome
                                            name="tv"
                                            size={40}
                                            color=
                                            {'white'}
                                            />
                                    }
                                    {
                                        (index == 4) &&
                                        <MaterialCommunityIcons
                                        name="garage"
                                        size={40}
                                        color=
                                        {'white'}
                                        />
                                    }
                                    {
                                        (index == 5) &&
                                        <MaterialCommunityIcons
                                            name="lightbulb-on-outline"
                                            size={40}
                                            color=
                                            {'white'}
                                            />
                                    }
                                    {
                                        (index == 6) &&
                                        < Entypo
                                            name="air"
                                            size={40}
                                            color=
                                            {'white'}
                                        />
                                    }

                                    </TouchableOpacity>
                                    )
                                }
                                </ScrollView>
                                <View style = {{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.sTButton,{color: '#8abbc6'}]} onPress={() => this.save_button_action(1)} >
                                        <Text style={[styles.signUpText,{color: '#8abbc6',}]}> حفظ </Text>
                                    </TouchableHighlight>
                                    {/* <TouchableHighlight style={[styles.buttonContainer, styles.sTButton]} onPress={() => this.setState({date_picker_display: true})} >
                                        <Text style={styles.signUpText}> المؤقت </Text>
                                    </TouchableHighlight> */}
                                </View>
                            </View>
                        }
                        {
                            !this.state.home_exit_toggle &&
                            <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={()=>{this.release_button_action(1)}}>
                                <Text style={styles.signUpText}>  تحرير </Text>
                            </TouchableHighlight>
                        }
                        </View>

                        <View style={styles.smallContainer}>
                            <View style={{flexDirection: 'row'}} > 
                                <AntDesign name="home" size={70} color="#2287ac" />
                                <Text style={styles.routineTitle}>
                                وضع العودة 
                                </Text>
                            </View>
                        {
                            this.state.home_toggle &&
                            <View style = {{width: '100%', marginTop: 15}}>
                                <ScrollView style = {{width: '100%', height: 80}} horizontal = {true}>
                                {
                                    this.state.toggle_button_array.map((item, index) => 
                                    <TouchableOpacity key = {index} style = {[styles.toggle_button, {marginRight: 5}, item.clicked ? {backgroundColor: '#2287ac'} : {backgroundColor: '#c0c0c0'}]} onPress = {() => this.click_togglebutton(index)}>
                                        {/* <Image style = {{width: '100%', height: '100%', resizeMode: 'contain'}} source = {item.image}></Image> */}
                                        {
                                        (index == 0) &&
                                        < Entypo
                                            name="air"
                                            size={40}
                                            color=
                                            {'white'}
                                        />

                                    }
                                    {
                                        (index == 1) &&
                                        <MaterialCommunityIcons
                                            name="coffee-outline"
                                            size={40}
                                            color=
                                            {'white'}
                                        />
                                    }
                                    {
                                        (index == 2) &&
                                        <MaterialCommunityIcons
                                        name="door"
                                        size={40}
                                        color=
                                        {'white'}
                                        />
                                    }
                                    {
                                        (index == 3) &&
                                        <FontAwesome
                                            name="tv"
                                            size={40}
                                            color=
                                            {'white'}
                                            />
                                    }
                                    {
                                        (index == 4) &&
                                        <MaterialCommunityIcons
                                        name="garage"
                                        size={40}
                                        color=
                                        {'white'}
                                        />
                                    }
                                    {
                                        (index == 5) &&
                                        <MaterialCommunityIcons
                                            name="lightbulb-on-outline"
                                            size={40}
                                            color=
                                            {'white'}
                                            />
                                    }
                                    {
                                        (index == 6) &&
                                        < Entypo
                                            name="air"
                                            size={40}
                                            color=
                                            {'white'}
                                        />
                                    }

                                    </TouchableOpacity>
                                    )
                                }
                                </ScrollView>
                                <View style = {{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.sTButton,{color: '#8abbc6',}]} onPress={() => this.save_button_action(2)} >
                                        <Text style={styles.signUpText,{color: '#8abbc6',}}> حفظ </Text>
                                    </TouchableHighlight>
                                    {/* <TouchableHighlight style={[styles.buttonContainer, styles.sTButton]} onPress={() => this.setState({date_picker_display: true})} >
                                        <Text style={styles.signUpText}> المؤقت </Text>
                                    </TouchableHighlight> */}
                                </View>
                            </View>
                        }
                        
                        {
                            !this.state.home_toggle &&
                            <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} 
                            onPress={() =>
                                    // Popup.show({
                                    // type: 'Success', 
                                    // title: 'تحرير النمط ',
                                    // button: false,
                                    // textBody: 'will chnage it to a new page ', 
                                    // buttontext: ' ',
                                    // callback: () => Popup.hide()
                                    // })
                                    this.release_button_action(2)
                                } >
                                <Text style={styles.signUpText}>  تحرير </Text>
                            </TouchableHighlight>
                        }
                        </View>

                        <View style={styles.smallContainer}>
                            <View style={{flexDirection: 'row'}} > 
                                <MaterialCommunityIcons name="weather-night" size={70} color="#2287ac" style={styles.iconsSTY}  />
                                <Text style={styles.routineTitle}>
                                الوضع المسائي
                                </Text>
                            </View>
                        {
                            this.state.evening_toggle &&
                            <View style = {{width: '100%', marginTop: 15}}>
                                <ScrollView style = {{width: '100%', height: 80}} horizontal = {true}>
                                {
                                    this.state.toggle_button_array.map((item, index) => 
                                    <TouchableOpacity key = {index} style = {[styles.toggle_button, {marginRight: 5}, item.clicked ? {backgroundColor: '#2287ac'} : {backgroundColor: '#c0c0c0'}]} onPress = {() => this.click_togglebutton(index)}>
                                    {/* <Image style = {{width: '100%', height: '100%', resizeMode: 'contain'}} source = {item.image}></Image> */}
                                    {
                                    (index == 0) &&
                                    < Entypo
                                        name="air"
                                        size={40}
                                        color=
                                        {'white'}
                                    />

                                }
                                {
                                    (index == 1) &&
                                    <MaterialCommunityIcons
                                        name="coffee-outline"
                                        size={40}
                                        color=
                                        {'white'}
                                    />
                                }
                                {
                                    (index == 2) &&
                                    <MaterialCommunityIcons
                                    name="door"
                                    size={40}
                                    color=
                                    {'white'}
                                    />
                                }
                                {
                                    (index == 3) &&
                                    <FontAwesome
                                        name="tv"
                                        size={40}
                                        color=
                                        {'white'}
                                        />
                                }
                                {
                                    (index == 4) &&
                                    <MaterialCommunityIcons
                                    name="garage"
                                    size={40}
                                    color=
                                    {'white'}
                                    />
                                }
                                {
                                    (index == 5) &&
                                    <MaterialCommunityIcons
                                        name="lightbulb-on-outline"
                                        size={40}
                                        color=
                                        {'white'}
                                        />
                                }
                                {
                                    (index == 6) &&
                                    < Entypo
                                        name="air"
                                        size={40}
                                        color=
                                        {'white'}
                                    />
                                }

                                </TouchableOpacity>
                                )
                                }
                                </ScrollView>
                                <View style = {{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.sTButton,{color: '#8abbc6',}]} onPress={() => this.save_button_action(3)} >
                                        <Text style={styles.signUpText,{color: '#8abbc6',}}> حفظ </Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={[styles.buttonContainer, styles.sTButton]} onPress={() => this.setState({date_picker_display: true})} >
                                        <Text style={styles.signUpText}> المؤقت </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        }
                        {
                            !this.state.evening_toggle &&
                            <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} 
                                onPress={() =>
                                        // Popup.show({
                                        // type: 'Success', 
                                        // title: 'تحرير النمط ',
                                        // button: false,
                                        // textBody: 'will chnage it to a new page ', 
                                        // buttontext: ' ',
                                        // callback: () => Popup.hide()
                                        // })
                                        this.release_button_action(3)
                                    } >
                                <Text style={styles.signUpText}>  تحرير </Text>
                            </TouchableHighlight>
                        }
                        </View>
                    </ScrollView>
                    </Root>
                    </ScrollView>
                </ImageBackground>
               
            </View>
            
        

        );
    }
}

RoutineScreen.navigationOptions = ({navigation})=> ({

  headerTitle: 'الأنماط الشخصية',
 /* headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#fff"  />
    </TouchableOpacity>

  ),*/

  headerLeft:navigation.state.params && navigation.state.params.headerLeft,

  headerLeft:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('')}} style={{marginLeft:15}}>

      <SimpleLineIcons name="logout" size={24} color="white"  />

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

});



const styles = StyleSheet.create({
  container: {
    
    //flex: 1,
   justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFF',
  },

  backgroundIMG:{
   flex:1,
   width:'100%',
   height:'100%',
 
  },
  routineTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2287ac',
    marginLeft:80,
    marginBottom:20,
    
  },
  iconsSTY:{
    marginLeft:-10,
    //marginTop:20,
 
    
  },
  inputContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderWidth: 1,
      width:250,
      height:35,
      marginBottom:15,
      bottom: 20,
      borderColor: '#EAEAEA'
  },

  smallContainer:{
    margin:20,
   // marginTop:-100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:10,
    width:350,
    // height:140,
     //flexDirection: 'row'
     padding: 20,
     shadowOpacity: 0.1,
     opacity: 0.9,
  },
 
  perInfo:{
    color: '#9F9F9F',
    fontSize: 20,
    bottom: 30,
    marginTop: 20,
    marginBottom:20,
  },

  inputs:{
      //flex:1,
      height:40,
      alignSelf:'flex-end',
      borderColor: '#EAEAEA',
      marginRight:20,
     //marginLeft:-50,
 
  },
 

 icons:{
 // size : 30

 },

 buttonContainer: {
  //height:100,
 marginRight:-100,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
 //marginBottom:30,
  marginTop:-28,
  //width:70,
  borderRadius:20,
 },

  AnalysisButtonContainer:{
    height:45,
    width:70,
 borderWidth:1,
 marginRight:150,
 marginBottom:10,
 backgroundColor:'#3E82A7',
 //backgroundColor: this.sate.active?'#3E82A7':'red',
   //height:45,
   //flexDirection: 'row',
   //justifyContent: 'center',
   //alignItems: 'center',
   //marginBottom:10,
   //width:100,
   borderRadius:20,
  },

  AnalysisButton:{
    height:45,
    width:70,
   backgroundColor:'#BBCCCF',
   alignItems:'center',
   justifyContent:'center',
   borderRadius:20,
   //left:this.state.active ? 50 : 0 
   //marginRight:150,
  },

  signupButton: {

    height:30,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom:10,
   width:70,
   borderRadius:45,
   borderColor:'#BBCCCF',
   borderWidth:1,
   //marginRight:100,
   
    
  },  
  timersButton:{

    marginRight:7,

  },
  sTButton: {

    height:25,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   //marginBottom:10,
   width:70,
   borderRadius:45,
   borderColor:'#BBCCCF',
   borderWidth:1,
   marginTop:20,
   marginLeft:-100,
    
  },

  LocationButtonContainer:{
   height:45,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom:10,
   width:'80%',
   borderRadius:45,
   borderColor:'#BBCCCF',
   borderWidth:1,
  },
 
  AddlocationButton: {
   backgroundColor: "#ffffff",
   margin:7,
 
 },
 
 addLocationText:{
   color: '#BBC3D4',
   fontSize:15,
 },
 
  signUpText: {
    color: '#BBCCCF',
    fontSize:17,
    alignItems: 'center',
  },

  AnalysisText:{
   color: '#BBCCCF',
   marginLeft:150,
   marginBottom:-200,
   marginTop:10,
   
  },

  inline:{
   //flex:1,
   flexDirection:'row',
   justifyContent:'center',
   //marginRight:50,
   //marginLeft:50,
   
  },
  toggle_button: {
      height: '100%',
      aspectRatio: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2287ac',
    
  },
});
