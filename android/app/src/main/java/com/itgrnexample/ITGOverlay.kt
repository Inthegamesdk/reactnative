package com.itgrnexample

import android.graphics.Color
import android.graphics.Color.parseColor
import android.view.View
import androidx.core.content.ContextCompat
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.uimanager.*
import com.facebook.react.uimanager.annotations.ReactProp
import com.syncedapps.inthegametv.DesignType
import com.syncedapps.inthegametv.ITGOverlayView
import com.syncedapps.inthegametv.network.CloseOption
import com.syncedapps.inthegametv.network.ITGEnvironment

class ITGOverlayPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return mutableListOf()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return mutableListOf(ITGOverlayManager() as ViewManager<View, ReactShadowNode<*>>)
    }
}

class ITGOverlayManager : ViewGroupManager<ITGOverlayView>(), ITGOverlayView.ITGOverlayListener {

    override fun getName() = "ITGOverlay"

    private var overlayView: ITGOverlayView? = null
//    private var videoId: String? = null

//    @ReactProp(name = "videoId")
//    fun setVideoId(view: ITGOverlayView, newId: String?) {
//        if (newId == null || newId == videoId) return
//        videoId = newId
//        ytPlayerView?.loadVideo(newId, 0f)
//    }

    override fun createViewInstance(reactContext: ThemedReactContext): ITGOverlayView {
        val overlay = ITGOverlayView(reactContext!!, DesignType.DEFAULT)
        overlay.load("test1111", "demos", ITGEnvironment.productionDefault)
        overlay.listener = this
        overlayView = overlay
        overlay.setBackgroundColor(parseColor("#66FF0000"))

        return overlay
    }

    @ReactProp(name = "accountName")
    fun ITGOverlayView.setAccountName(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "channelId")
    fun ITGOverlayView.setChannelId(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "language")
    fun ITGOverlayView.setLanguage(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "environment")
    fun ITGOverlayView.setEnvironment(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "userBroadcasterForeignID")
    fun ITGOverlayView.setUserBroadcasterForeignID(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "userInitialName")
    fun ITGOverlayView.setUserInitialName(value: String = "") {
//        broadcasterName = value
    }

    @ReactProp(name = "blockMenu")
    fun ITGOverlayView.setBlockMenu(value: Boolean = false) {
        blockMenu = value
    }
    @ReactProp(name = "blockNotifications")
    fun ITGOverlayView.setBlockNotifications(value: Boolean = false) {
        blockNotifications = value
    }
    @ReactProp(name = "blockSlip")
    fun ITGOverlayView.setBlockSlip(value: Boolean = false) {
        blockSlip = value
    }
    @ReactProp(name = "blockSidebar")
    fun ITGOverlayView.setBlockSidebar(value: Boolean = false) {
        blockSidebar = value
    }
    @ReactProp(name = "injectionDelay")
    fun ITGOverlayView.setInjectionDelay(value: Int = 0) {
        injectionDelay = value
    }

    //add methods!!!
    override fun overlayClickedUserArea() {
    }

    override fun overlayClosedByUser(type: CloseOption, timestamp: Long) {
    }

    override fun overlayDidHideSidebar() {
    }

    override fun overlayDidShowSidebar() {
    }

    override fun overlayDidTapVideo() {
    }

    override fun overlayReleasedFocus(popMessage: Boolean) {
    }

    override fun overlayRequestedFocus(focusView: View) {
    }

    override fun overlayRequestedPause() {
    }

    override fun overlayRequestedPlay() {
    }

    override fun overlayRequestedPortraitTopGap(): Int {
        return 0
    }

    override fun overlayRequestedVideoTime() {
    }

    override fun overlayResetVideoHeight() {
    }

    override fun overlayResetVideoWidth() {
    }

    override fun overlayResizeVideoHeight(activityHeight: Float) {
    }

    override fun overlayResizeVideoWidth(activityWidth: Float) {
    }

}

//class ITGOverlay(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
//    override fun getName() = "ITGOverlay"
//}