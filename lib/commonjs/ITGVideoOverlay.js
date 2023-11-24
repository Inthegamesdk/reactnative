"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeVideo = _interopRequireDefault(require("react-native-video"));
var _reactNativeKeyevent = _interopRequireDefault(require("react-native-keyevent"));
var _types = require("./types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const COMPONENT_NAME = 'ITGOverlay';
const ITGOverlayView = (0, _reactNative.requireNativeComponent)(COMPONENT_NAME);
const _createOverlayCallback = (eventName, props, internalHandler) => function (overlay) {
  const callback = props[eventName];
  if (callback && typeof callback === 'function' && overlay) callback(overlay.nativeEvent);
  if (internalHandler) internalHandler(overlay);
};
const _createVideoCallback = (eventName, props, internalHandler) => function (payload) {
  const callback = props && props[eventName];
  if (!!callback && typeof callback === 'function' && !!payload) callback(payload);
  if (internalHandler) internalHandler(payload);
};
const _callNativeFunction = (overlay, eventName, methodArgs) => {
  if (methodArgs != null && Array.isArray(methodArgs)) {
    _reactNative.UIManager.dispatchViewManagerCommand((0, _reactNative.findNodeHandle)(overlay), eventName, methodArgs);
  } else if (methodArgs != null) {
    _reactNative.UIManager.dispatchViewManagerCommand((0, _reactNative.findNodeHandle)(overlay), eventName, [methodArgs]);
  } else {
    _reactNative.UIManager.dispatchViewManagerCommand((0, _reactNative.findNodeHandle)(overlay), eventName, []);
  }
};
const ITGVideoOverlay = props => {
  const $bridge = (0, _react.useRef)(null);
  const $video = (0, _react.useRef)(null);
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const [isFullscreen, setIsFullscreen] = (0, _react.useState)(false);
  const [isVideoPlaying, setIsVideoPlaying] = (0, _react.useState)(false);
  const [videoPaused, setVideoPaused] = (0, _react.useState)(false);
  const [currentTime, setCurrentTime] = (0, _react.useState)(0);
  const [videoDuration, setVideoDuration] = (0, _react.useState)(0);
  const {
    source,
    controls,
    resizeMode,
    muted,
    paused,
    videoStyle,
    containerStyle
  } = props;
  const {
    accountId,
    channelSlug,
    secondaryChannelSlug,
    language,
    environment,
    foreignId
  } = props;
  const {
    userName,
    userAvatar,
    videoResolution,
    blockMenu,
    blockNotifications,
    blockSlip,
    blockSidebar,
    injectionDelay
  } = props;

  // Overlay Event Callback
  const _backAction = () => {
    _callNativeFunction($bridge.current, 'handleBackPressIfNeeded');
    return true;
  };
  const _updateOverlayPlayingState = () => {
    let methodName = isVideoPlaying ? _types.NativeFunctions.videoPlaying : _types.NativeFunctions.videoPaused;
    if (_reactNative.Platform.OS === 'ios') {
      _callNativeFunction($bridge.current, methodName, currentTime);
    } else {
      _callNativeFunction($bridge.current, methodName, [currentTime, videoDuration]);
    }
  };
  const _onOverlayRequestedPlay = _createOverlayCallback('onOverlayRequestedPlay', props, () => {
    setVideoPaused(false);
  });
  const _onOverlayRequestedPause = _createOverlayCallback('onOverlayRequestedPause', props, () => {
    setVideoPaused(true);
  });
  const _onOverlayRequestedVideoSeek = _createOverlayCallback('onOverlayRequestedVideoSeek', props);
  const _onOverlayRequestedVideoTime = _createOverlayCallback('onOverlayRequestedVideoTime', props, () => {
    _updateOverlayPlayingState();
  });
  const _onOverlayRequestedVideoResolution = _createOverlayCallback('onOverlayRequestedVideoResolution', props);
  const _onOverlayRequestedFocus = _createOverlayCallback('onOverlayRequestedFocus', props);
  const _onOverlayReleasedFocus = _createOverlayCallback('onOverlayReleasedFocus', props);
  const _onOverlayResizeVideoWidth = _createOverlayCallback('onOverlayResizeVideoWidth', props);
  const _onOverlayResetVideoWidth = _createOverlayCallback('onOverlayResetVideoWidth', props);
  const _onOverlayResizeVideoHeight = _createOverlayCallback('onOverlayResizeVideoHeight', props);
  const _onOverlayResetVideoHeight = _createOverlayCallback('onOverlayResetVideoHeight', props);
  const _onOverlayDidLoadChannelInfo = _createOverlayCallback('onOverlayDidLoadChannelInfo', props);
  const _onOverlayDidPresentContent = _createOverlayCallback('onOverlayDidPresentContent', props);
  const _onOverlayDidEndPresentingContent = _createOverlayCallback('onOverlayDidEndPresentingContent', props);
  const _onOverlayReceivedDeeplink = _createOverlayCallback('onOverlayReceivedDeeplink', props);
  const _onOverlayDidProcessAnalyticEvent = _createOverlayCallback('onOverlayDidProcessAnalyticEvent', props);
  const _onUserState = _createOverlayCallback('onUserState', props);
  const _onCloseInteractionIfNeeded = _createOverlayCallback('onCloseInteractionIfNeeded', props);
  const _onIsDisplayingInteractionResult = _createOverlayCallback('onIsDisplayingInteractionResult', props);
  const _onIsDisplayingSidebar = _createOverlayCallback('onIsDisplayingSidebar', props);
  const _onIsMenuVisible = _createOverlayCallback('onIsMenuVisible', props);
  const _onCurrentContent = _createOverlayCallback('onCurrentContent', props);
  const _onCurrentMenuPage = _createOverlayCallback('onCurrentMenuPage', props);

  //Video Event Callback

  const _onAudioBecomingNoisy = _createVideoCallback('onAudioBecomingNoisy', props);
  const _onBandwidthUpdate = _createVideoCallback('onBandwidthUpdate', props);
  const _onEnd = _createVideoCallback('onEnd', props);
  const _onExternalPlaybackChange = _createVideoCallback('onExternalPlaybackChange', props);
  const _onFullscreenPlayerWillPresent = _createVideoCallback('onFullscreenPlayerWillPresent', props);
  const _onFullscreenPlayerDidPresent = _createVideoCallback('onFullscreenPlayerDidPresent', props);
  const _onFullscreenPlayerWillDismiss = _createVideoCallback('onFullscreenPlayerWillDismiss', props);
  const _onFullscreenPlayerDidDismiss = _createVideoCallback('onFullscreenPlayerDidDismiss', props);
  const _onLoad = _createVideoCallback('onLoad', props, payload => {
    setVideoDuration(payload.duration);
  });
  const _onPlaybackResume = _createVideoCallback('onPlaybackResume', props);
  const _onLoadStart = _createVideoCallback('onLoadStart', props);
  const _onReadyForDisplay = _createVideoCallback('onReadyForDisplay', props);
  const _onPictureInPictureStatusChanged = _createVideoCallback('onPictureInPictureStatusChanged', props);
  const _onPlaybackRateChange = _createVideoCallback('onPlaybackRateChange', props, payload => {
    setIsVideoPlaying(payload.playbackRate === 1);
    _updateOverlayPlayingState();
  });
  const _onProgress = _createVideoCallback('onProgress', props, payload => {
    setCurrentTime(payload.currentTime);
  });
  const _onSeek = _createVideoCallback('onSeek', props, () => {
    if (isVideoPlaying) {
      _updateOverlayPlayingState();
    }
  });
  const _onRestoreUserInterfaceForPictureInPictureStop = _createVideoCallback('onRestoreUserInterfaceForPictureInPictureStop', props);
  const _onTimedMetadata = _createVideoCallback('onTimedMetadata', props);
  (0, _react.useEffect)(() => {
    setIsFullscreen(width > height);
  }, [width, height]);
  (0, _react.useEffect)(() => {
    if (_reactNative.Platform.OS === 'android') {
      _callNativeFunction($bridge.current, _types.NativeFunctions.setup, [(0, _reactNative.findNodeHandle)($bridge.current), (0, _reactNative.findNodeHandle)($video.current)]);
      _reactNativeKeyevent.default.onKeyDownListener(keyEvent => {
        _callNativeFunction($bridge.current, 'receivedKeyEvent', keyEvent.keyCode);
      });
    } else if (_reactNative.Platform.OS === 'ios') {
      _callNativeFunction($bridge.current, _types.NativeFunctions.setup, [(0, _reactNative.findNodeHandle)($bridge.current)]);
    }
    _reactNative.BackHandler.addEventListener('hardwareBackPress', _backAction);
    return () => {
      _reactNative.BackHandler.removeEventListener('hardwareBackPress', _backAction);
      _reactNativeKeyevent.default.removeKeyDownListener();
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
    style: [styles.container, containerStyle && containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeVideo.default, {
    ref: $video,
    style: [isFullscreen ? styles.video : styles.videoMinimal],
    source: source,
    paused: videoPaused || false,
    controls: controls || true,
    muted: muted || false,
    resizeMode: resizeMode || isFullscreen ? 'cover' : 'contain',
    progressUpdateInterval: 1000,
    onEnd: _onEnd,
    onSeek: _onSeek,
    onLoad: _onLoad,
    onPlaybackResume: _onPlaybackResume,
    onProgress: _onProgress,
    onLoadStart: _onLoadStart,
    onTimedMetadata: _onTimedMetadata,
    onReadyForDisplay: _onReadyForDisplay,
    onBandwidthUpdate: _onBandwidthUpdate,
    onPlaybackRateChange: _onPlaybackRateChange,
    onAudioBecomingNoisy: _onAudioBecomingNoisy,
    onExternalPlaybackChange: _onExternalPlaybackChange,
    onFullscreenPlayerWillPresent: _onFullscreenPlayerWillPresent,
    onFullscreenPlayerDidPresent: _onFullscreenPlayerDidPresent,
    onFullscreenPlayerWillDismiss: _onFullscreenPlayerWillDismiss,
    onFullscreenPlayerDidDismiss: _onFullscreenPlayerDidDismiss,
    onPictureInPictureStatusChanged: _onPictureInPictureStatusChanged,
    onRestoreUserInterfaceForPictureInPictureStop: _onRestoreUserInterfaceForPictureInPictureStop
  }), /*#__PURE__*/_react.default.createElement(ITGOverlayView, {
    style: [isFullscreen ? styles.fullOverlay : _reactNative.Platform.OS === 'android' ? androidStyles.overlay : iosStyles.overlay],
    accountId: accountId,
    channelSlug: channelSlug,
    secondaryChannelSlug: secondaryChannelSlug,
    language: language,
    environment: environment || 'dev',
    foreignId: foreignId,
    userName: userName,
    userAvatar: userAvatar,
    videoResolution: videoResolution,
    blockMenu: blockMenu,
    blockNotifications: blockNotifications,
    blockSlip: blockSlip,
    blockSidebar: blockSidebar,
    injectionDelay: injectionDelay,
    ref: $bridge,
    onOverlayRequestedVideoTime: _onOverlayRequestedVideoTime,
    onOverlayRequestedPause: _onOverlayRequestedPause,
    onOverlayRequestedPlay: _onOverlayRequestedPlay,
    onOverlayRequestedFocus: _onOverlayRequestedFocus,
    onOverlayReleasedFocus: _onOverlayReleasedFocus,
    onOverlayResizeVideoWidth: _onOverlayResizeVideoWidth,
    onOverlayResetVideoWidth: _onOverlayResetVideoWidth,
    onOverlayResizeVideoHeight: _onOverlayResizeVideoHeight,
    onOverlayResetVideoHeight: _onOverlayResetVideoHeight,
    onOverlayDidLoadChannelInfo: _onOverlayDidLoadChannelInfo,
    onOverlayRequestedVideoResolution: _onOverlayRequestedVideoResolution,
    onOverlayDidPresentContent: _onOverlayDidPresentContent,
    onOverlayDidEndPresentingContent: _onOverlayDidEndPresentingContent,
    onOverlayReceivedDeeplink: _onOverlayReceivedDeeplink,
    onOverlayRequestedVideoSeek: _onOverlayRequestedVideoSeek,
    onOverlayDidProcessAnalyticEvent: _onOverlayDidProcessAnalyticEvent,
    onUserState: _onUserState,
    onCloseInteractionIfNeeded: _onCloseInteractionIfNeeded,
    onIsDisplayingInteractionResult: _onIsDisplayingInteractionResult,
    onIsDisplayingSidebar: _onIsDisplayingSidebar,
    onIsMenuVisible: _onIsMenuVisible,
    onCurrentContent: _onCurrentContent,
    onCurrentMenuPage: _onCurrentMenuPage
  }));
};
var _default = exports.default = ITGVideoOverlay;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  video: {
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1
  },
  videoMinimal: {
    width: '100%',
    flex: 1
  },
  fullOverlay: {
    zIndex: 2,
    ..._reactNative.StyleSheet.absoluteFillObject
  }
});
const androidStyles = _reactNative.StyleSheet.create({
  overlay: {
    zIndex: 2,
    ..._reactNative.StyleSheet.absoluteFillObject
  }
});
const iosStyles = _reactNative.StyleSheet.create({
  overlay: {
    zIndex: 2,
    flex: 1
  }
});
//# sourceMappingURL=ITGVideoOverlay.js.map