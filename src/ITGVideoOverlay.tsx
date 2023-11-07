import React, { Ref, useRef, useEffect, useState } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  findNodeHandle,
  StyleSheet,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  Text,
  NativeModules,
  useWindowDimensions,
} from 'react-native';
import Video from 'react-native-video';
import { TVEventHandler, useTVEventHandler } from 'react-native';
import KeyEvent from 'react-native-keyevent';
import ITGOverlay from './ITGOverlay';

interface VideoProps {
  videoStyle?: object;

  source: object;
  paused: boolean;
  muted: boolean;
  controls: boolean;
  resizeMode: string;
}

interface VideoCallback {
  (payload: any): void;
}

interface VideoCallbacks {
  onAudioBecomingNoisy: VideoCallback;
  onBandwidthUpdate: VideoCallback;
  onEnd: VideoCallback;
  onExternalPlaybackChange: VideoCallback;
  onFullscreenPlayerWillPresent: VideoCallback;
  onFullscreenPlayerDidPresent: VideoCallback;
  onFullscreenPlayerWillDismiss: VideoCallback;
  onFullscreenPlayerDidDismiss: VideoCallback;
  onLoad: VideoCallback;
  onLoadStart: VideoCallback;
  onReadyForDisplay: VideoCallback;
  onPictureInPictureStatusChanged: VideoCallback;
  onPlaybackRateChange: VideoCallback;
  onProgress: VideoCallback;
  onSeek: VideoCallback;
  onRestoreUserInterfaceForPictureInPictureStop: VideoCallback;
  onTimedMetadata: VideoCallback;
}

type ITGVideoInterface = VideoProps & VideoCallbacks;

interface OverlayProps {
  accountId: string;
  channelSlug: string;
  language: string;
  environment: string;

  secondaryChannelSlug?: string;
  foreignId: string;
  userName: string;
  userAvatar: string;
  videoResolution: string;
  blockMenu: boolean;
  blockNotifications: boolean;
  blockSlip: boolean;
  blockSidebar: boolean;
  injectionDelay: number;
}

interface OverlayCallback {
  (overlay: ITGOverlay): void;
}

interface OverlayCallbacks {
  onOverlayRequestedVideoTime?: OverlayCallback;
  onOverlayRequestedPlay?: OverlayCallback;
  onOverlayRequestedPause?: OverlayCallback;
  onOverlayRequestedFocus?: OverlayCallback;
  onOverlayReleasedFocus?: OverlayCallback;
  onOverlayResizeVideoWidth?: OverlayCallback;
  onOverlayResetVideoWidth?: OverlayCallback;
  onOverlayResizeVideoHeight?: OverlayCallback;
  onOverlayResetVideoHeight?: OverlayCallback;
  onOverlayDidLoadChannelInfo?: OverlayCallback;
  onOverlayRequestedVideoResolution?: OverlayCallback;
  onOverlayDidPresentContent?: OverlayCallback;
  onOverlayDidEndPresentingContent?: OverlayCallback;
  onOverlayReceivedDeeplink?: OverlayCallback;
  onOverlayRequestedVideoSeek?: OverlayCallback;
  onOverlayDidProcessAnalyticEvent?: OverlayCallback;
  onUserState?: OverlayCallback;

  onCloseInteractionIfNeeded?: OverlayCallback;
  onIsDisplayingInteractionResult?: OverlayCallback;
  onIsDisplayingSidebar?: OverlayCallback;
  onIsMenuVisible?: OverlayCallback;
  onCurrentContent?: OverlayCallback;
  onCurrentMenuPage?: OverlayCallback;
}

type ITGOverlayInterface = OverlayProps & OverlayCallbacks;
type ITGVideoOverlayInterface = ITGOverlayInterface & ITGVideoInterface;

const COMPONENT_NAME = 'ITGOverlay';
const ITGOverlayView = requireNativeComponent(COMPONENT_NAME);

const _createOverlayCallback =
  (
    eventName: string,
    props: ITGVideoOverlayInterface,
    internalHandler?: OverlayCallback
  ) =>
  (overlay) => {
    const callback = props[eventName];
    if (callback) callback(overlay.nativeEvent);
    console.log('CALLED BY OVERLAY: ', eventName);
    if (internalHandler) internalHandler(overlay);
  };

