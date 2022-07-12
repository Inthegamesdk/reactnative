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
  
  @objc var overlayRequestedVideoTime: RCTDirectEventBlock?
  @objc var overlayRequestedPause: RCTDirectEventBlock?
  @objc var overlayRequestedPlay: RCTDirectEventBlock?
  @objc var overlayRequestedFocus: RCTDirectEventBlock?
  @objc var overlayReleasedFocus: RCTDirectEventBlock?
  @objc var overlayResizeVideoWidth: RCTDirectEventBlock?
  @objc var overlayResetVideoWidth: RCTDirectEventBlock?
  @objc var overlayResizeVideoHeight: RCTDirectEventBlock?
  @objc var overlayResetVideoHeight: RCTDirectEventBlock?
  
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
  
//  public override func awakeFromNib() {
//    super.awakeFromNib()
//    start(delegate: nil)
//  }
  
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
