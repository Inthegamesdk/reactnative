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
      this.overlay.openMenu()
    }, 8000);
      setTimeout(function(){
        console.log("OPEN SHOP")
        this.overlay.openShop()
      }, 10000);
        setTimeout(function(){
          console.log("CLOSE SHOP")
          this.overlay.closeShop()
        }, 14000);
  }

  useEffect(() => {
    console.log("COMPONENT START")
    this.overlay.setup()
    showMenuDelayed()
  }, []);


  onOverlayRequestedVideoTime = e => {
    console.log("REQUEST VIDEO TIME")
    // this.overlay.time
  }
  onOverlayRequestedPlay = e => {
  }
  onOverlayRequestedPause = e => {
  }
  onOverlayRequestedFocus = e => {
  }
  onOverlayReleasedFocus = e => {
  }
  onOverlayResizeVideoWidth = e => {
    console.log("RESIZE VIDEO WIDTH " + e.activityWidth.toString())
  }
  onOverlayResetVideoWidth = e => {
    console.log("RESET VIDEO WIDTH")
  }
  onOverlayResizeVideoHeight = e => {
    console.log("RESIZE VIDEO HEIGHT " + e.activityHeight.toString())
  }
  onOverlayResetVideoHeight = e => {
    console.log("RESET VIDEO HEIGHT")
  }

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
              blockSlip={false}
              ref={e => this.overlay = e}
              onOverlayRequestedVideoTime={this.onOverlayRequestedVideoTime}
              onOverlayRequestedPlay={this.onOverlayRequestedPlay}
              onOverlayRequestedPause={this.onOverlayRequestedPause}
              onOverlayRequestedFocus={this.onOverlayRequestedFocus}
              onOverlayReleasedFocus={this.onOverlayReleasedFocus}
              onOverlayResizeVideoWidth={this.onOverlayResizeVideoWidth}
              onOverlayResetVideoWidth={this.onOverlayResetVideoWidth}
              onOverlayResizeVideoHeight={this.onOverlayResizeVideoHeight}
              onOverlayResetVideoHeight={this.onOverlayResetVideoHeight}/>

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
