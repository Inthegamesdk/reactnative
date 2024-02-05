import React, { useRef, useEffect, useState, useImperativeHandle, useCallback, type ReactElement, useMemo } from 'react';
import {
  UIManager,
  Platform,
  findNodeHandle,
  StyleSheet,
  BackHandler,
  SafeAreaView,
  View,
  useWindowDimensions,
} from 'react-native';
import KeyEvent, { type KeyEventProps } from 'react-native-keyevent';
import type { ViewStyle } from 'react-native';
import { requireNativeComponent } from 'react-native';
import type { NativeSyntheticEvent } from 'react-native';
import {
  NativeFunctions,
  type OverlayCallback,
  type VideoCallback,
  type ITGOverlayInterface,
  type ITGVideoOverlayInterface,
  type ITGOverlayRef,
} from './types';
import type { StyleProp } from 'react-native';



const COMPONENT_NAME = 'ITGOverlay';
const ITGOverlayView = requireNativeComponent(
  COMPONENT_NAME
) as unknown as React.FC<
  ITGOverlayInterface & {
    style: StyleProp<ViewStyle> | undefined;
    ref: React.MutableRefObject<null>;
  }
>;

const _createOverlayCallback = (
  eventName: keyof ITGVideoOverlayInterface,
  props: ITGVideoOverlayInterface,
  internalHandler?: OverlayCallback
) =>
  function <T>(overlay: NativeSyntheticEvent<T>) {
    const callback = props[eventName];
    if (callback && typeof callback === 'function' && overlay)
      callback(overlay.nativeEvent);
    if (internalHandler) internalHandler(overlay);
  };

const _createVideoCallback = (
  eventName: keyof ITGVideoOverlayInterface,
  props?: ITGVideoOverlayInterface,
  internalHandler?: VideoCallback
) =>
  function <T>(payload?: T) {
    const callback = props && props[eventName];
    if (!!callback && typeof callback === 'function' && !!payload)
      callback(payload);
    if (internalHandler) internalHandler(payload);
  };



