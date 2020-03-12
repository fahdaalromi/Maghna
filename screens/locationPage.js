import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';

export default function locationPage() {
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
      }}>

<TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}>
     <Text style={styles.signUpText}>  حفظ </Text>
   </TouchableHighlight>
        </MapView>

    </View>


  </View>
  );
}

locationPage.navigationOptions = ({navigation})=> ({

  headerTint:'#F7FAFF',
  headerTitle: 'routine type',

    
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      justifyContent: 'center',
     // height:'100%'
      
    },
    buttonContainer: {
      // height:100,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
      //marginBottom:10,
       marginTop:30,
       //width:70,
       
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
      height:'100%'
      //flex:1,
      //margin : 70,
    },
    signupButton: {
  
      height:40,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom:10,
     width:70,
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
