import type { OverlayCallback } from './OverlayCallback';
export interface OverlayCallbacks {
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
    onExternalPlaybackChange?: OverlayCallback;
    onCloseInteractionIfNeeded?: OverlayCallback;
    onIsDisplayingInteractionResult?: OverlayCallback;
    onIsDisplayingSidebar?: OverlayCallback;
    onIsMenuVisible?: OverlayCallback;
    onCurrentContent?: OverlayCallback;
    onCurrentMenuPage?: OverlayCallback;
}
//# sourceMappingURL=OverlayCallbacks.d.ts.map