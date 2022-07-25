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
    accountName: PropTypes.string,
    channelId: PropTypes.string,
    language: PropTypes.string,
    environment: PropTypes.string,
    userBroadcasterForeignID: PropTypes.string,
    userInitialName: PropTypes.string,
    blockMenu: PropTypes.bool,
    blockNotifications: PropTypes.bool,
    blockSlip: PropTypes.bool,
    blockSidebar: PropTypes.bool,
    injectionDelay: PropTypes.number,
    overlayRequestedVideoTime: PropTypes.func,
    overlayRequestedPause: PropTypes.func,
    overlayRequestedPlay: PropTypes.func,
    overlayRequestedFocus: PropTypes.func,
    overlayReleasedFocus: PropTypes.func,
    overlayResizeVideoWidth: PropTypes.func,
    overlayResetVideoWidth: PropTypes.func,
    overlayResizeVideoHeight: PropTypes.func,
    overlayResetVideoHeight: PropTypes.func
  };

  _overlayRequestedVideoTime = event => {
    if (this.props.overlayRequestedVideoTime) {
      this.props.overlayRequestedVideoTime(event.nativeEvent);
    }
  };
  _overlayRequestedPause = event => {
    if (this.props.overlayRequestedPause) {
      this.props.overlayRequestedPause(event.nativeEvent);
    }
  };
  _overlayRequestedPlay = event => {
    if (this.props.overlayRequestedPlay) {
      this.props.overlayRequestedPlay(event.nativeEvent);
    }
  };
  _overlayRequestedFocus = event => {
    if (this.props.overlayRequestedFocus) {
      this.props.overlayRequestedFocus(event.nativeEvent);
    }
  };
  _overlayReleasedFocus = event => {
    if (this.props.overlayReleasedFocus) {
      this.props.overlayReleasedFocus(event.nativeEvent);
    }
  };
  _overlayResizeVideoWidth = event => {
    if (this.props.overlayResizeVideoWidth) {
      this.props.overlayResizeVideoWidth(event.nativeEvent);
    }
  };
  _overlayResetVideoWidth = event => {
    if (this.props.overlayResetVideoWidth) {
      this.props.overlayResetVideoWidth(event.nativeEvent);
    }
  };
  _overlayResizeVideoHeight = event => {
    if (this.props.overlayResizeVideoHeight) {
      this.props.overlayResizeVideoHeight(event.nativeEvent);
    }
  };
  _overlayResetVideoHeight = event => {
    if (this.props.overlayResetVideoHeight) {
      this.props.overlayResetVideoHeight(event.nativeEvent);
    }
  };


  render() {
    console.log("OVERLAY RENDER")
    const { accountName, channelId, language, environment, userBroadcasterForeignID, userInitialName, blockSlip, blockMenu, blockSidebar, blockNotifications, injectionDelay, style } = this.props;
    return (
      <ITGOverlayView
      style={itgStyles.overlay}
      accountName={accountName}
      channelId={channelId}
      language={language}
      environment={environment}
      userBroadcasterForeignID={userBroadcasterForeignID}
      userInitialName={userInitialName}
      blockSlip={blockSlip}
      blockMenu={blockMenu}
      blockSidebar={blockSidebar}
      blockNotifications={blockNotifications}
      injectionDelay={injectionDelay}
      ref={ref => this.ref = ref}
      overlayRequestedVideoTime={this._overlayRequestedVideoTime}
      />
    );
  }

  createFragment = (...args) =>
  UIManager.dispatchViewManagerCommand(
    findNodeHandle(this.ref),
    "create",
    [findNodeHandle(this.ref)]
  );

  openMenu = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "openMenu",
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
  openAccount = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      "openAccount",
      [...args]
    );
  };
}
const itgStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
  },});
