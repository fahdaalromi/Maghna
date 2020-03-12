import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';


export default function reportScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>
        test
      </Text>
     
    </ScrollView>
  );
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
});
