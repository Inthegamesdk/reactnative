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

import { NavigationContainer } from '@react-navigation/native';

import Video from 'react-native-video';
import KeyEvent from 'react-native-keyevent';
import ITGOverlay from './ITGOverlay.js';

LogBox.ignoreLogs([
  'Trying to load empty source.',
]);
const PlayerScreen = ({ navigation, route }) => {
  const [videoURL, setVideoURL] = useState("");
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
    //get video url if needed
    this.overlay.getVideoURL()

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
    return () => {
      KeyEvent.removeKeyDownListener();
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, []);

  //on this call you should send the overlay the current playback time in seconds
  onOverlayRequestedVideoTime = e => {
    console.log("REQUEST VIDEO TIME NEW" + videoTime.current)
    this.overlay.videoPlaying(videoTime.current * 1000)
  }

  //pause and play the video when asked to
  onOverlayRequestedPlay = e => {
    setVideoPaused(false)
    this.overlay.videoPlaying(videoTime.current * 1000)
    console.log("REQUEST VIDEO PLAY " + videoTime.current)
  }
  onOverlayRequestedPause = e => {
    console.log("VIDEO PAUSE CALLED")
    setVideoPaused(true)
    this.overlay.videoPaused(videoTime.current * 1000)
    console.log("REQUEST VIDEO PAUSE " + videoTime.current)
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
  onDidGetVideoURL = e => {
    console.log("VIDEO URL " + e.url)

    setVideoURL(e.url)
    setTimeout(() => {
      console.log("SYNC VIDEO TIME" + videoTime.current)
      this.overlay.videoPlaying(videoTime.current * 1000)
    }, 2000)
  }

  //handle back button press
  onOverlayBackPressResult = e => {
    if (!e.handled) {
      navigation.goBack()
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
      <Video source={{uri: videoURL}}
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
              accountId={route.params.accountId}
              channelSlug={route.params.channelId}
              environment={route.params.environment}
              language={route.params.language}
              blockSlip={false}
              ref={e => this.overlay = e}
              onOverlayRequestedVideoTime={this.onOverlayRequestedVideoTime}
              onOverlayRequestedPlay={this.onOverlayRequestedPlay}
              onOverlayRequestedPause={this.onOverlayRequestedPause}
              onOverlayRequestedFocus={this.onOverlayRequestedFocus}
              onOverlayReleasedFocus={this.onOverlayReleasedFocus}
              onOverlayDidTapVideo={this.onOverlayDidTapVideo}
              onOverlayDidShowSidebar={this.onOverlayDidShowSidebar}
              onOverlayDidHideSidebar={this.onOverlayDidHideSidebar}
              onOverlayResizeVideoWidth={this.onOverlayResizeVideoWidth}
              onOverlayResetVideoWidth={this.onOverlayResetVideoWidth}
              onOverlayResizeVideoHeight={this.onOverlayResizeVideoHeight}
              onOverlayResetVideoHeight={this.onOverlayResetVideoHeight}
              onOverlayBackPressResult={this.onOverlayBackPressResult}
              onDidGetVideoURL={this.onDidGetVideoURL}/>
    </View>
  );
};

export default PlayerScreen;

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
