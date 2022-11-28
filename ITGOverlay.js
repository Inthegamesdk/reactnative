import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  StyleSheet,
} from 'react-native';

const COMPONENT_NAME = "ITGOverlay";
const ITGOverlayView = requireNativeComponent(COMPONENT_NAME);

export default class ITGOverlay extends Component {
  static propTypes = {
    accountId: PropTypes.string,
    channelSlug: PropTypes.string,
    language: PropTypes.string,
    environment: PropTypes.string,
    foreignId: PropTypes.string,
    userName: PropTypes.string,
    blockMenu: PropTypes.bool,
    blockNotifications: PropTypes.bool,
    blockSlip: PropTypes.bool,
    blockSidebar: PropTypes.bool,
    injectionDelay: PropTypes.number,
    onOverlayRequestedVideoTime: PropTypes.func,
    onOverlayRequestedPause: PropTypes.func,
    onOverlayRequestedPlay: PropTypes.func,
    onOverlayRequestedSeekTo: PropTypes.func,
    onOverlayRequestedFocus: PropTypes.func,
    onOverlayReleasedFocus: PropTypes.func,
    onOverlayDidTapVideo: PropTypes.func,
    onOverlayDidShowSidebar: PropTypes.func,
    onOverlayDidHideSidebar: PropTypes.func,
    onOverlayResizeVideoWidth: PropTypes.func,
    onOverlayResetVideoWidth: PropTypes.func,
    onOverlayResizeVideoHeight: PropTypes.func,
    onOverlayResetVideoHeight: PropTypes.func,
    onOverlayBackPressResult: PropTypes.func,
    onDidGetVideoURL: PropTypes.func
  };

  _onOverlayRequestedVideoTime = event => {
    if (this.props.onOverlayRequestedVideoTime) {
      this.props.onOverlayRequestedVideoTime(event.nativeEvent);
    }
  };
  _onOverlayRequestedPause = event => {
    if (this.props.onOverlayRequestedPause) {
      this.props.onOverlayRequestedPause(event.nativeEvent);
    }
  };
  _onOverlayRequestedPlay = event => {
    if (this.props.onOverlayRequestedPlay) {
      this.props.onOverlayRequestedPlay(event.nativeEvent);
    }
  };
  _onOverlayRequestedSeekTo = event => {
    if (this.props.onOverlayRequestedSeekTo) {
      this.props.onOverlayRequestedSeekTo(event.nativeEvent);
    }
  };
  _onOverlayRequestedFocus = event => {
    if (this.props.onOverlayRequestedFocus) {
      this.props.onOverlayRequestedFocus(event.nativeEvent);
    }
  };
  _onOverlayReleasedFocus = event => {
    if (this.props.onOverlayReleasedFocus) {
      this.props.onOverlayReleasedFocus(event.nativeEvent);
    }
  };
  _onOverlayDidTapVideo = event => {
    if (this.props.onOverlayDidTapVideo) {
      this.props.onOverlayDidTapVideo(event.nativeEvent);
    }
  };
  _onOverlayDidShowSidebar = event => {
    if (this.props.onOverlayDidShowSidebar) {
      this.props.onOverlayDidShowSidebar(event.nativeEvent);
    }
  };
  _onOverlayDidHideSidebar = event => {
    if (this.props.onOverlayDidHideSidebar) {
      this.props.onOverlayDidHideSidebar(event.nativeEvent);
    }
  };
  _onOverlayResizeVideoWidth = event => {
    if (this.props.onOverlayResizeVideoWidth) {
      this.props.onOverlayResizeVideoWidth(event.nativeEvent);
    }
  };
  _onOverlayResetVideoWidth = event => {
    if (this.props.onOverlayResetVideoWidth) {
      this.props.onOverlayResetVideoWidth(event.nativeEvent);
    }
  };
  _onOverlayResizeVideoHeight = event => {
    if (this.props.onOverlayResizeVideoHeight) {
      this.props.onOverlayResizeVideoHeight(event.nativeEvent);
    }
  };
  _onOverlayResetVideoHeight = event => {
    if (this.props.onOverlayResetVideoHeight) {
      this.props.onOverlayResetVideoHeight(event.nativeEvent);
    }
  };
  _onOverlayBackPressResult = event => {
    if (this.props.onOverlayBackPressResult) {
      this.props.onOverlayBackPressResult(event.nativeEvent);
    }
  };
  _onDidGetVideoURL = event => {
    if (this.props.onDidGetVideoURL) {
      this.props.onDidGetVideoURL(event.nativeEvent);
    }
  };


