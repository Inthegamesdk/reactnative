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

RCT_EXPORT_VIEW_PROPERTY(overlayRequestedVideoTime, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(overlayRequestedPause, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(overlayRequestedPlay, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(overlayRequestedFocus, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(overlayReleasedFocus, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(overlayResizeVideoWidth, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(overlayResetVideoWidth, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(overlayResizeVideoHeight, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(overlayResetVideoHeight, RCTDirectEventBlock)

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

- (UIView *)view {
  return [self createOverlay];
}

@end
