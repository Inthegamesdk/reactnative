//
//  ITGOverlayManager.m
//  ITGRNExample-tvOS
//
//  Created by Tiago Lira Pereira on 06/07/2022.
//

@import Foundation;
@import InthegametviOS;
#import "ITGOverlayManager.h"


@implementation ITGOverlayManager

RCT_EXPORT_MODULE(ITGOverlay)

RCT_EXPORT_VIEW_PROPERTY(accountId, NSString)
RCT_EXPORT_VIEW_PROPERTY(channelSlug, NSString)
RCT_EXPORT_VIEW_PROPERTY(secondaryChannelSlug, NSString)
RCT_EXPORT_VIEW_PROPERTY(language, NSString)
RCT_EXPORT_VIEW_PROPERTY(environment, NSString)
RCT_EXPORT_VIEW_PROPERTY(foreignId, NSString)
RCT_EXPORT_VIEW_PROPERTY(userName, NSString)
RCT_EXPORT_VIEW_PROPERTY(userAvatar, NSString)

RCT_EXPORT_VIEW_PROPERTY(videoResolution, NSString)
RCT_EXPORT_VIEW_PROPERTY(blockMenu, BOOL)
RCT_EXPORT_VIEW_PROPERTY(blockNotifications, BOOL)
RCT_EXPORT_VIEW_PROPERTY(blockSlip, BOOL)
RCT_EXPORT_VIEW_PROPERTY(blockSidebar, BOOL)
RCT_EXPORT_VIEW_PROPERTY(injectionDelay, NSInteger)

RCT_EXPORT_VIEW_PROPERTY(onOverlayRequestedVideoTime, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayRequestedPause, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayRequestedPlay, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayRequestedFocus, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayReleasedFocus, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayResizeVideoWidth, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayResetVideoWidth, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayResizeVideoHeight, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayResetVideoHeight, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayDidLoadChannelInfo, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayRequestedVideoResolution, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayDidPresentContent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayDidEndPresentingContent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayReceivedDeeplink, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayRequestedVideoSeek, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayDidProcessAnalyticEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUserState, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onCloseInteractionIfNeeded, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onIsDisplayingInteractionResult, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onIsDisplayingSidebar, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onIsMenuVisible, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCurrentContent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCurrentMenuPage, RCTDirectEventBlock)

RCT_EXTERN_METHOD(setup:(nonnull NSNumber *)node viewID:(nonnull NSNumber *)viewID)
RCT_EXTERN_METHOD(receivedKeyEvent:(nonnull NSNumber *)node keyCode:(nonnull NSNumber *)keyCode)

RCT_EXTERN_METHOD(openMenu:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(openAccount:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(openLeaderboard:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(openShop:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeMenu:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeAccount:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeLeaderboard:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeShop:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(videoPlaying:(nonnull NSNumber *)node time:(nonnull NSNumber *)time)
RCT_EXTERN_METHOD(videoPaused:(nonnull NSNumber *)node time:(nonnull NSNumber *)time)
RCT_EXTERN_METHOD(setLiveMode:(nonnull NSNumber *)node enabled:(nonnull NSNumber *)enabled)
RCT_EXTERN_METHOD(closeAll:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeSidebar:(nonnull NSNumber *)node)

RCT_EXTERN_METHOD(closeInteractionIfNeeded:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(isDisplayingInteraction:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(isDisplayingSidebar:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(isMenuVisible:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(currentContent:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(currentMenuPage:(nonnull NSNumber *)node)

- (UIView *)view {
  return [self createOverlay];
}

@end
