import React, { useRef, Component, createRef } from 'react';
import PropTypes from 'prop-types';

import {
  requireNativeComponent,
  UIManager,
  Platform,
  findNodeHandle,
  StyleSheet,
  Button,
  View,
} from 'react-native';

const COMPONENT_NAME = 'ITGOverlay';
const ITGOverlayView = requireNativeComponent(COMPONENT_NAME);

export default class ITGOverlay extends Component {
  static propTypes = {
    accountId: PropTypes.string,
    channelSlug: PropTypes.string,
    secondaryChannelSlug: PropTypes.string,
    language: PropTypes.string,
    environment: PropTypes.string,
    foreignId: PropTypes.string,
    userName: PropTypes.string,
    userAvatar: PropTypes.string,

    videoResolution: PropTypes.string,
    blockMenu: PropTypes.bool,
    blockNotifications: PropTypes.bool,
    blockSlip: PropTypes.bool,
    blockSidebar: PropTypes.bool,
    injectionDelay: PropTypes.number,

    onOverlayRequestedVideoTime: PropTypes.func,
    onOverlayRequestedPause: PropTypes.func,
    onOverlayRequestedPlay: PropTypes.func,
    onOverlayRequestedFocus: PropTypes.func,
    onOverlayReleasedFocus: PropTypes.func,
    onOverlayResizeVideoWidth: PropTypes.func,
    onOverlayResetVideoWidth: PropTypes.func,
    onOverlayResizeVideoHeight: PropTypes.func,
    onOverlayResetVideoHeight: PropTypes.func,
    onOverlayDidLoadChannelInfo: PropTypes.func,
    onOverlayRequestedVideoResolution: PropTypes.func,
    onOverlayDidPresentContent: PropTypes.func,
    onOverlayDidEndPresentingContent: PropTypes.func,
    onOverlayReceivedDeeplink: PropTypes.func,
    onOverlayRequestedVideoSeek: PropTypes.func,
    onOverlayDidProcessAnalyticEvent: PropTypes.func,
    onUserState: PropTypes.func,

    onCloseInteractionIfNeeded: PropTypes.func,
    onIsDisplayingInteractionResult: PropTypes.func,
    onIsDisplayingSidebar: PropTypes.func,
    onIsMenuVisible: PropTypes.func,
    onCurrentContent: PropTypes.func,
    onCurrentMenuPage: PropTypes.func,
  };

  _onOverlayRequestedVideoTime = (event) => {
    if (this.props.onOverlayRequestedVideoTime) {
      this.props.onOverlayRequestedVideoTime(event.nativeEvent);
    }
  };

  _onOverlayRequestedPause = (event) => {
    if (this.props.onOverlayRequestedPause) {
      this.props.onOverlayRequestedPause(event.nativeEvent);
    }
  };

  _onOverlayRequestedPlay = (event) => {
    if (this.props.onOverlayRequestedPlay) {
      this.props.onOverlayRequestedPlay(event.nativeEvent);
    }
  };

  _onOverlayRequestedFocus = (event) => {
    if (this.props.onOverlayRequestedFocus) {
      this.props.onOverlayRequestedFocus(event.nativeEvent);
    }
  };

  _onOverlayReleasedFocus = (event) => {
    if (this.props.onOverlayReleasedFocus) {
      this.props.onOverlayReleasedFocus(event.nativeEvent);
    }
  };

  _onOverlayResizeVideoWidth = (event) => {
    if (this.props.onOverlayResizeVideoWidth) {
      this.props.onOverlayResizeVideoWidth(event.nativeEvent);
    }
  };

  _onOverlayResetVideoWidth = (event) => {
    if (this.props.onOverlayResetVideoWidth) {
      this.props.onOverlayResetVideoWidth(event.nativeEvent);
    }
  };

  _onOverlayResizeVideoHeight = (event) => {
    if (this.props.onOverlayResizeVideoHeight) {
      this.props.onOverlayResizeVideoHeight(event.nativeEvent);
    }
  };

  _onOverlayResetVideoHeight = (event) => {
    if (this.props.onOverlayResetVideoHeight) {
      this.props.onOverlayResetVideoHeight(event.nativeEvent);
    }
  };

  _onOverlayDidLoadChannelInfo = (event) => {
    if (this.props.onOverlayDidLoadChannelInfo) {
      this.props.onOverlayDidLoadChannelInfo(event.nativeEvent);
    }
  };

  _onOverlayRequestedVideoResolution = (event) => {
    if (this.props.onOverlayRequestedVideoResolution) {
      this.props.onOverlayRequestedVideoResolution(event.nativeEvent);
    }
  };

  _onOverlayDidPresentContent = (event) => {
    if (this.props.onOverlayDidPresentContent) {
      this.props.onOverlayDidPresentContent(event.nativeEvent);
    }
  };

  _onOverlayDidEndPresentingContent = (event) => {
    if (this.props.onOverlayDidEndPresentingContent) {
      this.props.onOverlayDidEndPresentingContent(event.nativeEvent);
    }
  };

  _onOverlayReceivedDeeplink = (event) => {
    if (this.props.onOverlayReceivedDeeplink) {
      this.props.onOverlayReceivedDeeplink(event.nativeEvent);
    }
  };

  _onOverlayRequestedVideoSeek = (event) => {
    if (this.props.onOverlayRequestedVideoSeek) {
      this.props.onOverlayRequestedVideoSeek(event.nativeEvent);
    }
  };

  _onOverlayDidProcessAnalyticEvent = (event) => {
    if (this.props.onOverlayDidProcessAnalyticEvent) {
      this.props.onOverlayDidProcessAnalyticEvent(event.nativeEvent);
    }
  };

