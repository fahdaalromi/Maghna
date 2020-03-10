import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';

export default function locationPage() {
  return (

    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle='dark-content'/>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 24.7136,
          longitude: 46.6753,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/>


     
      </View>
     
    </ScrollView>
  );
}

locationPage.navigationOptions= {
  title: 'الموقع',
};

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },

  mapStyle: {
    alignSelf: 'stretch',
    flex:1
  },

});
const navigationConnected =withNavigation(locationPage)
export {navigationConnected as locationPage}
