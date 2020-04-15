import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
//import Header from './components/Header';
import STTButton from "./STTButton";
import global from "./global";
import { AsyncStorage } from "react-native";
import NavigationService from "./navigation/NavigationService";
/*
 *  Redux for state management
 */
import { Provider } from "react-redux";
import configureStore from "./redux/createStore";
let store = configureStore();

export default function App(props) {
  const [displayMic, setDisplayMic] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    retrieveLoginStatus();
    console.log("displayMic is:" + displayMic);
  });

  async function retrieveLoginStatus() {
    if (displayMic) {
      return;
    }

    try {
      let display = await AsyncStorage.getItem("loggedIn");

      if (display == "friday") {
        console.log(
          "11- were inside retrieving from asyncStorage and display=" + display
        );
        setDisplayMic(true);
      }
    } catch (e) {
      console.log("error retrieving login status");
    }
  }

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {/* <Header/> */}

          {Platform.OS === "ios" && <StatusBar barStyle="default" />}

          <AppNavigator
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            onNavigationStateChange={(prevState, currentState) => {
              if (
                currentState.routes[currentState.index].routeName ==
                "WelcomeStackNavigator"
              ) {
                setButtonDisplay(false);
              } else {
                setButtonDisplay(true);
              }
            }}
          ></AppNavigator>
          {buttonDisplay && (
            <View
              style={{
                position: "absolute",
                display: "flex",
                zIndex: 1000,
                bottom: 85,
                right: 20,
              }}
            >
              <View style={[styles.buttonContainer]}>
                <STTButton store={store} />
              </View>
            </View>
          )}
        </View>
      </Provider>
    );
  }
}
//await return AsyncStorage.getItem("loggedIn")
async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png"),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 65,
    width: 250,
    //     borderRadius:30,
    //     shadowOpacity: 0.17,
    //     backgroundColor: '#fff',
  },
});