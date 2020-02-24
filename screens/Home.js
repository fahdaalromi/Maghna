import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>
        test
      </Text>
     
    </ScrollView>
  );
}

HomeScreen.navigationOptions= {
  title: 'الرئيسية',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
