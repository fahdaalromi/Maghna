import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';


export default function RoutineScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>
        test
      </Text>
     
    </ScrollView>
  );
}

RoutineScreen.navigationOptions= {
  title: 'الأنماط الشخصية',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
