/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import type {Node} from 'react';
import ReactNative, {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  BackHandler,
  TVEventControl,
  LogBox,
} from 'react-native';

import Video from 'react-native-video';
import KeyEvent from 'react-native-keyevent';
import ITGOverlay from './ITGOverlay.js';

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])

const App: () => Node = () => {
  const [videoPaused, setVideoPaused] = useState(false);
  const videoTime = useRef(0.0)

  //back button action
  const backAction = () => {
    this.overlay.handleBackPressIfNeeded()
    return true;
  };

  useEffect(() => {
    //important - loads ITG overlay
    this.overlay.setup()

    //to handle the menu key in tvOS
    TVEventControl.enableTVMenuKey();

    //passing key events for android - required if using predictions
    if (Platform.OS == "android") {
      KeyEvent.onKeyDownListener((keyEvent) => {
        this.overlay.receivedKeyEvent(keyEvent.keyCode)
      });
    };

    //handling the back button events
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      KeyEvent.removeKeyDownListener();
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  //on this call you should send the overlay the current playback time in seconds
  onOverlayRequestedVideoTime = e => {
    console.log("REQUEST VIDEO TIME")
    this.overlay.videoPlaying(videoTime.current * 1000)
  }

  //pause and play the video when asked to
  onOverlayRequestedPlay = e => {
    setVideoPaused(false)
    this.overlay.videoPlaying(videoTime.current * 1000)
  }
  onOverlayRequestedPause = e => {
    setVideoPaused(true)
    this.overlay.videoPaused(videoTime.current * 1000)
  }
  onOverlayRequestedSeekTo = e => {
    this.player.seek(e.timestampMillis / 1000.0);
  }
  onOverlayRequestedFocus = e => {}
  onOverlayReleasedFocus = e => {}

  //optional - resize video if needed when ITG content appears
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

  //handle back button press
  onOverlayBackPressResult = e => {
    if (!e.handled) {
      BackHandler.exitApp()
    }
  }

  onSeek = e => {
    console.log("VIDEO SEEK " + e.currentTime);
    this.overlay.videoPlaying(e.currentTime * 1000)
  }

  onProgress = e => {
    videoTime.current = e.currentTime
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Video source={{uri: "https://media.inthegame.io/uploads/dev/testing/videos/DolbyAtmosdemos4kHDR(GoodfortestingTVormobileHDRSupporteddevices).mp4"}}   // Can be a URL or a local file.
             ref={(ref) => { this.player = ref }}
             onBuffer={this.onBuffer}
             onError={this.videoError}
             onSeek={this.onSeek}
             onProgress={this.onProgress}
             progressUpdateInterval={50.0}
             style={styles.video}
             paused={videoPaused}
             controls={false}
             resizeMode={"contain"} />

      <ITGOverlay style={styles.overlay}
              accountId={"64100c941dca8096fc0df832"}
              channelSlug={"dudeplusdemo"}
              environment={"v2-1"}
              language={"en"}
              blockSlip={false}
              ref={e => this.overlay = e}
              onOverlayRequestedVideoTime={this.onOverlayRequestedVideoTime}
              onOverlayRequestedPlay={this.onOverlayRequestedPlay}
              onOverlayRequestedPause={this.onOverlayRequestedPause}
              onOverlayRequestedSeekTo={this.onOverlayRequestedSeekTo}
              onOverlayRequestedFocus={this.onOverlayRequestedFocus}
              onOverlayReleasedFocus={this.onOverlayReleasedFocus}
              onOverlayDidTapVideo={this.onOverlayDidTapVideo}
              onOverlayDidShowSidebar={this.onOverlayDidShowSidebar}
              onOverlayDidHideSidebar={this.onOverlayDidHideSidebar}
              onOverlayResizeVideoWidth={this.onOverlayResizeVideoWidth}
              onOverlayResetVideoWidth={this.onOverlayResetVideoWidth}
              onOverlayResizeVideoHeight={this.onOverlayResizeVideoHeight}
              onOverlayResetVideoHeight={this.onOverlayResetVideoHeight}
              onOverlayBackPressResult={this.onOverlayBackPressResult}/>

    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    width:'100%',
  },
  video: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  });