const _createVideoCallback =
  (
    eventName: string,
    props: ITGVideoOverlayInterface,
    internalHandler?: VideoCallback
  ) =>
  (payload) => {
    const callback = props[eventName];
    if (callback) callback(payload);
    if (internalHandler) internalHandler(payload);
  };

const _callNativeFunction = (
  overlay: any,
  eventName: string,
  methodArgs?: any
) => {
  console.log('_callNativeFunction: ', eventName, methodArgs);
  if (methodArgs != null && Array.isArray(methodArgs)) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(overlay),
      eventName,
      methodArgs
    );
  } else if (methodArgs != null) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(overlay), eventName, [
      methodArgs,
    ]);
  } else {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(overlay),
      eventName,
      []
    );
  }
};

enum NativeFunctions {
  setup = 'setup',
  openMenu = 'openMenu',
  videoPaused = 'videoPaused',
  videoPlaying = 'videoPlaying',
}

const ITGVideoOverlay = (props: ITGVideoOverlayInterface) => {
  const $bridge = useRef(null);
  const $video = useRef(null);

  const { width, height } = useWindowDimensions();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const { source, paused, controls, resizeMode, muted, videoStyle } = props;
  const {
    accountId,
    channelSlug,
    secondaryChannelSlug,
    language,
    environment,
    foreignId,
  } = props;
  const {
    userName,
    userAvatar,
    videoResolution,
    blockMenu,
    blockNotifications,
    blockSlip,
    blockSidebar,
    injectionDelay,
  } = props;

  //: MARK - Overlay Event Callback
  const _backAction = () => {
    _callNativeFunction($bridge.current, 'handleBackPressIfNeeded');
    return true;
  };

  const _updateOverlayPlayingState = () => {
    let methodName = isVideoPlaying
      ? NativeFunctions.videoPlaying
      : NativeFunctions.videoPaused;
    if (Platform.OS == 'ios') {
      _callNativeFunction($bridge.current, methodName, currentTime);
    } else {
      _callNativeFunction($bridge.current, methodName, [
        currentTime,
        videoDuration,
      ]);
    }
  };

  const _onOverlayRequestedPlay = _createOverlayCallback(
    'onOverlayRequestedPlay',
    props,
    (overlay: ITGOverlay) => {
      setVideoPaused(false);
    }
  );
  const _onOverlayRequestedPause = _createOverlayCallback(
    'onOverlayRequestedPause',
    props,
    (overlay: ITGOverlay) => {
      setVideoPaused(true);
    }
  );

  const _onOverlayRequestedVideoSeek = _createOverlayCallback(
    'onOverlayRequestedVideoSeek',
    props
  );
  const _onOverlayRequestedVideoTime = _createOverlayCallback(
    'onOverlayRequestedVideoTime',
    props,
    (overlay: ITGOverlay) => {
      _updateOverlayPlayingState();
    }
  );

  const _onOverlayRequestedVideoResolution = _createOverlayCallback(
    'onOverlayRequestedVideoResolution',
    props
  );
  const _onOverlayRequestedFocus = _createOverlayCallback(
    'onOverlayRequestedFocus',
    props
  );
  const _onOverlayReleasedFocus = _createOverlayCallback(
    'onOverlayReleasedFocus',
    props
  );

  const _onOverlayResizeVideoWidth = _createOverlayCallback(
    'onOverlayResizeVideoWidth',
    props
  );
  const _onOverlayResetVideoWidth = _createOverlayCallback(
    'onOverlayResetVideoWidth',
    props
  );
  const _onOverlayResizeVideoHeight = _createOverlayCallback(
    'onOverlayResizeVideoHeight',
    props
  );
  const _onOverlayResetVideoHeight = _createOverlayCallback(
    'onOverlayResetVideoHeight',
    props
  );

  const _onOverlayDidLoadChannelInfo = _createOverlayCallback(
    'onOverlayDidLoadChannelInfo',
    props
  );
  const _onOverlayDidPresentContent = _createOverlayCallback(
    'onOverlayDidPresentContent',
    props
  );
  const _onOverlayDidEndPresentingContent = _createOverlayCallback(
    'onOverlayDidEndPresentingContent',
    props
  );

  const _onOverlayReceivedDeeplink = _createOverlayCallback(
    'onOverlayReceivedDeeplink',
    props
  );
  const _onOverlayDidProcessAnalyticEvent = _createOverlayCallback(
    'onOverlayDidProcessAnalyticEvent',
    props
  );

  const _onUserState = _createOverlayCallback('onUserState', props);
  const _onCloseInteractionIfNeeded = _createOverlayCallback(
    'onCloseInteractionIfNeeded',
    props
  );
  const _onIsDisplayingInteractionResult = _createOverlayCallback(
    'onIsDisplayingInteractionResult',
    props
  );
  const _onIsDisplayingSidebar = _createOverlayCallback(
    'onIsDisplayingSidebar',
    props
  );
  const _onIsMenuVisible = _createOverlayCallback('onIsMenuVisible', props);
  const _onCurrentContent = _createOverlayCallback('onCurrentContent', props);
  const _onCurrentMenuPage = _createOverlayCallback('onCurrentMenuPage', props);

  //: MARK - Video Event Callback

  const _onAudioBecomingNoisy = _createVideoCallback(
    'onAudioBecomingNoisy',
    props
  );
  const _onBandwidthUpdate = _createVideoCallback('onBandwidthUpdate', props);
  const _onEnd = _createVideoCallback('onEnd', props);
  const _onExternalPlaybackChange = _createVideoCallback(
    'onExternalPlaybackChange',
    props
  );
  const _onFullscreenPlayerWillPresent = _createVideoCallback(
    'onFullscreenPlayerWillPresent',
    props
  );
  const _onFullscreenPlayerDidPresent = _createVideoCallback(
    'onFullscreenPlayerDidPresent',
    props
  );
  const _onFullscreenPlayerWillDismiss = _createVideoCallback(
    'onFullscreenPlayerWillDismiss',
    props
  );
  const _onFullscreenPlayerDidDismiss = _createVideoCallback(
    'onFullscreenPlayerDidDismiss',
    props
  );
  const _onLoad = _createVideoCallback('onLoad', props, (payload) => {
    setVideoDuration(payload.duration);
  });
  const _onPlaybackResume = _createVideoCallback('onPlaybackResume', props);
  const _onLoadStart = _createVideoCallback('onLoadStart', props);
  const _onReadyForDisplay = _createVideoCallback('onReadyForDisplay', props);
  const _onPictureInPictureStatusChanged = _createVideoCallback(
    'onPictureInPictureStatusChanged',
    props
  );

  const _onPlaybackRateChange = _createVideoCallback(
    'onPlaybackRateChange',
    props,
    (payload) => {
      setIsVideoPlaying(payload.playbackRate == 1);
      _updateOverlayPlayingState();
    }
  );
  const _onProgress = _createVideoCallback('onProgress', props, (payload) => {
    setCurrentTime(payload.currentTime);
  });
  const _onSeek = _createVideoCallback('onSeek', props, (payload) => {
    if (isVideoPlaying) {
      _updateOverlayPlayingState();
    }
  });
  const _onRestoreUserInterfaceForPictureInPictureStop = _createVideoCallback(
    'onRestoreUserInterfaceForPictureInPictureStop',
    props
  );
  const _onTimedMetadata = _createVideoCallback('onTimedMetadata', props);

  useEffect(() => {
    setIsFullscreen(width > height);
  }, [width, height]);

  useEffect(() => {
    console.log('Platform.OS: ', Platform.OS);

    if (Platform.OS == 'android') {
      _callNativeFunction($bridge.current, NativeFunctions.setup, [
        findNodeHandle($bridge.current),
        findNodeHandle($video.current),
      ]);
      KeyEvent.onKeyDownListener((keyEvent) => {
        console.log(keyEvent);
        _callNativeFunction(
          $bridge.current,
          'receivedKeyEvent',
          keyEvent.keyCode
        );
      });
    } else if (Platform.OS == 'ios') {
      _callNativeFunction($bridge.current, NativeFunctions.setup, [
        findNodeHandle($bridge.current),
      ]);
    }

    BackHandler.addEventListener('hardwareBackPress', _backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', _backAction);
    KeyEvent.removeKeyDownListener();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Video
        ref={$video}
        style={isFullscreen ? styles.video : styles.videoMinimal}
        source={source}
        paused={false}
        controls={controls ?? true}
        muted={muted ?? false}
        resizeMode={resizeMode ?? 'contain'}
        progressUpdateInterval={1000}
        onEnd={_onEnd}
        onSeek={_onSeek}
        onLoad={_onLoad}
        onPlaybackResume={_onPlaybackResume}
        onProgress={_onProgress}
        onLoadStart={_onLoadStart}
        onTimedMetadata={_onTimedMetadata}
        onReadyForDisplay={_onReadyForDisplay}
        onBandwidthUpdate={_onBandwidthUpdate}
        onPlaybackRateChange={_onPlaybackRateChange}
        onAudioBecomingNoisy={_onAudioBecomingNoisy}
        onPlaybackStateChange={_onPlaybackRateChange}
        onExternalPlaybackChange={_onExternalPlaybackChange}
        onFullscreenPlayerWillPresent={_onFullscreenPlayerWillPresent}
        onFullscreenPlayerDidPresent={_onFullscreenPlayerDidPresent}
        onFullscreenPlayerWillDismiss={_onFullscreenPlayerWillDismiss}
        onFullscreenPlayerDidDismiss={_onFullscreenPlayerDidDismiss}
        onPictureInPictureStatusChanged={_onPictureInPictureStatusChanged}
        onRestoreUserInterfaceForPictureInPictureStop={_onRestoreUserInterfaceForPictureInPictureStop}
      />

      <ITGOverlayView
        style={styles.overlay}
        accountId={accountId}
        channelSlug={channelSlug}
        secondaryChannelSlug={secondaryChannelSlug}
        language={language}
        environment={environment ?? 'dev'}
        foreignId={foreignId}
        userName={userName}
        userAvatar={userAvatar}
        videoResolution={videoResolution}
        blockMenu={blockMenu}
        blockNotifications={blockNotifications}
        blockSlip={blockSlip}
        blockSidebar={blockSidebar}
        injectionDelay={injectionDelay}
        ref={$bridge}
        onOverlayRequestedVideoTime={_onOverlayRequestedVideoTime}
        onOverlayRequestedPause={_onOverlayRequestedPause}
        onOverlayRequestedPlay={_onOverlayRequestedPlay}
        onOverlayReleasedFocus={_onOverlayReleasedFocus}
        onOverlayResizeVideoWidth={_onOverlayResizeVideoWidth}
        onOverlayResetVideoWidth={_onOverlayResetVideoWidth}
        onOverlayResizeVideoHeight={_onOverlayResizeVideoHeight}
        onOverlayResetVideoHeight={_onOverlayResetVideoHeight}
        onOverlayDidLoadChannelInfo={_onOverlayDidLoadChannelInfo}
        onOverlayRequestedVideoResolution={_onOverlayRequestedVideoResolution}
        onOverlayDidPresentContent={_onOverlayDidPresentContent}
        onOverlayDidEndPresentingContent={_onOverlayDidEndPresentingContent}
        onOverlayReceivedDeeplink={_onOverlayReceivedDeeplink}
        onOverlayRequestedVideoSeek={_onOverlayRequestedVideoSeek}
        onOverlayDidProcessAnalyticEvent={_onOverlayDidProcessAnalyticEvent}
        onUserState={_onUserState}
        onCloseInteractionIfNeeded={_onCloseInteractionIfNeeded}
        onIsDisplayingInteractionResult={_onIsDisplayingInteractionResult}
        onIsDisplayingSidebar={_onIsDisplayingSidebar}
        onIsMenuVisible={_onIsMenuVisible}
        onCurrentContent={_onCurrentContent}
        onCurrentMenuPag={_onCurrentMenuPage}
      />
    </SafeAreaView>
  );
};

export default ITGVideoOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  videoMinimal: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