const _callNativeFunction = (
  overlay: any,
  eventName: string,
  methodArgs?: any
) => {
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

const ITGVideoOverlay = React.forwardRef((props: ITGVideoOverlayInterface, ref:React.ForwardedRef<ITGOverlayRef>) => {
  const $bridge = useRef(null);
  const $video = useRef(null);
  const { width, height } = useWindowDimensions();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16/9)
  const {  videoStyle, containerStyle } = props;
  const [expectedTime, setExpectedTime] = useState(1)
  const {
    children,
    accountId,
    channelSlug,
    secondaryChannelSlug,
    language,
    environment,
    foreignId,
    userName,
    userAvatar,
    videoResolution,
    blockMenu,
    blockNotifications,
    blockSlip,
    blockSidebar,
    injectionDelay,
    onOverlayDidLoadChannelInfo,
    onOverlayRequestedPause,
    currentTime,
    videoPlaybackState,
    videoDuration,
    onOverlayRequestedFullScreen,
  } = props;

  // Overlay Event Callback
  const _callNative = (action: string) => {
    _callNativeFunction($bridge.current, action);
  };
  const _backAction = () =>  {
    _callNative('handleBackPressIfNeeded')
   return true
  }

  // Methods
  const closeMenu = () => _callNative('closeMenu')
  const closeAccount = () => _callNative('closeAccount')
  const closeLeaderboard = () => _callNative('closeLeaderboard')
  const closeShop = () => _callNative('closeShop')
  const closeSidebar = () => _callNative('closeSidebar')
  const closeAll = () =>  _callNative( 'closeAll')
  const openAccount = () => _callNative('openAccount')
  const openLeaderboard = () => _callNative('openLeaderboard')
  const openShop = () => _callNative('openShop')
  const setLiveMode = (enabled: boolean) =>  _callNativeFunction($bridge.current, 'setLiveMode', [enabled])


  useImperativeHandle(ref, () => ({
    closeMenu,
    closeAccount,
    closeLeaderboard,
    closeShop,
    closeSidebar,
    closeAll,
    openAccount,
    openLeaderboard,
    openShop,
    setLiveMode,
  }));

  useEffect(() => {
    if (Platform.OS === 'android') {
      _callNativeFunction($bridge.current, NativeFunctions.setup, [
        findNodeHandle($bridge.current),
        findNodeHandle($video.current),
      ]);
      KeyEvent.onKeyDownListener((keyEvent: KeyEventProps) => {
        _callNativeFunction(
          $bridge.current,
          'receivedKeyEvent',
          keyEvent.keyCode
        );
      });
    } else if (Platform.OS === 'ios') {
      _callNativeFunction($bridge.current, NativeFunctions.setup, [
        findNodeHandle($video.current),
      ]);
    }

    BackHandler.addEventListener('hardwareBackPress', _backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', _backAction);
      KeyEvent.removeKeyDownListener();
    };
  }, []);


  // useEffect(() => {
  //   console.log('here')
  //   _updateOverlayPlayingState()
  // }, [videoPlaybackState, videoDuration])
  

const _updateOverlayPlayingState = ()=> {
  const methodName = videoPlaybackState
    ? NativeFunctions.videoPlaying
    : NativeFunctions.videoPaused;
  if (Platform.OS === 'ios') {
    _callNativeFunction($bridge.current, methodName, Math.round(currentTime));
  } else {
    _callNativeFunction($bridge.current, methodName, [
      currentTime,
      videoDuration,
      aspectRatio,
    ]);
  }
}

  const _onOverlayRequestedPlay = _createOverlayCallback(
    'onOverlayRequestedPlay',
    props,
    () => {
      onOverlayRequestedPause && onOverlayRequestedPause(false)
    }
  );
  const _onOverlayRequestedPause = _createOverlayCallback(
    'onOverlayRequestedPause',
    props,
    () => {
      onOverlayRequestedPause && onOverlayRequestedPause(true)
    }
  );

  const _onOverlayRequestedVideoSeek = _createOverlayCallback(
    'onOverlayRequestedVideoSeek',
    props
  );
  
  const _onOverlayRequestedVideoTime = _createOverlayCallback(
    'onOverlayRequestedVideoTime',
    props,
    () => {
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


  useEffect(() => {

    if(Math.round(currentTime) -  Math.round(expectedTime) > 1 ||  Math.round(expectedTime) -  Math.round(currentTime) > 1) {
      _updateOverlayPlayingState()
    }
    setExpectedTime(currentTime)
  }, [currentTime])
  

  useEffect(() => {
    setIsFullscreen(width > height);
  }, [width, height]);

  
 

  const clonedChild = useMemo(() => {
    return React.cloneElement(children as ReactElement, {
     style: styles.full
    });
  }, [children])
 
 const onLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number, x: number, y: number } } }) => {
      const { width, height } = event.nativeEvent.layout;
      setAspectRatio(width / height)
    },

    [isFullscreen],
    
  )

  useEffect(() => {
    onOverlayRequestedFullScreen && onOverlayRequestedFullScreen(isFullscreen)
  }, [isFullscreen])
  

  return (
    <SafeAreaView style={[styles.container, containerStyle && containerStyle]}>
     <View ref={$video} onLayout={onLayout} style={[isFullscreen ? styles.video : styles.videoMinimal, videoStyle && videoStyle ]}>
      {clonedChild} 
     </View>
      <ITGOverlayView
        style={[isFullscreen ? styles.fullOverlay : Platform.OS === 'android' ? androidStyles.overlay : iosStyles.overlay]}
        accountId={accountId}
        channelSlug={channelSlug}
        secondaryChannelSlug={secondaryChannelSlug}
        language={language}
        environment={environment || 'dev'}
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
        onOverlayDidLoadChannelInfo={(props) => {
          _onOverlayDidLoadChannelInfo(props);
          onOverlayDidLoadChannelInfo && onOverlayDidLoadChannelInfo(props?.nativeEvent?.videoUrl);
        } }
        onOverlayRequestedPause={_onOverlayRequestedPause}
        onOverlayRequestedPlay={_onOverlayRequestedPlay}
        onOverlayRequestedFocus={_onOverlayRequestedFocus}
        onOverlayReleasedFocus={_onOverlayReleasedFocus}
        onOverlayResizeVideoWidth={_onOverlayResizeVideoWidth}
        onOverlayResetVideoWidth={_onOverlayResetVideoWidth}
        onOverlayResizeVideoHeight={_onOverlayResizeVideoHeight}
        onOverlayResetVideoHeight={_onOverlayResetVideoHeight}
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
        onCurrentMenuPage={_onCurrentMenuPage} currentTime={0} videoPlaybackState={false} videoDuration={0}      />
    </SafeAreaView>
  );
});

export default ITGVideoOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
      width: '100%',
      height: '100%',
    flex: 1,
    zIndex: 1,
  },
  videoMinimal: {
    width: '100%',
    aspectRatio: 16/9,
  },
  fullOverlay: {
    zIndex: 2,
    ...StyleSheet.absoluteFillObject,
  },
  full: {width: '100%', height: '100%'}
});

const androidStyles = StyleSheet.create({
  overlay: {
    zIndex: 2,
    ...StyleSheet.absoluteFillObject,
  },
})
const iosStyles = StyleSheet.create({
  overlay: {
    zIndex: 2,
    flex: 1,
  }
})
