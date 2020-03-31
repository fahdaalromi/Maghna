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
        }
    }
    
    UNSAFE_componentWillMount(){
    
      const firebaseConfig = {
    
/*
    apiKey: "AIzaSyAAM7t0ls6TRpHDDmHZ4-JWaCLaGWZOokI",
    authDomain: "maghnaapplication.firebaseapp.com",
    databaseURL: "https://maghnaapplication.firebaseio.com",
    projectId: "maghnaapplication",
    storageBucket: "maghnaapplication.appspot.com",
    messagingSenderId: "244460583192",
    appId: "1:244460583192:web:f650fa57532a682962c66d",

*/
apiKey: "AIzaSyBUBKLW6Wrk48NQ_TcgUerucTZFphw6l-c",
authDomain: "maghna-62c55.firebaseapp.com",
databaseURL: "https://maghna-62c55.firebaseio.com",
projectId: "maghna-62c55",
storageBucket: "maghna-62c55.appspot.com",
messagingSenderId: "21464439338",
appId: "1:21464439338:web:8c6bb486fb3673e5d14153",
measurementId: "G-R3BQPCTCTM"
     
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
                if(i > 23) {
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
    }

    click_togglebutton(index) {
        var toggle_button_array = this.state.toggle_button_array;
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

    save_button_action(index) {

        var tmp_str = '';
        if(this.state.morning_toggle) {
            tmp_str += "الوضع الصباحي\n"
        } else if(this.state.home_exit_toggle) {
            tmp_str += "وضع الخروج\n"
        } else if(this.state.home_toggle) {
            tmp_str += "وضع العودة\n"
        } else if(this.state.home_toggle) {
            tmp_str += "الوضع المسائي\n"
        }
        for(i = 0; i < this.state.toggle_button_array.length; i ++) {
            if(this.state.toggle_button_array[i].clicked) {
                tmp_str += i.toString() + " تمت إضافة الجهاز للنمط\n";
            } else {
                tmp_str += i.toString() + " لم تتم إضافة الجهاز للنمط\n";
            }
        }
        for(i = 0; i < this.state.hours_array.length; i ++) {
            if(this.state.hours_array[i].clicked) {
                tmp_str += "الساعة: " + this.state.hours_array[i].value + '\n';
                break;
            }
        }
        for(i = 0; i < this.state.minute_array.length; i ++) {
            if(this.state.minute_array[i].clicked) {
                tmp_str += "الدقيقة: " + this.state.minute_array[i].value;
                break;
            }
        }
        Alert.alert("تم حفظ النمط ", tmp_str);




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
    }

    select_minute(index) {
        var minute_array = this.state.minute_array;
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
                                    <TouchableHighlight style={[styles.buttonContainer, styles.sTButton]} onPress={() => this.setState({date_picker_display: true})} >
                                        <Text style={styles.signUpText}> المؤقت </Text>
                                    </TouchableHighlight>
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
                                    <TouchableHighlight style={[styles.buttonContainer, styles.sTButton]} onPress={() => this.setState({date_picker_display: true})} >
                                        <Text style={styles.signUpText}> المؤقت </Text>
                                    </TouchableHighlight>
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
