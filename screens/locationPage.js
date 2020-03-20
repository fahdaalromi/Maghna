import React, {useState, useEffect,Component} from 'react';
import { ScrollView, StyleSheet,Text,View,TouchableHighlight, Alert,TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import { FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import * as firebase from 'firebase';

  export default class locationPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        username:'',
        userID:'',
        email: '' ,
        password: '',
        errorMessage: null,
        visibilty: 'none',
        emailBorders:'#EAEAEA',
        latitude:0,
        longitude:0,
          
      }
  }
  // we have to put 2 1- for registered people  2- for thr unregisted people
  componentDidMount(){
    console.log("inside");
    firebase
    .auth()
    .onAuthStateChanged((user) => {
    if (user) {
    var userId = firebase.auth().currentUser.uid;
    email= firebase.auth().currentUser.email;
    firebase
    .database()
    .ref('mgnUsers/'+userId)
    .on('value', snapshot => {
    this.setState({
      userID : this.userID,
      latitude :snapshot.val().latitude,
      latitude:snapshot.val().latitude
    });
    console.log(JSON.stringify(snapshot)) });
    }
    }
 
    )
     this.getCurrentPosition()

    }//end componentDidMount
  
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

    getCurrentPosition() {
      console.log("inside");
      navigator.geolocation.getCurrentPosition(
        (position) => {
            var latitude= position.coords.latitude;
            var longitude= position.coords.longitude;
           
            firebase.database().ref('mgnUsers/'+this.state.userId).update({
              latitude: latitude,
              longitude: longitude,
              
           })//end update
           console.log("latitude"+latitude); 
          })
        Alert.alert('تم تحديث موقعك بنجاح');
        this.props.navigation.navigate('profile')
      }
    

  //for saving user location 
  /*
  const [coordinates, setCoordinates] = useState({
    latitude: 24.76989911,
    longitude: 46.66837581,
  });

  setCoordinates({latitude:4567,longitude:45678})
  useEffect(() => {
    
    Alert.alert('hello');
  },[]);
    */
    render() {
  return (

    <View style={styles.container}>

    <View style={styles.container}>

    <MapView

      style={styles.mapStyle}
      initialRegion={{
        latitude: 24.7136,
        longitude: 46.6753,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      followsUserLocation={true}
      showsUserLocation={true}
      >


        </MapView>

    </View>


  </View>
  );
}}

locationPage.navigationOptions = ({navigation})=> ({

 
  headerTint:'#F7FAFF',
  headerTitle: ' الموقع',

  headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('profile')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#CDCCCE" />
    </TouchableOpacity>

  ),
/*
  headerLeft:()=>(
    <TouchableOpacity onPress={this.handelSignOut} style={{marginLeft:15}}>
      <SimpleLineIcons name="logout" size={24} color='white' />
    </TouchableOpacity>
  ),*/
  headerStyle: {
    backgroundColor: '#4b9cb5',
    color:'white'
    
 },
 headerTitleStyle: {
  color: '#fff'
}

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    // height:100,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
    //marginBottom:10,
     marginTop:5,
     //width:70,
     marginLeft:30,
     shadowOpacity: 0.4,
     borderRadius:20,
    },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },


  navigationFilename: {
    marginTop: 5,
  },

  mapStyle: {
    alignSelf: 'stretch',
    height:'100%',
    //flex:1,
    marginTop : -25,
  },
  signupButton: {

    height:40,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom:10,
   width:350,
   borderRadius:45,
   borderColor:'#BBCCCF',
   borderWidth:1,
   backgroundColor: "#3E82A7",
   //paddingBottom:10


  },
  signUpText: {
    color: 'white',
    fontSize:15,
  },

  });




const navigationConnected =withNavigation(locationPage)
export {navigationConnected as locationPage}
