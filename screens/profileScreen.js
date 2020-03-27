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
      
      this.props.navigation.setParams({
        headerLeft: (<TouchableOpacity onPress={this.handelSignOut}>
           <SimpleLineIcons name="logout" size={24} color='white' style={{marginLeft:15}} />
        </TouchableOpacity>)
 })

      console.log("in did profile")
      firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
     
      var userId = firebase.auth().currentUser.uid;
      //this.state.uID=userId;
      this.setState({ uID:userId})
      console.log("user id "+userId)
      //console.log("user id "+uID)
      
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
          name: snapshot.val().name,
          email:email,
          latitude :snapshot.val().latitude,
          longitude:snapshot.val().longitude,
          amount:snapshot.val().amount+" "
        });
        console.log(this.state.amount)
        console.log(JSON.stringify(snapshot))
        console.log("after sate " +this.state.uID+this.state.name+this.state.latitude+this.state.longitude)
      });
       }
      }); 

      }//end view and fetch

    validateEmail = (email) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.email)== false)
        {
        this.setState({emailBorder:'red'})
          }
        else {
          this.setState({emailBorder:'#3E82A7'})
        }
      }
      
    identicalPass = (password) => {
        if (this.state.password != this.state.confPassword){
          this.setState({passError: 'flex'})
         // this.setState({passwordBorder:'red'})
         // this.setState({conPasswordBorder:'red'})
        }
        else {
         this.setState({passError: 'none'})
        }
        
        }
      

    editProfile = () => {

      console.log(this.state.changePassword);

      // if the user left empty fields
      if (this.state.name == '' || this.state.email == '') {
        console.log('missing field');
        this.setState({formErrorMsg: ' يرجى تعبأة جميع الحقول '})
        this.setState({errorMsgVisibilty: 'flex'})
        return;
      }

      //fill error
      if (this.state.emailBorder == 'red'||this.state.passwordBorder == 'red'||this.state.conPasswordBorder=='red'){
        this.setState({formErrorMsg: 'فضًلا، قم بتصحيح  الأخطاء الحمراء'})
        this.setState({errorMsgVisibilty: 'flex'})
        return;
      }

    // if the user wants to change his password  
        //make sure the length is suitable 
      if (this.state.changePassword && this.state.password.length < 6 && this.state.password.length > 0) {
        console.log('short password');
        this.setState({formErrorMsg: 'عفوًا، أدخل كلمة مرور أكثر من ٦ خانات'})
        this.setState({errorMsgVisibilty: 'flex'})
        return;
      }
        // make sure there are confirmation password 
      if (this.state.changePassword && this.state.confPassword=='') {
        console.log('confirm');
        this.setState({formErrorMsg: 'عفوًا أدخل كلمة مرور تأكيدية'})
        this.setState({errorMsgVisibilty: 'flex'})
        return;
      }

        // change the conformation password without the passwor field
    if (this.state.password=='' && this.state.confPassword!='') {
      console.log('confirm');
      this.setState({formErrorMsg: 'عفوًا، أدخل كلمة مرور'})
      this.setState({errorMsgVisibilty: 'flex'})
      return;
    }

      try{

        var user = firebase.auth().currentUser;
        var uid;
       // var userId =  this.props.navigation.getParam('id', 'NO-ID');

        if (user){
          uid = user.uid;
          if (!this.state.changePassword ) {

            if (this.state.email != ''){
              user.updateEmail(this.state.email);
            }

            if (this.state.name != ''){
              firebase
              .database()
              .ref('mgnUsers/'+ this.state.uID)
              .update({name : this.state.name,})
            }

            if (this.state.latitude != 0){
              console.log("latitude in if: " + this.state.latitude,);
              firebase
              .database()
              .ref('mgnUsers/'+ this.state.uID)
              .update({latitude : this.state.latitude,})
            }

            if (this.state.longitude != 0){
              console.log("longitude in if: " + this.state.longitude,);
              firebase
              .database()
              .ref('mgnUsers/'+ this.state.uID)
              .update({longitude : this.state.longitude,})
            }

/*
          if (this.state.name != ''){
            firebase.database()
            .ref('mgnUsers/'+userId)
            .update({name: this.state.name,})
          }*/

          if (this.state.amount != 0){
            firebase.database()
            .ref('mgnUsers/'+this.state.uID)
            .update({amount: this.state.amount})
          }
 
        }else {

          if (this.state.changePassword && this.state.password == this.state.confirmPassword)
          {

            user
            .updatePassword(this.state.password)
            .then((error) => {
            console.log(error);
            // An error happened.
          });
        }
/*
          firebase.database()
          .ref('mgnUsers/'+userId)
          .updatePassword(this.state.password)
          */

          }}
       }catch(e){console.log(e.message)}



        this.setState({emailBorder: '#3E82A7'})
        this.setState({nameBorders: '#3E82A7'})
        this.setState({passwordBorder: '#3E82A7'})
        this.setState({conPasswordBorder: '#3E82A7'})

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

      updateData = (long,lat) => {  
        //(data);
          this.setState({      
            longitude:long,
            latitude:lat,
      
          })
        console.log("udate: " + long +" "+lat);
        console.log("udate: " + this.state.longitude +" "+this.state.latitude);
          // some other stuff
        };
    
    //navigation.navigate('SignIn')

    render() {
        return (
            <View>
                <View style={styles.container}>


                    <ImageBackground source={require('../assets/images/halfBlue.png') } style={{ height:"100%",justifyContent: 'center',alignItems: 'center', marginBottom:400}}>
                        <View style={styles.smallContainer}>

                        <View >

                          <Text style={[styles.warning,styles.fontStyle, {display: this.state.passError}]}> كلمة المرور غير متطابقة </Text>
                        </View>


                        <View >

                          <Text style={[styles.fontStyle,styles.warning, {display: this.state.errorMsgVisibilty}]}> {this.state.formErrorMsg} </Text>
                        </View>


                          
                            <Text style={styles.perInfo}>── المعلومات الشخصية ──</Text>
                                <View style={[styles.inputContainer,{borderColor: this.state.nameBorders}]} >
                                    <TextInput style={styles.inputs}
                                        placeholder="أسم المستخدم"
                                        onChangeText={(text) => {
                                           this.setState({name: text})
                                           this.setState({errorMsgVisibilty:'none'})
                                           }}
                                        keyboardType="TextInput"
                                        autoCapitalize="none"
                                        value={this.state.name}
                                    />
                                </View>
                                <View style={[styles.inputContainer,, {borderColor: this.state.emailBorder}]}>
                                    <TextInput style={styles.inputs}
                                        placeholder="البريد الإلكتروني"
                                        keyboardType="email-address"
                                        underlineColorAndroid='transparent'
                                        value={this.state.email}
                                        onChangeText={(email) => {
                                          this.setState({email})
                                          this.setState({emailBorder: '#3E82A7'})
                                          this.setState({errorMsgVisibilty:'none'}) }
                                      }
                                    />
                                </View>
                                <Text style={styles.perInfo}>── تغيير كلمة المرور  ──</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="كلمة المرور"
                                        secureTextEntry={true}
                                        textContentType="newPassword"
                                        underlineColorAndroid='transparent'
                                        onChangeText={(password) => {
                                          console.log(password);
                                          if (password.length>0){
                                          console.log(this.state.changePassword);
                                          this.setState({changePassword:true})
                                          console.log(this.state.changePassword);
                                          this.setState({password})
                                          console.log(this.state.password);
                                          this.setState({passwordBorder: '#3E82A7'})
                                          console.log(this.state.password);
                                        }
                                        else {
                                          this.setState({changePassword:false})
                                          this.setState({password})
                                          console.log(this.state.password);
                                          console.log('empty!');
                                        }
                                      }
                                        }

                                        onEndEditing={() => {
                                          console.log(this.state.password);
                                        if (this.state.password==''){
                                          this.setState({changePassword:false})
                                          console.log('endEditing');
                                        }
                                      }}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="تأكيد كلمة المرور"
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(confPassword) => {
                                          this.setState({confPassword})
                                          this.setState({conPasswordBorder: '#3E82A7'})
                                          this.setState({passError: 'none'})
                                        } }
                                        onEndEditing={(confPassword) =>{this.identicalPass(confPassword)} }
                                    />
                                </View>
                                <Text style={styles.perInfo}>──── غيرها    ────</Text> 

                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="الحد الائتماني للفاتورة"
                                        keyboardType='numeric'
                                        onChangeText={(text) => { 
                                          this.setState({amount: text}) 
                                          this.setState({errorMsgVisibilty:'none'})}}
                                        underlineColorAndroid='transparent'
                                        value={this.state.amount}
                                    />
                                </View>
                                <TouchableHighlight style={[styles.LocationButtonContainer, styles.AddlocationButton]} 
                                onPress={()=>{this.props.navigation.navigate('location', {id : this.state.uID,
                                                                                      updateData: this.updateData})}}  >
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
                                labelStyle={{ color: 'grey', fontSize: 12 }}
                                borderColor={'#6FA0AF'}
                                sliderOnColor={'#3E82A7'}
                                sliderOffColor={'#3E82A7'}
                                onToggle={(value) => {


                                  this.props.navigation.navigate('Home', {toggleValue: this.state.isActive ? `on` : `off` });
                                }}
                                //onToggleLongPress={() => console.log('toggle long pressed!')}
                                  />

                                </View>

                                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.editProfile} >
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

  //()=>{console.log("login button")}
//()=>{this.handelSignOut}
  headerLeft: navigation.state.params && navigation.state.params.headerLeft
 /* ()=>(
    <TouchableOpacity onPress={()=>{        
      console.log("inside");
    try{
      
     firebase
      .auth()
      .signOut()
      .then(function(){
      console.log(this.state);

      navigation.navigate('WelcomeStackNavigator')
      })
      .catch(error => console.log(error.message))

      }catch(e){console.log(e.message)}}} 
                                  style={{marginLeft:15}}>
      <SimpleLineIcons name="logout" size={24} color='white' />
    </TouchableOpacity>
  ),*/,
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
 
  warning:{
    color: 'red',
    fontSize:12,
    marginBottom:10,
    textAlign:'center'
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
