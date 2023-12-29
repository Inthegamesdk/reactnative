//
//  ITGOverlayManager.swift
//  ITGRNExample-tvOS
//
//  Created by Tiago Lira Pereira on 06/07/2022.
//

import UIKit
#if os(tvOS)
import Inthegametv
#else
import InthegametviOS
#endif
import AVFoundation

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
  
  @objc func openShop(_ node: NSNumber) {
    DispatchQueue.main.async {
      self.getOverlay(node: node).openShop()
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

  @objc func closeShop(_ node: NSNumber) {
    DispatchQueue.main.async {
      self.getOverlay(node: node).closeShop()
    }
  }
  
  @objc func closeSidebar(_ node: NSNumber) {
    DispatchQueue.main.async {
      // self.getOverlay(node: node).closeSidebar()//ask for methon name
    }
  }
  
  @objc func videoPlaying(_ node: NSNumber, time: NSNumber) {
    DispatchQueue.main.async {
      self.getOverlay(node: node).videoPlaying(time: time.doubleValue/1000)
    }
  }
  
  @objc func videoPaused(_ node: NSNumber, time: NSNumber) {
    DispatchQueue.main.async {
      self.getOverlay(node: node).videoPaused(time: time.doubleValue/1000)
    }
  }
  
  @objc func setLiveMode(_ node: NSNumber, enabled: NSNumber) {
    DispatchQueue.main.async {
      self.getOverlay(node: node).setLiveMode(enabled: enabled.boolValue)
    }
  }
  
  @objc func closeAll(_ node: NSNumber, enabled: NSNumber) {
    DispatchQueue.main.async {
      self.getOverlay(node: node).closeAll()
    }
  }
  
  @objc func resetUser(_ node: NSNumber, enabled: NSNumber) {
    DispatchQueue.main.async {
      self.getOverlay(node: node).resetUser()
    }
  }
  
  @objc func closeInteractionIfNeeded(_ node: NSNumber) {
    DispatchQueue.main.async {
      let handled = self.getOverlay(node: node).closeInteractionIfNeeded()
      self.onCloseInteractionIfNeeded(handled: handled)
    }
  }
  
  @objc func isDisplayingInteraction(_ node: NSNumber) {
    DispatchQueue.main.async {
      let result = self.getOverlay(node: node).isDisplayingInteraction()
      self.onIsDisplayingInteractionResult(result: result)
    }
  }
  
  @objc func isDisplayingSidebar(_ node: NSNumber) {
    DispatchQueue.main.async {
      let result = self.getOverlay(node: node).isDisplayingSidebar()
      self.onIsDisplayingSidebar(result: result)
    }
  }
  
  @objc func isMenuVisible(_ node: NSNumber) {
    DispatchQueue.main.async {
      let result = self.getOverlay(node: node).isMenuVisible()
      self.onIsMenuVisible(result: result)
    }
  }
  
  @objc func currentContent(_ node: NSNumber) {
    DispatchQueue.main.async {
//      let result = self.getOverlay(node: node).currentContent().map({ $0.rawValue })
//      self.onCurrentContent(result: result)
    }
  }
  
  @objc func currentMenuPage(_ node: NSNumber) {
    DispatchQueue.main.async {
      let result = self.getOverlay(node: node).currentMenuPage()
      self.onCurrentMenuPage(result: result?.rawValue ?? "")
    }
  }
  
  @objc func setup(_ node: NSNumber, viewID: NSNumber) {
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
      self.getOverlay(node: node).start(delegate: self)
    }
  }
  
  @objc func shutdown(_ node: NSNumber) {}
  
}

extension ITGOverlayManager: ITGOverlayDelegate {
    
    public func overlayRequestedVideoLength() -> TimeInterval {
        if let videoLength = getOverlay()?.onOverlayRequestedVideoLength?(nil) as? Double {
                return TimeInterval(exactly: videoLength) ?? 0.0
            } else {
                return 0.0
            }
    }
    
    public func overlayRequestedVideoGravity(_ videoGravity: AVLayerVideoGravity) {
        getOverlay()?.onOverlayRequestedVideoGravity?(["videoGravity": videoGravity ])
    }
    
    public func overlayRequestedResetVideoGravity() {
        getOverlay()?.onOverlayRequestedResetVideoGravity?(nil)
    }
    
    public func overlayRequestedVideoSoundLevel(_ soundLevel: Float) {
        getOverlay()?.onOverlayRequestedVideoSoundLevel?(["soundLevel": soundLevel])
    }
    
    public func overlayRequestedResetVideoSoundLevel() {
        getOverlay()?.onOverlayRequestedResetVideoSoundLevel?(nil)
    }
    
  
  public func overlayDidLoadChannelInfo(_ videoUrl: String?) {
    getOverlay()?.onOverlayDidLoadChannelInfo?(["videoUrl": videoUrl ?? ""])
  }
  
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
  
  public func overlayReceivedDeeplink(_ link: String) {
    getOverlay()?.onOverlayReceivedDeeplink?(["link": link])
  }
  
  public func overlayRequestedVideoSeek(time: TimeInterval) {
    getOverlay()?.onOverlayRequestedVideoSeek?(["time": time])
  }
  
  public func overlayRequestedVideoResolution() -> CGSize {
    getOverlay()?.onOverlayRequestedVideoResolution?(nil)
    if let videoResolution = getOverlay()?.videoResolution {
      let items = videoResolution.components(separatedBy: CharacterSet.decimalDigits.inverted)
      if items.count == 2, let width = Double(items.first!), let height = Double(items.last!) {
        return CGSize(width: width, height: height)
      }
    }
    return .zero
  }
  
  public func overlayDidProcessAnalyticEvent(info: AnalyticsInfo, type: AnalyticsEventType) {
    getOverlay()?.onOverlayDidProcessAnalyticEvent?(["info": info,
                                                     "type": type.rawValue])
  }
  
  public func userState(_ user: User) {
    getOverlay()?.onUserState?(["user": user])
  }
  
  public func overlayDidPresentContent(_ content: ITGContent) {
    getOverlay()?.onOverlayDidPresentContent?(["content": content])
  }
  
  public func overlayDidEndPresentingContent(_ content: ITGContent) {
    getOverlay()?.onOverlayDidEndPresentingContent?(["content": content])
  }
  
  public func onCloseInteractionIfNeeded(handled: Bool) {
    getOverlay()?.onCloseInteractionIfNeeded?(["handled": handled])
  }
  
  public func onIsDisplayingInteractionResult(result: Bool) {
    getOverlay()?.onIsDisplayingInteractionResult?(["result": result])
  }
  
  public func onIsDisplayingSidebar(result: Bool)  {
    getOverlay()?.onIsDisplayingSidebar?(["result": result])
  }
  
  public func onIsMenuVisible(result: Bool)  {
    getOverlay()?.onIsMenuVisible?(["result": result])
  }
  
  public func onCurrentContent(result: [String])  {
    getOverlay()?.onCurrentContent?(["result": result])
  }
  
  public func onCurrentMenuPage(result: String)  {
    getOverlay()?.onCurrentMenuPage?(["result": result])
  }
   
}
