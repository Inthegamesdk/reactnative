/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import ReactNative, {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
} from 'react-native';

import Video from 'react-native-video';
import ITGOverlay from './ITGOverlay.js';

import {
  Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const showMenuDelayed=()=>{
    setTimeout(function(){
      console.log("OPEN MENU")
      this.overlay.openLeaderboard()
    }, 10000);
  }

  useEffect(() => {
    console.log("COMPONENT START")
    this.overlay.createFragment()
    showMenuDelayed()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Video source={{uri: "https://media2.inthegame.io/uploads/videos/streamers/278dee276f8d43d11dad3030d0aa449e.a4ef1c02ad73f7b5ed0a6df3809abf12.mp4"}}   // Can be a URL or a local file.
             ref={(ref) => {
               this.player = ref
             }}                                      // Store reference
             onBuffer={this.onBuffer}                // Callback when remote video is buffering
             onError={this.videoError}               // Callback when video cannot be loaded
             style={styles.video}
             resizeMode={"contain"} />

             <ITGOverlay style={styles.overlay}
              accountName={"demos"}
              channelId={"soccer_predictions"}
              environment={"prod"}
              language={"en"}
              ref={e => this.overlay = e}
              blockSlip={false} />

    </SafeAreaView>
  );
};
// <Image source={require('./img/logo_wide.png')} />
// <Button title="START"
//         style={styles.button}
//         color="#FFFFFF"
//         containerStyle={styles.buttonContainer} />

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    width:'100%',
    // height: 100%
  },
  video: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  highlight: {
    fontWeight: '700',
  },
   button: {
     fontSize: 40,
     color: "#FFFFFF",
     width: 220,
     height: 60
    },
  buttonContainer: {
       padding: 4,
       height: 100,
       overflow: 'hidden',
       borderRadius: 4,
       backgroundColor: '#000000',
       marginTop: 12,
       marginBottom: 12,
       borderRadius: 6,
       borderColor: "#AAAAAA",
       borderWidth: 2,
       justifyContent: 'center',
       alignItems: 'center'
    },});
