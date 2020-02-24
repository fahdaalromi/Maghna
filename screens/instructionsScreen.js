import React from 'react';
const { width, height } = Dimensions.get('window');
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Header, Left, Body, Right, Footer, FooterTab, Button, Icon } from 'native-base';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import {LinearGradient} from 'expo-linear-gradient';

export default function instructionsScreen() {
  
  return (

  <View style={styles.container}>
  
    <ImageBackground source={require('../assets/images/infobackground.png')} style={styles.bg_container}>

<ScrollView
    
    contentContainerStyle={styles.contentContainer}>

      <View style={styles.view}>
        <View style={styles.articleView}>
          <Text style={styles.articleTitle}>تحرير الأنماط</Text>
          <Text style={styles.articleDescription}>
            لتحرير الأنماط يجب عليك:
            قول "تحرير الأنماط الحياتية"
            ثم اختيار نوع النمط
            ومن ثم تحديد الاجهزه
        </Text>
          <Text style={styles.articleFoot}>
            اذا كان النمط صباحي / مسائي يجب عليك تحديد الوقت
            اذا كان خروج/عودة يجب عليك حفظ موقع المنزل
        </Text>
        </View>
        <View style={styles.articleView}>
          <Text style={styles.articleTitle}>عرض التقارير </Text>
          <Text style={styles.articleDescription}>
            لعرض الاجهزه المتصله يجب عليك:
            قول "التقرير"
            يمكنك ايضاً عرضها عن طريق النقر على خانه "التقارير"
        </Text>
        </View>
        <View style={styles.articleView}>
          <Text style={styles.articleTitle}>عرض الاجهزه المتصله </Text>
          <Text style={styles.articleDescription}>
            لعرض  الاجهزه المتصله يجب عليك:
            قول "الاجهزه المتصله"
            يمكنك ايضاً عرضها عن طريق النقر على خانه " الاجهزه المتصله "
        </Text>
        </View>
      </View>
   

  </ScrollView>
  </ImageBackground>
  </View>
  );
}

instructionsScreen.navigationOptions = {
  title: 'التعليمات',
  headarStyle:{
    backgroundColor: 'transport',
  }
    
};



const styles = StyleSheet.create({
  container: {
    
    //flex: 1,
   justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFF',
  },
  contentContainer: {
  },

  header: {
    height: 50,
    ...ifIphoneX({
      marginTop: 50
    }, {
      marginTop: 24
    }),
    justifyContent: 'center',
  },
  headerItem: {
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 75,
  },
  bg_container: {
   height:"100%",
    justifyContent: 'center',
    alignItems: 'center'
  },

  view: {
    width: width,
    height: height,
  },
  articleView: {

    width: 0.9 * width,
    height:0.2*height,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    opacity: 0.9,
    marginTop: 20,
    borderRadius: 30,
    padding: 16,
  },
  articleTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2287ac',
  },
  articleDescription: {
    marginTop:20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#8abbc6',
  },
  articleFoot: {
    fontSize: 14,
    textAlign: 'right',
    color: '#8abbc6',
  },
  icon: {
    width: 30,
    height: 30,
  }
});
