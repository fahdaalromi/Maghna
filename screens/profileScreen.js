import React ,{ Component } from 'react';
import { ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';
import FlipToggle from 'react-native-flip-toggle-button';
import * as firebase from 'firebase';


export default class profileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          uID:'',
          username:"",
          email: "",
          password: "",
          confPassword: "",
          errorMsg:null,
          latitude:0,
          longitude:0,
          isActive:false,
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
    //view and fetch updated data
    
    componentDidMount(){
      
      console.log("in did profile")
      firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
     
      var userId = firebase.auth().currentUser.uid;
      this.state.uID=userId;
      console.log("user id "+userId)
      console.log("user id "+uID)
      
      var email = firebase.auth().currentUser.email;
      
      console.log("user email" +email)
      //console.log(JSON.stringify(snapshot))
      firebase
      .database()
      .ref('mgnUsers/'+userId)
      .on('value', snapshot => {
        console.log(" "+ snapshot)
        console.log("before sate")
        this.setState({
          username: snapshot.username,
          latitude :snapshot.latitude,
          longitude:snapshot.longitude
        });
        
        console.log(JSON.stringify(snapshot))
        console.log("after sate " +this.state.userId+this.state.username+this.state.latitude+this.state.longitude)
      });
       }
      }); 

      }//end view and fetch



    editProfile = () => {

      try{

        var userId =  this.props.navigation.getParam('id', 'NO-ID');

        if (this.state.password == '') {
          if (this.state.username != ''){
            firebase.database()
            .ref('mgnUsers/'+userId)
            .update({username: this.state.username,})
          }
 
        }else {
          firebase.database()
          .ref('mgnUsers/'+userId)
          .updatePassword(this.state.password)
          
          }
       }catch(e){console.log(e.message)}


      }

      handelSignOut =() =>{
        console.log("inside");
        try{
          
         firebase
          .auth()
          .signOut()
          .then(function(){
          console.log(this.state);
          
          })
          .catch(error => console.log(error.message))
    
          }catch(e){console.log(e.message)}
      };
    
    //navigation.navigate('SignIn')

    render() {
        return (
            <View>
                <View style={styles.container}>


                    <ImageBackground source={require('../assets/images/halfBlue.png') } style={{ height:"100%",justifyContent: 'center',alignItems: 'center', marginBottom:400}}>
                        <View style={styles.smallContainer}>
                            <Text style={styles.perInfo}>── المعلومات الشخصية ──</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="أسم المستخدم"
                                        onChangeText={(text) => { this.setState({email: text}) }}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={this.state.username}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="البريد الإلكتروني"
                                        keyboardType="email-address"
                                        underlineColorAndroid='transparent'
                                        value={this.state.email}
                                    />
                                </View>
                                <Text style={styles.perInfo}>── تغيير كلمة المرور  ──</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="كلمة المرور"
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="تأكيد كلمة المرور"
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <Text style={styles.perInfo}>──── غيرها    ────</Text> 
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="الحد الائتماني للفاتورة"
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <TouchableHighlight style={[styles.LocationButtonContainer, styles.AddlocationButton]} onPress={()=>{this.props.navigation.navigate('location')}}  >
                                    <Text style={styles.addLocationText}> إضافة موقع</Text>
                                </TouchableHighlight>

                                <View>
                                    <Text style={styles.AnalysisText}>  تحليل التحركات </Text>
                                </View>

                                <View style={styles.AnalysisButtonContainer}>
                              
                                <FlipToggle
                                
                                alignSelf={'flex-end'}
                                value={this.state.isActive}
                                buttonWidth={75}
                                buttonHeight={25}
                                buttonRadius={50}
                                onLabel={'مفتوح'}
                                offLabel={'مغلق '}
                                buttonOnColor={'#9acd32'}
                                buttonOffColor={'#d3d3d3'}
                                labelStyle={{ color: 'grey', fontSize: '12' }}
                                borderColor={'#6FA0AF'}
                                sliderOnColor={'#3E82A7'}
                                sliderOffColor={'#3E82A7'}
                                onToggle={(value) => {
                                this.setState({ isActive: value });}}
                                //onToggleLongPress={() => console.log('toggle long pressed!')}
                                  />

                                </View>

                                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} >
                                    <Text style={styles.signUpText}>  حفظ </Text>
                                </TouchableHighlight>

                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}
profileScreen.navigationOptions = ()=> ({

  headerTint:'#F7FAFF',
  headerTitle: 'الملف الشخصي',

  /*headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#CDCCCE" />
    </TouchableOpacity>

  ),*/

  headerLeft:()=>(
    <TouchableOpacity onPress={()=>{this.handelSignOut}} style={{marginLeft:15}}>
      <SimpleLineIcons name="logout" size={24} color='white' />
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

 
  header:{
    marginTop:150,
    marginLeft:130,
    color: 'white',
    fontSize:25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },

  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },

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

  inputContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderWidth: 1,
      width:250,
      height:35,
      marginBottom:15,
      bottom: 20,
      borderColor: '#3E82A7',
      shadowOpacity: 0.1
  },

  smallContainer:{
    margin:70,
    //marginTop:-160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:10,
      width:300,
      height:650,
      shadowOpacity: 0.1,
      opacity: 0.9,
  },
 
  perInfo:{
    color: '#3E82A7',
    fontSize: 20,
    bottom: 20,
    marginTop: 20,
    marginBottom:20,
  },

  inputs:{
      //flex:1,
      height:40,
      alignSelf:'flex-end',
      borderColor: '#3E82A7',
      marginRight:20,
     //marginLeft:-50,
 
  },
 

 
  buttonContainer: {
   height:45,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom:10,
   marginTop:20,
   width:250,
   borderRadius:30,
   shadowOpacity: 0.17
  },

  AnalysisButtonContainer:{
    
   // height:45,
   // width:70,
 //borderWidth:1,
 //marginRight:500,
 //marginBottom:100,
 //backgroundColor:'#3E82A7',
 //backgroundColor: this.sate.active?'#3E82A7':'red',
   //height:45,
   //flexDirection: 'row',
   //justifyContent: 'center',
   //alignItems: 'center',
   marginBottom:5,
   marginTop:10,
   marginRight:150,
   //width:100,
  // borderRadius:20,
   //shadowOpacity: 0.17
  },

  AnalysisButton:{
    height:45,
    width:70,
   backgroundColor:'#6FA0AF',
   alignItems:'center',
   justifyContent:'center',
   borderRadius:20,
   //left:this.state.active ? 50 : 0 
   //marginRight:150,
  },

  signupButton: {
   backgroundColor: "#3E82A7",
    
  },

  LocationButtonContainer:{
  
   height:45,
   //flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop:10,
   width:'85%',
   borderRadius:45,
   borderColor:'#6FA0AF',
   borderWidth:1,
   shadowOpacity: 0.14,
   height:35,
  },
 
  AddlocationButton: {
   backgroundColor: "#ffffff",
   marginTop:-20,
   marginBottom:20,
 
 },
 
 addLocationText:{
   color: '#6FA0AF',
   fontSize:15,
 },
 
  signUpText: {
    color: 'white',
    fontSize:15,
  },

  AnalysisText:{
   color: '#6FA0AF',
   marginLeft:150,
   marginBottom:-200,
   marginTop:10,
   
  },
  subAnalysisText:{
    color: 'white',
    //fontSize:15,
  },

  inline:{
   //flex:1,
   flexDirection:'row',
   justifyContent:'center',
   //marginRight:50,
   //marginLeft:50,
   
   
  },

});