  _onUserState = (event) => {
    if (this.props.onUserState) {
      this.props.onUserState(event.nativeEvent);
    }
  };

  _onCloseInteractionIfNeeded = (event) => {
    if (this.props.onCloseInteractionIfNeeded) {
      this.props.onCloseInteractionIfNeeded(event.nativeEvent);
    }
  };

  _onIsDisplayingInteractionResult = (event) => {
    if (this.props.onIsDisplayingInteractionResult) {
      this.props.onIsDisplayingInteractionResult(event.nativeEvent);
    }
  };

  _onIsDisplayingSidebar = (event) => {
    if (this.props.onIsDisplayingSidebar) {
      this.props.onIsDisplayingSidebar(event.nativeEvent);
    }
  };

  _onIsMenuVisible = (event) => {
    if (this.props.onIsMenuVisible) {
      this.props.onIsMenuVisible(event.nativeEvent);
    }
  };

  _onCurrentContent = (event) => {
    if (this.props.onCurrentContent) {
      this.props.onCurrentContent(event.nativeEvent);
    }
  };

  _onCurrentMenuPage = (event) => {
    if (this.props.onCurrentMenuPage) {
      this.props.onCurrentMenuPage(event.nativeEvent);
    }
  };

  render() {
    const {
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
    } = this.props;
    return (
      <ITGOverlayView
        style={Platform.isTV ? itgStyles.overlay : itgStylesMobile.overlay}
        accountId={accountId}
        channelSlug={channelSlug}
        secondaryChannelSlug={secondaryChannelSlug}
        language={language}
        environment={environment}
        foreignId={foreignId}
        userName={userName}
        userAvatar={userAvatar}
        videoResolution={videoResolution}
        blockMenu={blockMenu}
        blockNotifications={blockNotifications}
        blockSlip={blockSlip}
        blockSidebar={blockSidebar}
        injectionDelay={injectionDelay}
        ref={(ref) => (this.bridge = ref)}
        onOverlayRequestedVideoTime={this._onOverlayRequestedVideoTime}
        onOverlayRequestedPause={this._onOverlayRequestedPause}
        onOverlayRequestedPlay={this._onOverlayRequestedPlay}
        onOverlayReleasedFocus={this._onOverlayReleasedFocus}
        onOverlayResizeVideoWidth={this._onOverlayResizeVideoWidth}
        onOverlayResetVideoWidth={this._onOverlayResetVideoWidth}
        onOverlayResizeVideoHeight={this._onOverlayResizeVideoHeight}
        onOverlayResetVideoHeight={this._onOverlayResetVideoHeight}
        onOverlayDidLoadChannelInfo={this._onOverlayDidLoadChannelInfo}
        onOverlayRequestedVideoResolution={
          this._onOverlayRequestedVideoResolution
        }
        onOverlayDidPresentContent={this._onOverlayDidPresentContent}
        onOverlayDidEndPresentingContent={
          this._onOverlayDidEndPresentingContent
        }
        onOverlayReceivedDeeplink={this._onOverlayReceivedDeeplink}
        onOverlayRequestedVideoSeek={this._onOverlayRequestedVideoSeek}
        onOverlayDidProcessAnalyticEvent={
          this._onOverlayDidProcessAnalyticEvent
        }
        onUserState={this._onUserState}
        onCloseInteractionIfNeeded={this._onCloseInteractionIfNeeded}
        onIsDisplayingInteractionResult={this._onIsDisplayingInteractionResult}
        onIsDisplayingSidebar={this._onIsDisplayingSidebar}
        onIsMenuVisible={this._onIsMenuVisible}
        onCurrentContent={this._onCurrentContent}
        onCurrentMenuPag={this._onCurrentMenuPage}
      />
    );
  }

  setup = (viewID, videoRef) => {
    console.log('this.bridge', this.bridge);
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.bridge), 'setup', [
      viewID,
    ]);
  };

  receivedKeyEvent = (keyCode) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'receivedKeyEvent',
      [keyCode]
    );
  };

  openMenu = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'openMenu',
      []
    );
  };

  openAccount = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'openAccount',
      []
    );
  };

  openLeaderboard = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'openLeaderboard',
      []
    );
  };

  openShop = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'openShop',
      []
    );
  };

  openChat = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'openChat',
      []
    );
  };

  openStats = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'openStats',
      []
    );
  };

  openExtension = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'openExtension',
      []
    );
  };

  closeMenu = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'closeMenu',
      []
    );
  };

  closeAccount = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'closeAccount',
      []
    );
  };

  closeLeaderboard = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'closeLeaderboard',
      []
    );
  };

  closeShop = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'closeShop',
      []
    );
  };

  closeChat = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'closeChat',
      []
    );
  };

  closeStats = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'closeStats',
      []
    );
  };

  closeExtension = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'closeExtension',
      []
    );
  };

  videoPlaying = (time) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'videoPlaying',
      [time]
    );
  };

  videoPaused = (time) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'videoPaused',
      [time]
    );
  };

  setLiveMode = (enabled) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'setLiveMode',
      [enabled]
    );
  };

  closeAll = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'closeAll',
      []
    );
  };

  resetUser = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'resetUser',
      []
    );
  };

  closeInteractionIfNeeded = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'closeInteractionIfNeeded',
      []
    );
  };

  isDisplayingInteraction = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'isDisplayingInteraction',
      []
    );
  };

  isDisplayingSidebar = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'isDisplayingSidebar',
      []
    );
  };

  isMenuVisible = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'isMenuVisible',
      []
    );
  };

  currentContent = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'currentContent',
      []
    );
  };

  currentMenuPage = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.bridge),
      'currentMenuPage',
      []
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
  },
});

const itgStylesMobile = StyleSheet.create({
  overlay: {
    flex: 1,
  },
});
