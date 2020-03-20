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
import * as firebase from 'firebase';


export default class profileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {

          username:"",
          email: "",
          password: "",
          confPassword: "",
          errorMsg:null,
            
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
    /*
    componentDidMount(){
    
      //var Uid = "tWRTW1QU6kT8FhpnofVfxaCQcOy2";
     
    //  var userId =  this.props.navigation.getParam(id, 'NO-ID');
    //  var userId = this.props.ID;
      
      console.log(userId);

      if (userId !== 'NO-ID'){

        firebase.database().ref('mgnUsers/').on('value', (snap) => {

          snap.forEach((child) => {

             if (child.val().id === userId){

               this.setState({
                 userKey:child.key,
                 username: child.val().username,
                 });
              }
              })

          });
        }   

      }//end view and fetch
*/


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
       
        try{
          console.log("start logout");
         firebase
          .auth()
          .signOut()
          .then(function(){
          console.log(this.state);
          Alert.alert('تم تسجيل الخروج بنجاح');
        this.props.navigation.navigate('welcome')
    
          })
    
        .catch(error => console.log(error.message))
    
          }catch(e){console.log(e.message)}
    
      };
    
    

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
                                    <TouchableHighlight  style={[styles.AnalysisButton]} >
                                        <Text style={styles.subAnalysisText} > تفعيل </Text>
                                    </TouchableHighlight>
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
profileScreen.navigationOptions = ({navigation})=> ({

  headerTint:'#F7FAFF',
  headerTitle: 'الملف الشخصي',

  /*headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#CDCCCE" />
    </TouchableOpacity>

  ),*/

  headerLeft:()=>(
    <TouchableOpacity onPress={this.handelSignOut} style={{marginLeft:15}}>
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
   width:250,
   borderRadius:30,
   shadowOpacity: 0.17
  },

  AnalysisButtonContainer:{
    height:45,
    width:70,
 //borderWidth:1,
 marginRight:150,
 marginBottom:10,
 //backgroundColor:'#3E82A7',
 //backgroundColor: this.sate.active?'#3E82A7':'red',
   //height:45,
   //flexDirection: 'row',
   //justifyContent: 'center',
   //alignItems: 'center',
   //marginBottom:10,
   //width:100,
   borderRadius:20,
   shadowOpacity: 0.17
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
