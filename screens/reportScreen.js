import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Platform,
    StyleSheet, Text, View, Image, Button, backgroundColor, Alert, border, WIDTH, TouchableHighlight, 
    TouchableOpacity, ScrollView, ImageBackground,
} from 'react-native';
import { FontAwesome,FontAwesome5 ,AntDesign,Feather,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import { MonoText } from '../components/StyledText';
import {LinearGradient} from 'expo-linear-gradient';
import { StackActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';

export default class reportScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    open_profile() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'profile',
            action: NavigationActions.navigate({ routeName: 'profile' }), 
        });
    
        this.props.navigation.dispatch(navigateAction);
    }
    
    render() {
        return (

            <View style={styles.container}>
                <ImageBackground source={require('./otherhalf.png')} style={{ width:'100%' , height:'120%', flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ScrollView style = {{width: '100%', padding: 20}}>
                        <View style = {{width: '100%', alignItems: 'flex-end'}}>
                            <Text style={styles.routineTitle}> إجمالي الإستهلاك </Text>
                        </View>
                        <View style = {{width: '100%', borderRadius: 10, alignItems: 'center', padding: 15, backgroundColor: '#ffffff', marginTop: 10, marginBottom: 10}}>
                            <Text style = {styles.contentText}> إذا كنت تريد تفعيل هذة الخاصية يرجى ملء خانة "الحد الإئتماني للفاتورة" </Text>
                            <TouchableOpacity style = {styles.button_style} onPress = {() => this.open_profile()}>
                                <Text style = {styles.button_text}> أنقر هنا</Text>
                                <Text>dispp then app</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {{width: '100%', alignItems: 'flex-end'}}>
                            <Text style={styles.routineTitle}> تفصيل الإستهلاك </Text>
                        </View>
                        <View style = {{width: '100%', borderRadius: 10, alignItems: 'center', padding: 15, paddingBottom: 0, backgroundColor: '#ffffff', marginTop: 10, marginBottom: 10}}>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#2287ac', '#ffffff']} start = {[0, 0]} end = {[0.8, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ٧٠٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> الإنارة </Text>
                                </View>
                            </View>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#2287ac', '#ffffff']} start = {[0, 0]} end = {[0.4, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ٢٠٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> التلفاز </Text>
                                </View>
                            </View>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#2287ac', '#ffffff']} start = {[0, 0]} end = {[0.1, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ١٠٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> البوابة </Text>
                                </View>
                            </View>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#2287ac', '#ffffff']} start = {[0, 0]} end = {[0.4, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ٥٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> التكييف </Text>
                                </View>
                            </View>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#2287ac', '#ffffff']} start = {[0, 0]} end = {[0.4, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ١٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> باب المنزل </Text>
                                </View>
                            </View>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#2287ac', '#ffffff']} start = {[0, 0]} end = {[0.4, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ٢٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> آلة القهوة </Text>
                                </View>
                            </View>
                            <View style = {styles.component_view}>
                                <View style = {styles.component_bar_view}>
                                    <LinearGradient colors = {['#2287ac', '#ffffff']} start = {[0, 0]} end = {[0.4, 0]} style = {styles.component_bar} />
                                    <Text style = {styles.bar_text}> ٣٥٪ </Text>
                                </View>
                                <View style = {styles.component_text_view}>
                                    <Text style = {styles.contentText}> جهاز الإنترنت </Text>
                                </View>
                            </View>
                        </View>
                        <View style = {{height: 30}}/>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
    
}




reportScreen.navigationOptions = ({navigation})=> ({

  headerTitle:  'الأجهزة المتصلة',
  
  headerRight:()=>(
    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{marginRight:15}}>
      <AntDesign name="right" size={24} color="#CDCCCE" />
    </TouchableOpacity>
  ),
  headerLeft:()=>(



    <TouchableOpacity onPress={()=>{navigation.navigate('')}} style={{marginLeft:15}}>
      <SimpleLineIcons name="logout" size={24} color="#fff" />
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

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7FAFF'
    },
    routineTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2287ac',
    },
    contentText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#2287ac',
    },
    button_style: {
        width: 200,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2287ac',
        marginTop: 20
    },
    button_text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
    component_view: {
       width: '100%',
       marginBottom: 10,
       flexDirection: 'row',
       justifyContent: 'space-around',
       alignItems: 'center'
    },
    component_bar_view: {
        flex: 1, 
        marginRight: 10,
        justifyContent: 'center'
    },
    component_text_view: {
        width: 100, 
        justifyContent: 'flex-end'
    },
    component_bar: {
        width: '100%',
        height: 10,
        borderWidth: 0.5,
        borderColor: '#2287ac'
    },
    bar_text: {
        fontSize: 14,
        textAlign: 'center',
        color: '#2287ac',
    }
});
