//
//  ITGOverlayManager.m
//  ITGRNExample-tvOS
//
//  Created by Tiago Lira Pereira on 06/07/2022.
//

@import Foundation;
#import <Inthegametv/Inthegametv.h>

#import "ITGOverlayManager.h"
#import "ITGRNExample_tvOS-Swift.h"


@implementation ITGOverlayManager

RCT_EXPORT_MODULE(ITGOverlay)

RCT_EXPORT_VIEW_PROPERTY(accountName, NSString)
RCT_EXPORT_VIEW_PROPERTY(channelId, NSString)
RCT_EXPORT_VIEW_PROPERTY(language, NSString)
RCT_EXPORT_VIEW_PROPERTY(environment, NSString)
RCT_EXPORT_VIEW_PROPERTY(userBroadcasterForeignID, NSString)
RCT_EXPORT_VIEW_PROPERTY(userInitialName, NSString)

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
RCT_EXPORT_VIEW_PROPERTY(onOverlayDidTapVideo, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayDidShowSidebar, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayDidHideSidebar, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onOverlayBackPressResult, RCTDirectEventBlock)

RCT_EXTERN_METHOD(openMenu:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(openAccount:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(openLeaderboard:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(openPredictions:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(openShop:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(openChat:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeMenu:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeAccount:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeLeaderboard:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closePredictions:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeShop:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(closeChat:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(videoPlaying:(nonnull NSNumber *)node time:(nonnull NSNumber *)time)
RCT_EXTERN_METHOD(videoPaused:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(setLiveMode:(nonnull NSNumber *)node enabled:(nonnull NSNumber *)enabled)
RCT_EXTERN_METHOD(setup:(nonnull NSNumber *)node viewID:(nonnull NSNumber *)viewID)
RCT_EXTERN_METHOD(handleBackPressIfNeeded:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(receivedKeyEvent:(nonnull NSNumber *)node keyCode:(nonnull NSNumber *)keyCode)

- (UIView *)view {
  return [self createOverlay];
}

@end
