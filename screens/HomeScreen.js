import React from 'react';
import { ScrollView, StyleSheet,Text ,TouchableOpacity} from 'react-native';
import { FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import { withNavigation } from 'react-navigation';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>
        test
      </Text>
     
    </ScrollView>
  );
}

HomeScreen.navigationOptions = ({navigation})=> ({

  headerTint:'#F7FAFF',
  headerTitle: 'الصفحة الرئيسية',
  headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('HomeScreen')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#CDCCCE" />
    </TouchableOpacity>

  ),
  headerLeft:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('')}} style={{marginLeft:15}}>
      <SimpleLineIcons name="logout" size={24} color="#CDCCCE" />
    </TouchableOpacity>
  ),
    
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const navigationConnected =withNavigation(HomeScreen)
export {navigationConnected as HomeScreen}
