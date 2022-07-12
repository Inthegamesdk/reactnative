//
//  ITGOverlayManager.swift
//  ITGRNExample-tvOS
//
//  Created by Tiago Lira Pereira on 06/07/2022.
//

import UIKit
import React
import Inthegametv

@objc extension ITGOverlayManager {
    
  public override static func requiresMainQueueSetup() -> Bool {
      return true
    }

  func getOverlay() -> ITGRNOverlayView? {
    return self.overlayView as? ITGRNOverlayView
  }
  
  @objc func createOverlay() -> ITGOverlayView {
    let overlay = ITGRNOverlayView(frame: CGRect(x: 0, y: 0, width: 600, height: 400))
//    overlay.load(channelID: "test1111", broadcasterName: "demos", environment: .productionDefault, delegate: self)
    self.overlayView = overlay
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
      overlay.start(delegate: self)
    }
    return overlay
  }
  
  func getOverlay(node: NSNumber) -> ITGRNOverlayView {
    return self.bridge.uiManager.view(
      forReactTag: node
    ) as! ITGRNOverlayView
  }
  
  @objc func openMenu(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).openMenu()
      }
  }
  @objc func openAccount(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).openAccount()
      }
  }
  @objc func openLeaderboard(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).openLeaderboard()
      }
  }
  @objc func openPredictions(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).openPredictions()
      }
  }
  @objc func openShop(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).openShop()
      }
  }
  @objc func openChat(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).openChat()
      }
  }
  @objc func closeMenu(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).closeMenu()
      }
  }
  @objc func closeAccount(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).closeAccount()
      }
  }
  @objc func closeLeaderboard(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).closeLeaderboard()
      }
  }
  @objc func closePredictions(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).closePredictions()
      }
  }
  @objc func closeShop(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).closeShop()
      }
  }
  @objc func closeChat(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).closeChat()
      }
  }
//  @objc func isDisplayingInteraction(_ node: NSNumber) {
//      DispatchQueue.main.async {
//        self.getOverlay(node: node).isDisplayingInteraction()
//      }
//  }
  
//  @objc func closeCurrentInteraction(_ node: NSNumber) {
//      DispatchQueue.main.async {
//        self.getOverlay(node: node).closeCurrentInteraction()
//      }
//  }
  @objc func videoPlaying(_ node: NSNumber, time: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).videoPlaying(time: time.doubleValue)
      }
  }
  @objc func videoPaused(_ node: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).videoPaused()
      }
  }
  @objc func setLiveMode(_ node: NSNumber, enabled: NSNumber) {
      DispatchQueue.main.async {
        self.getOverlay(node: node).setLiveMode(enabled: enabled.boolValue)
      }
  }
}

extension ITGOverlayManager: ITGOverlayDelegate {
  public func overlayRequestedVideoTime() {
    getOverlay()?.overlayRequestedVideoTime?(nil)
  }
  
  public func overlayRequestedPause() {
    getOverlay()?.overlayRequestedPause?(nil)
  }
  
  public func overlayRequestedPlay() {
    getOverlay()?.overlayRequestedPlay?(nil)
  }
  
  public func overlayRequestedFocus() {
    getOverlay()?.overlayRequestedFocus?(nil)
  }
  
  public func overlayReleasedFocus() {
    getOverlay()?.overlayReleasedFocus?(nil)
  }
  
  public func overlayResizeVideoWidth(activityWidth: CGFloat) {
    getOverlay()?.overlayResizeVideoWidth?(["width": activityWidth])
  }
  
  public func overlayResetVideoWidth() {
    getOverlay()?.overlayResetVideoWidth?(nil)
  }
  
  public func overlayResizeVideoHeight(activityHeight: CGFloat) {
    getOverlay()?.overlayResizeVideoHeight?(["height": activityHeight])
  }
  
  public func overlayResetVideoHeight() {
    getOverlay()?.overlayResetVideoHeight?(nil)
  }
}
