import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Button, backgroundColor, Alert, border, WIDTH, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import { withNavigation } from 'react-navigation';
import { Ionicons} from '@expo/vector-icons';
import { render } from 'react-dom';

export default class HomeScreen extends Component {
    
    static navigationOptions = ({navigation})=> ({

        headerTint:'#F7FAFF',
        headerTitle: 'الصفحة الرئيسية',
        headerRight:()=>(
          <TouchableOpacity onPress={()=>{navigation.navigate('instructions')}} style={{marginRight:15}}>
            <MaterialCommunityIcons name="settings-outline" size={24} color="#CDCCCE" />
          </TouchableOpacity>
      
        ),
        headerLeft:()=>(
          <TouchableOpacity onPress={()=>{navigation.navigate('')}} style={{marginLeft:15}}>
            <SimpleLineIcons name="logout" size={24} color="#CDCCCE" />
          </TouchableOpacity>
        ),
        headerStyle: {
            backgroundColor: '#8BC4D0',
            color:'white'
            
         },
         headerTitleStyle: {
          color: '#fff'
        }  
    })
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
        
        
    }

    

    _onPress1(){
        const newState = !this.state.toggle1;
        this.setState({toggle1:newState})
    }
    
    
    _onPress2(){
        const newState = !this.state.toggle2;
        this.setState({toggle2:newState})
    }
    
    
    _onPress3(){
        const newState = !this.state.toggle3;
        this.setState({toggle3:newState})
    }
    
    
    _onPress4(){
        const newState = !this.state.toggle4;
        this.setState({toggle4:newState})
    }
    render() {
        const {toggle1}= this.state;
        const {toggle2}= this.state;
        const {toggle3}= this.state;
        const {toggle4}= this.state;
        
        
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor: '#F7FAFF' }}>
                <Text style={{ fontSize:25, color: '#6FA0AF', bottom: -200 , paddingLeft: 180 }}>الأنماط الحياتية</Text>
                <TouchableOpacity
                    onPress={()=>this._onPress1()}
                    style={{ fontSize:25, backgroundColor:toggle1?'white':'#6FA0AF' , color: '#6FA0AF', justifyContent: 'center', width: 150, height: 140, left:80, borderRadius: 25, marginHorizontal: 25, paddingLeft: 28, paddingRight:10, paddingTop: 9, bottom: -250,shadowOpacity: 0.3}}>
                    <Ionicons style={{ left:17, paddingLeft: -40, paddingRight:5, paddingTop: 9, bottom: 90, top: -10}} name="md-home" size={70} color= {toggle1?'#6FA0AF':'white'} />
                    <Text style={{ left:0, paddingLeft: -40, paddingRight:5, bottom: 90, top: -10, color: toggle1?'#6FA0AF':'white' , fontWeight: 'bold', fontSize:13}}>الرجوع إلى المنزل</Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity
                    onPress={()=>this._onPress2()}
                    style={{ fontSize:25, backgroundColor:toggle2?'white':'#6FA0AF' , color: '#6FA0AF', justifyContent: 'center', width: 150, height: 140, left:80, borderRadius: 25, marginHorizontal: 25, paddingLeft: 28, paddingRight:10, paddingTop: 9, bottom: -270,shadowOpacity: 0.3}}>
                    <Ionicons style={{ left:17, paddingLeft: -40, paddingRight:5, paddingTop: 9, bottom: 90, top: -10}} name="md-sunny" size={70} color= {toggle2?'#6FA0AF':'white'} />
                    <Text style={{ left:5, paddingLeft: -40, paddingRight:5, bottom: 90, top: -10, color: toggle2?'#6FA0AF':'white' , fontWeight: 'bold', fontSize:13}}>الوضع الصباحي</Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity
                    onPress={()=>this._onPress3()}
                    style={{ fontSize:25, backgroundColor:toggle3?'white':'#6FA0AF' , color: '#6FA0AF', justifyContent: 'center', width: 150, height: 140, left:-80, borderRadius: 25, marginHorizontal: 25, paddingLeft: 28, paddingRight:10, paddingTop: 9, bottom: -130,shadowOpacity: 0.3}}>
                    <MaterialCommunityIcons style={{ left:17, paddingLeft: -40, paddingRight:5, paddingTop: 9, bottom: 90, top: -10}} name="door-open" size={70} color= {toggle3?'#6FA0AF':'white'} ></MaterialCommunityIcons>
                    <Text style={{ left:0, paddingLeft: -60, paddingRight:5, bottom: 90, top: -10, color: toggle3?'#6FA0AF':'white' , fontWeight: 'bold', fontSize:13}}>الخروج من المنزل</Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity
                    onPress={()=>this._onPress4()}
                    style={{ fontSize:25, backgroundColor:toggle4?'white':'#6FA0AF' , color: '#6FA0AF', justifyContent: 'center', width: 150, height: 140, left:-80, borderRadius: 25, marginHorizontal: 25, paddingLeft: 28, paddingRight:10, paddingTop: 9, bottom: 170,shadowOpacity: 0.3}}>
                    <MaterialCommunityIcons style={{ left:17, paddingLeft: -40, paddingRight:5, paddingTop: 9, bottom: 90, top: -10}} name="weather-night" size={70} color= {toggle4?'#6FA0AF':'white'} ></MaterialCommunityIcons>
                    <Text style={{ left:5, paddingLeft: -40, paddingRight:5, bottom: 90, top: -10, color: toggle4?'#6FA0AF':'white' , fontWeight: 'bold', fontSize:13}}>الوضع المسائي</Text>
                </TouchableOpacity>
                
                
                <Image 
                    style={{ width: 440, height: 360, bottom: -20 }}
                    source={require('./222.png')} />

            </View>
        );
    }
    
}

// HomeScreen.navigationOptions = ({navigation})=> ({

//   headerTint:'#F7FAFF',
//   headerTitle: 'الصفحة الرئيسية',
//   headerRight:()=>(
//     <TouchableOpacity onPress={()=>{navigation.navigate('instructions')}} style={{marginRight:15}}>
//       <MaterialCommunityIcons name="settings-outline" size={24} color="#CDCCCE" />
//     </TouchableOpacity>

//   ),
//   headerLeft:()=>(
//     <TouchableOpacity onPress={()=>{navigation.navigate('')}} style={{marginLeft:15}}>
//       <SimpleLineIcons name="logout" size={24} color="#CDCCCE" />
//     </TouchableOpacity>
//   ),
    
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: 'red',
  alignItems: 'center',
  justifyContent: 'center',
  },
  });
  
// const navigationConnected =withNavigation(HomeScreen)
// export {navigationConnected as HomeScreen}
