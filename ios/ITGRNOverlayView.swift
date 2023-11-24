//
//  ITGRNOverlayView.swift
//  ITGRNExample
//
//  Created by Tiago Lira Pereira on 11/07/2022.
//

import UIKit
import React
import InthegametviOS

@objc public class ITGRNOverlayView: ITGOverlayView {
  
  @objc var accountId: String!
  @objc var channelSlug: String!
  @objc var secondaryChannelSlug: String!
  @objc var language: String = "en"
  @objc var environment: String!
  @objc var foreignId: String?
  @objc var userName: String?
  @objc var userAvatar: String?
  @objc var userIsGuest: Bool = false
  @objc var videoResolution: String?
  private var didLoad = false

  @objc var onOverlayRequestedVideoGravity: RCTDirectEventBlock?
  @objc var onOverlayRequestedResetVideoSoundLevel: RCTDirectEventBlock?
  @objc var onOverlayRequestedVideoSoundLevel: RCTDirectEventBlock?
  @objc var onOverlayRequestedVideoLength: RCTDirectEventBlock?
  @objc var onOverlayRequestedResetVideoGravity: RCTDirectEventBlock?
  @objc var onOverlayRequestedVideoTime: RCTDirectEventBlock?
  @objc var onOverlayRequestedPause: RCTDirectEventBlock?
  @objc var onOverlayRequestedPlay: RCTDirectEventBlock?
  @objc var onOverlayRequestedFocus: RCTDirectEventBlock?
  @objc var onOverlayReleasedFocus: RCTDirectEventBlock?
  @objc var onOverlayResizeVideoWidth: RCTDirectEventBlock?
  @objc var onOverlayResetVideoWidth: RCTDirectEventBlock?
  @objc var onOverlayResizeVideoHeight: RCTDirectEventBlock?
  @objc var onOverlayResetVideoHeight: RCTDirectEventBlock?
  @objc var onOverlayDidLoadChannelInfo: RCTDirectEventBlock?
  @objc var onOverlayRequestedVideoResolution: RCTDirectEventBlock?
  @objc var onOverlayDidPresentContent: RCTDirectEventBlock?
  @objc var onOverlayDidEndPresentingContent: RCTDirectEventBlock?
  @objc var onOverlayReceivedDeeplink: RCTDirectEventBlock?
  @objc var onOverlayRequestedVideoSeek: RCTDirectEventBlock?
  @objc var onOverlayDidProcessAnalyticEvent: RCTDirectEventBlock?
  @objc var onUserState: RCTDirectEventBlock?

  @objc var onCloseInteractionIfNeeded: RCTDirectEventBlock?
  @objc var onIsDisplayingInteractionResult: RCTDirectEventBlock?
  @objc var onIsDisplayingSidebar: RCTDirectEventBlock?
  @objc var onIsMenuVisible: RCTDirectEventBlock?
  @objc var onCurrentContent: RCTDirectEventBlock?
  @objc var onCurrentMenuPage: RCTDirectEventBlock?
  
  
  @objc func setBlockSlip(_ val: Bool) {
    blockSlip = val
  }
  
  @objc func setBlockNotifications(_ val: Bool) {
    blockNotifications = val
  }
  
  @objc func setBlockMenu(_ val: Bool) {
    blockMenu = val
  }
  
  @objc func setBlockSidebar(_ val: Bool) {
    blockSidebar = val
  }
  
  @objc func setInjectionDelay(_ val: Int) {
    injectionDelay = val
  }
  
  @objc func setAdsMetadata(_ val: [Dictionary<String, Any>]?) {
    adsMetadata = val
  }
  
  public func start(delegate: ITGOverlayDelegate?) {
    if !didLoad {
      didLoad = true
      load(channelSlug: self.channelSlug,
           secondaryChannelSlug: self.secondaryChannelSlug,
           accountId: self.accountId,
           environment: ITGEnvironment.init(envName: environment),
           delegate: delegate,
           language: self.language ,
           foreignId: self.foreignId,
           userName: self.userName,
           userAvatar: self.userAvatar,
           userRole: self.userIsGuest ? .guest : .user, videoView: nil)
    }
  }
  
}