  render() {
    const { accountId, channelSlug, language, environment, foreignId, userName, blockSlip, blockMenu, blockSidebar, blockNotifications, injectionDelay, style } = this.props;
    return (
      <ITGOverlayView
      style={itgStyles.overlay}
      accountId={accountId}
      channelSlug={channelSlug}
      language={language}
      environment={environment}
      foreignId={foreignId}
      userName={userName}
      blockSlip={blockSlip}
      blockMenu={blockMenu}
      blockSidebar={blockSidebar}
      blockNotifications={blockNotifications}
      injectionDelay={injectionDelay}
      ref={ref => this.ref = ref}
      onOverlayRequestedVideoTime={this._onOverlayRequestedVideoTime}
      onOverlayRequestedPause={this._onOverlayRequestedPause}
      onOverlayRequestedPlay={this._onOverlayRequestedPlay}
      onOverlayRequestedSeekTo={this._onOverlayRequestedSeekTo}
      onOverlayRequestedFocus={this._onOverlayRequestedFocus}
      onOverlayReleasedFocus={this._onOverlayReleasedFocus}
      onOverlayDidTapVideo={this._onOverlayDidTapVideo}
      onOverlayDidShowSidebar={this._onOverlayDidShowSidebar}
      onOverlayDidHideSidebar={this._onOverlayDidHideSidebar}
      onOverlayResizeVideoWidth={this._onOverlayResizeVideoWidth}
      onOverlayResetVideoWidth={this._onOverlayResetVideoWidth}
      onOverlayResizeVideoHeight={this._onOverlayResizeVideoHeight}
      onOverlayResetVideoHeight={this._onOverlayResetVideoHeight}
      onOverlayBackPressResult={this._onOverlayBackPressResult}
      onDidGetVideoURL={this._onDidGetVideoURL}
      />
    );
  }

  setup = (...args) =>
  UIManager.dispatchViewManagerCommand(
    findNodeHandle(this.ref),
    "setup",
    [findNodeHandle(this.ref)]
  );

  shutdown = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "shutdown",
      [...args]
    );
  };

  openMenu = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "openMenu",
      [...args]
    );
  };
  openAccount = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "openAccount",
      [...args]
    );
  };
  openLeaderboard = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "openLeaderboard",
      [...args]
    );
  };
  openShop = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "openShop",
      [...args]
    );
  };
  openChat = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "openChat",
      [...args]
    );
  };
  openPredictions = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "openPredictions",
      [...args]
    );
  };
  closeMenu = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "closeMenu",
      [...args]
    );
  };
  closeAccount = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "closeAccount",
      [...args]
    );
  };
  closeLeaderboard = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "closeLeaderboard",
      [...args]
    );
  };
  closePredictions = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "closePredictions",
      [...args]
    );
  };
  closeShop = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "closeShop",
      [...args]
    );
  };
  closeChat = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "closeChat",
      [...args]
    );
  };
  videoPlaying = (time) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "videoPlaying",
      [time]
    );
  };
  videoPaused = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "videoPaused",
      [...args]
    );
  };
  setLiveMode = (enabled) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "setLiveMode",
      [enabled]
    );
  };
  handleBackPressIfNeeded = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "handleBackPressIfNeeded",
      [...args]
    );
  };
  receivedKeyEvent = (keyCode) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "receivedKeyEvent",
      [keyCode]
    );
  };
  getVideoURL = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "getVideoURL",
      [...args]
    );
  };
  }

const itgStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },});
