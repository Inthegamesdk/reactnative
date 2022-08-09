//
//  ITGRNOverlayView.swift
//  ITGRNExample
//
//  Created by Tiago Lira Pereira on 11/07/2022.
//

import UIKit
import Inthegametv

@objc public class ITGRNOverlayView: ITGOverlayView {
  @objc var accountName: String!
  @objc var channelId: String!
  @objc var language: String = "en"
  @objc var environment: String!
  @objc var userBroadcasterForeignID: String?
  @objc var userInitialName: String?
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
      let env: ITGEnvironment!
      switch self.environment {
      case "prod":
        env = .productionDefault
      case "test":
        env = .testDefault
      default:
        env = .devDefault
      }
      
      load(channelID: self.channelId,
           broadcasterName: self.accountName,
           environment: env,
           delegate: delegate,
           language: self.language ?? "en",
           userBroadcasterForeignID: self.userBroadcasterForeignID,
           userInitialName: self.userInitialName)
    }
  }
}
