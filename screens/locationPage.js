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
 

          </MapView>


     
      </View>
     
   


    </View>
  );
}

locationPage.navigationOptions= {
  title: 'الموقع',
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      //alignItems: 'center',
      justifyContent: 'center',
      height:'100%'
      
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
  
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
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
   
    
  
  });
const navigationConnected =withNavigation(locationPage)
export {navigationConnected as locationPage}
