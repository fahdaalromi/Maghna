import React , {Component} from 'react';
import { ScrollView, StyleSheet,Text,View,TouchableHighlight} from 'react-native';
//import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
//import { Marker } from 'react-native-maps';

export default class reportScreen extends React.Component {
  render() {
  return (
    <View style={styles.container}>
    
<Text style={styles.getStartedText} >
  ------------------
</Text>


  </View>
  );
}
}
reportScreen.navigationOptions= {
  title: 'التقارير ',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },


  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },


 

});
