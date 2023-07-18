//
//  ITGRNOverlayView.swift
//  ITGRNExample
//
//  Created by Tiago Lira Pereira on 11/07/2022.
//

import UIKit
import React
#if os(tvOS)
import Inthegametv
#else
import InthegametviOS
#endif

@objc public class ITGRNOverlayView: ITGOverlayView {
  @objc var accountId: String!
  @objc var channelSlug: String!
  @objc var language: String = "en"
  @objc var environment: String!
  @objc var foreignId: String?
  @objc var userName: String?
  private var didLoad = false
  
  @objc var onOverlayRequestedVideoTime: RCTDirectEventBlock?
  @objc var onOverlayRequestedPause: RCTDirectEventBlock?
  @objc var onOverlayRequestedPlay: RCTDirectEventBlock?
  @objc var onOverlayRequestedFocus: RCTDirectEventBlock?
  @objc var onOverlayReleasedFocus: RCTDirectEventBlock?
  @objc var onOverlayResizeVideoWidth: RCTDirectEventBlock?
  @objc var onOverlayResetVideoWidth: RCTDirectEventBlock?
  @objc var onOverlayResizeVideoHeight: RCTDirectEventBlock?
  @objc var onOverlayResetVideoHeight: RCTDirectEventBlock?
  @objc var onOverlayDidTapVideo: RCTDirectEventBlock?
  @objc var onOverlayDidShowSidebar: RCTDirectEventBlock?
  @objc var onOverlayDidHideSidebar: RCTDirectEventBlock?
  @objc var onOverlayBackPressResult: RCTDirectEventBlock?
  
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
  
  public func start(delegate: ITGOverlayDelegate?) {
    if !didLoad {
      didLoad = true
      load(channelSlug: self.channelSlug,
           accountId: self.accountId,
           environment: ITGEnvironment.init(envName: environment),
           delegate: delegate,
           language: self.language ,
           foreignId: self.foreignId,
           userName: self.userName,
           userRole: UserRole.user)
    }
  }
  
}
