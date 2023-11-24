export interface Callback {
  (): void;
}

export interface ITGOverlayProps {
  accountId: string;
  channelSlug: string;
  secondaryChannelSlug: string;
  language: string;
  environment: 'dev' | 'test' | 'stage' | 'v2-1' | 'v2-2' | 'v2-3';
  foreignId: string;
  userName: string;
  userAvatar: string;
  videoResolution: string;
  blockMenu: boolean;
  blockNotifications: boolean;
  blockSlip: boolean;
  blockSidebar: boolean;
  injectionDelay: number;
  onOverlayRequestedVideoTime: Callback;
  onOverlayRequestedPause: Callback;
  onOverlayRequestedPlay: Callback;
  onOverlayRequestedFocus: Callback;
  onOverlayReleasedFocus: Callback;
  onOverlayResizeVideoWidth: Callback;
  onOverlayResetVideoWidth: Callback;
  onOverlayResizeVideoHeight: Callback;
  onOverlayResetVideoHeight: Callback;
  onOverlayDidLoadChannelInfo: Callback;
  onOverlayRequestedVideoResolution: Callback;
  onOverlayDidPresentContent: Callback;
  onOverlayDidEndPresentingContent: Callback;
  onOverlayReceivedDeeplink: Callback;
  onOverlayRequestedVideoSeek: Callback;
  onOverlayDidProcessAnalyticEvent: Callback;
  onUserState: Callback;
  onCloseInteractionIfNeeded: Callback;
  onIsDisplayingInteractionResult: Callback;
  onIsDisplayingSidebar: Callback;
  onIsMenuVisible: Callback;
  onCurrentMenuPage: Callback;
  onCurrentContent: Callback;
}
