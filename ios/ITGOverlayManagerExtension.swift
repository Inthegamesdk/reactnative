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
    ITGOverlayView.reactCompatMode = true
    let overlay = ITGRNOverlayView(frame: CGRect(x: 0, y: 0, width: 600, height: 400))
    self.overlayView = overlay
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
  @objc func handleBackPressIfNeeded(_ node: NSNumber) {
      DispatchQueue.main.async {
        let handled = self.getOverlay(node: node).closeInteractionIfNeeded()
        self.overlayBackPressResult(handled: handled)
      }
  }
  @objc func setup(_ node: NSNumber, viewID: NSNumber) {
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
      self.getOverlay(node: node).start(delegate: self)
    }
  }
  @objc func receivedKeyEvent(_ node: NSNumber, keyCode: NSNumber) {}
}

extension ITGOverlayManager: ITGOverlayDelegate {
  public func overlayRequestedVideoTime() {
    getOverlay()?.onOverlayRequestedVideoTime?(nil)
  }
  
  public func overlayRequestedPause() {
    getOverlay()?.onOverlayRequestedPause?(nil)
  }
  
  public func overlayRequestedPlay() {
    getOverlay()?.onOverlayRequestedPlay?(nil)
  }
  
  public func overlayRequestedFocus() {
    getOverlay()?.onOverlayRequestedFocus?(nil)
  }
  
  public func overlayReleasedFocus() {
    getOverlay()?.onOverlayReleasedFocus?(nil)
  }
  
  public func overlayResizeVideoWidth(activityWidth: CGFloat) {
    getOverlay()?.onOverlayResizeVideoWidth?(["activityWidth": activityWidth])
  }
  
  public func overlayResetVideoWidth() {
    getOverlay()?.onOverlayResetVideoWidth?(nil)
  }
  
  public func overlayResizeVideoHeight(activityHeight: CGFloat) {
    getOverlay()?.onOverlayResizeVideoHeight?(["activityHeight": activityHeight])
  }
  
  public func overlayResetVideoHeight() {
    getOverlay()?.onOverlayResetVideoHeight?(nil)
  }
  
  public func overlayDidTapVideo() {
    getOverlay()?.onOverlayDidTapVideo?(nil)
  }
  
  public func overlayDidShowSidebar() {
    getOverlay()?.onOverlayDidShowSidebar?(nil)
  }
  
  public func overlayDidHideSidebar() {
    getOverlay()?.onOverlayDidHideSidebar?(nil)
  }
  
  public func overlayBackPressResult(handled: Bool) {
    getOverlay()?.onOverlayBackPressResult?(["handled": handled])
  }
}
