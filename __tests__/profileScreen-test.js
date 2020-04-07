import { AsyncStorage } from 'react-native';
import React from 'react';
import profileScreen from '../screens/profileScreen';
import render from 'react-test-render';


test('renders correctly',()=>{

    const hello = render.create(
        <profileScreen />
    );

    //noe the expected output
    
    //expect(snap).toMatchSnapShot();
});