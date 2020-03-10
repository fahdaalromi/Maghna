import React from 'react';
import { Text, View, StyleSheet,StatusBar, ScrollView, SafeAreaView,TouchableHighlight, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';



export default class locationPage extends React.Component {


  render() {

    return (

      <View style={styles.container}>
        <StatusBar barStyle='dark-content'/>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 24.7136,
          longitude: 46.6753,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >


        {this.state.onMap ?
           (
        this.state.onMap.map((u, i ) => {
        return (
          <Marker
          coordinate={{longitude: u.long, latitude: u.lat}}
          title={u.name}
          onCalloutPress={()=>{Linking.openURL('comgooglemaps://?q='+u.lat+','+u.long+'&center='+u.lat+','+u.long+'&zoom=14&views=traffic');}}
          />
        )


        }) )
        :null}


      </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  mapStyle: {
    alignSelf: 'stretch',
    flex:1
  },
});

const navigationConnected =withNavigation(locationPage)
export {navigationConnected as locationPage}
