package com.itgoverlay

import android.util.Log
import android.view.Choreographer
import android.view.KeyEvent
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.*
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.*
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.syncedapps.inthegametv.ITGOverlayView
import com.syncedapps.inthegametv.data.CloseOption
import com.syncedapps.inthegametv.network.ITGEnvironment
import com.syncedapps.inthegametv.domain.model.AnalyticsEventSnapshot
import com.syncedapps.inthegametv.domain.model.UserSnapshot

data class ITGOverlaySettings(
    var accountId: String = "",
    var channelSlug: String = "",
    var language: String? = null,
    var environmentValue: String? = null,
    var foreignId: String? = null,
    var userName: String? = null,
    var blockMenu: Boolean = false,
    var blockNotifications: Boolean = false,
    var blockSlip: Boolean = false,
    var blockSidebar: Boolean = false,
    var injectionDelay: Int? = null,
) {
    fun getEnvironment(): ITGEnvironment {
        Log.d("ITGOverlaySettings", "getEnvironment $environmentValue")
        return when(environmentValue) {
            "v2-3" -> ITGEnvironment.v2_3
            "v2-1" -> ITGEnvironment.v2_1
            "stage" -> ITGEnvironment.stage
            "test" -> ITGEnvironment.test
            else -> ITGEnvironment.dev
        }
    }
}

class ITGOverlayPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return mutableListOf()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return mutableListOf(ITGOverlayManager(reactContext) as ViewManager<View, ReactShadowNode<*>>)
    }
}

class ITGOverlayManager : ViewGroupManager<FrameLayout>, ITGOverlayView.ITGOverlayListener {

    override fun getName() = "ITGOverlay"

    private var overlayView: ITGOverlayView? = null

    override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
        return FrameLayout(reactContext!!)
    }

    var viewID: Int = 0
    var videoID: Int = 0
    var settings = ITGOverlaySettings()
    var duration : Long = 0L
    var aspectRatio : Float = 1F

    @ReactProp(name = "accountId")
    fun setAccountId(view: FrameLayout, value: String = "") {
        Log.d("ITGOverlayManager", "setAccountId $value")
        settings.accountId = value
    }

    @ReactProp(name = "channelSlug")
    fun setChannelSlug(view: FrameLayout, value: String = "") {
        Log.d("ITGOverlayManager", "setChannelSlug $value")
        settings.channelSlug = value
    }

    @ReactProp(name = "language")
    fun setLanguage(view: FrameLayout, value: String = "") {
        settings.language = value
    }

    @ReactProp(name = "environment")
    fun setEnvironment(view: FrameLayout, value: String = "") {
        Log.d("ITGOverlayManager", "setEnvironment $value")
        settings.environmentValue = value
    }

    @ReactProp(name = "foreignId")
    fun setForeignId(view: FrameLayout, value: String = "") {
        settings.foreignId = value
    }

    @ReactProp(name = "userName")
    fun setUserName(view: FrameLayout, value: String = "") {
        settings.userName = value
    }

    @ReactProp(name = "blockMenu")
    fun setBlockMenu(view: FrameLayout, value: Boolean = false) {
        settings.blockMenu = value
    }

    @ReactProp(name = "blockNotifications")
    fun setBlockNotifications(view: FrameLayout, value: Boolean = false) {
        settings.blockNotifications = value
    }

    @ReactProp(name = "blockSlip")
    fun setBlockSlip(view: FrameLayout, value: Boolean = false) {
        settings.blockSlip = value
    }

    @ReactProp(name = "blockSidebar")
    fun setBlockSidebar(view: FrameLayout, value: Boolean = false) {
        settings.blockSidebar = value
    }

    @ReactProp(name = "injectionDelay")
    fun setInjectionDelay(view: FrameLayout, value: Int = 0) {
        settings.injectionDelay = value
    }

    override fun receiveCommand(root: FrameLayout, commandId: String?, args: ReadableArray?) {
        super.receiveCommand(root, commandId, args)
        Log.d(this.javaClass.simpleName, "receiveCommand $commandId $args")
        when (commandId) {
            "openMenu" -> overlayView?.openMenu()
            "openAccount" -> overlayView?.openAccount()
            "openLeaderboard" -> overlayView?.openLeaderboard()
            "openShop" -> overlayView?.openShop()
            "openChat" -> overlayView?.openChat()
            "closeMenu" -> overlayView?.closeMenu()
            "closeAccount" -> overlayView?.closeAccount()
            "closeLeaderboard" -> overlayView?.closeLeaderboard()
            "openStats" -> overlayView?.openStats()
            "closeStats" -> overlayView?.closeStats()
            "closeShop" -> overlayView?.closeShop()
            "closeChat" -> overlayView?.closeChat()
            "closeAll" -> overlayView?.closeAll()
            "videoPlaying" -> {
                overlayView?.videoPlaying(((args?.getInt(0)  ?: 0) * 1000).toLong(), initiatedBySDK = false)
                duration = args.optDuration()
                aspectRatio = args.optAspectRatio()
            }
            "videoPaused" -> {
                overlayView?.videoPaused(((args?.getInt(0) ?: 0) * 1000).toLong(), initiatedBySDK = false, playWhenReady = false)
                duration = args.optDuration()
                aspectRatio = args.optAspectRatio()
            }
            "setLiveMode" -> overlayView?.setLiveMode(args?.getBoolean(0) ?: true)
            "handleBackPressIfNeeded" -> this.handleBackPressIfNeeded()
            "setup" -> {
                val viewID = args?.getInt(0) ?: 0
                val videoId = args?.getInt(1) ?: 0
                createFragment(root, viewID, videoId)
            }
        }
    }

    private fun ReadableArray?.optDuration() : Long {
        val args = this
        return if(args != null && args.size() > 1)
            args.getInt(1) * 1000L
        else
            0L
    }

  private fun ReadableArray?.optAspectRatio() : Float {
    val args = this
    return if(args != null && args.size() > 2)
    args.getDouble(2).toFloat()
    else
    1F
  }

    fun handleBackPressIfNeeded() {
        val handled = this.overlayView?.handleBackPressIfNeeded() ?: false
        val params = Arguments.createMap()
        params.putBoolean("handled", handled)
        sendEvent(reactContext, "onOverlayBackPressResult", params)
    }

    var reactContext: ReactApplicationContext? = null

    constructor(reactContext: ReactApplicationContext?) {
        this.reactContext = reactContext
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    fun createFragment(root: FrameLayout, viewID: Int, videoId : Int) {
        this.videoID = videoId
        val parentView: ViewGroup = root.findViewById<View>(viewID) as ViewGroup
        setupLayout(parentView, root)
        val fragment = ITGOverlayFragment()
        fragment.settings = settings
        fragment.tempManagerRef = this
        val activity: FragmentActivity = reactContext!!.getCurrentActivity() as FragmentActivity
        activity.getSupportFragmentManager()
            .beginTransaction()
            .replace(viewID, fragment, viewID.toString())
            .commit()
        this.viewID = viewID
    }

    fun setOverlay(overlay: ITGOverlayView) {
        overlayView = overlay
    }

    fun setupLayout(view: View, root: FrameLayout?) {
        Choreographer.getInstance().postFrameCallback(object : Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                manuallyLayoutChildren(view, root)
                view.viewTreeObserver.dispatchOnGlobalLayout()
                Choreographer.getInstance().postFrameCallback(this)
            }
        })
    }

    fun manuallyLayoutChildren(view: View, root: FrameLayout?) {
        // propWidth and propHeight coming from react-native props
        val width: Int = root?.width ?: root?.measuredWidth ?: 100
        val height: Int = root?.height ?: root?.measuredHeight ?: 100
        view.measure(
            View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
        )
        view.layout(0, 0, width, height)
    }


    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? {
        var map = super.getExportedCustomDirectEventTypeConstants() ?: mutableMapOf()
        map["onOverlayDidHideSidebar"] =
            MapBuilder.of("registrationName", "onOverlayDidHideSidebar")
        map["onOverlayDidShowSidebar"] =
            MapBuilder.of("registrationName", "onOverlayDidShowSidebar")
        map["onOverlayDidTapVideo"] =
            MapBuilder.of("registrationName", "onOverlayDidTapVideo")
        map["onOverlayReleasedFocus"] =
            MapBuilder.of("registrationName", "onOverlayReleasedFocus")
        map["onOverlayRequestedFocus"] =
            MapBuilder.of("registrationName", "onOverlayRequestedFocus")
        map["onOverlayRequestedPause"] =
            MapBuilder.of("registrationName", "onOverlayRequestedPause")
        map["onOverlayRequestedPlay"] =
            MapBuilder.of("registrationName", "onOverlayRequestedPlay")
        map["overlayRequestedSeekTo"] =
            MapBuilder.of("registrationName", "onOverlayRequestedSeekTo")
        map["onOverlayRequestedVideoTime"] =
            MapBuilder.of("registrationName", "onOverlayRequestedVideoTime")
        map["onOverlayResizeVideoHeight"] =
            MapBuilder.of("registrationName", "onOverlayResizeVideoHeight")
        map["onOverlayResizeVideoWidth"] =
            MapBuilder.of("registrationName", "onOverlayResizeVideoWidth")
        map["onOverlayResetVideoHeight"] =
            MapBuilder.of("registrationName", "onOverlayResetVideoHeight")
        map["onOverlayResetVideoWidth"] =
            MapBuilder.of("registrationName", "onOverlayResetVideoWidth")
        map["onOverlayBackPressResult"] =
            MapBuilder.of("registrationName", "onOverlayBackPressResult")
        map["onOverlayDidLoadChannelInfo"] =
            MapBuilder.of("registrationName", "onOverlayDidLoadChannelInfo")
        return map
    }

    private fun sendEvent(reactContext: ReactContext?, eventName: String, params: WritableMap?) {
        val context = reactContext ?: return
//        context
//            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
//            .emit(eventName, params)
        context
            .getJSModule(RCTEventEmitter::class.java)
            ?.receiveEvent(viewID, eventName, params)
    }

    //add methods!!!
    override fun overlayDidHideSidebar() {
        sendEvent(reactContext, "onOverlayDidHideSidebar", Arguments.createMap())
    }

    override fun overlayDidShowSidebar() {
        sendEvent(reactContext, "onOverlayDidShowSidebar", Arguments.createMap())
    }

    override fun overlayDidTapVideo() {
        sendEvent(reactContext, "onOverlayDidTapVideo", Arguments.createMap())
    }

    override fun overlayReleasedFocus(popMessage: Boolean) {
        sendEvent(reactContext, "onOverlayReleasedFocus", Arguments.createMap())
    }

    override fun overlayRequestedFocus(focusView: View) {
        sendEvent(reactContext, "onOverlayRequestedFocus", Arguments.createMap())
    }

    override fun overlayRequestedPause() {
        sendEvent(reactContext, "onOverlayRequestedPause", Arguments.createMap())
    }

    override fun overlayRequestedPlay() {
        sendEvent(reactContext, "onOverlayRequestedPlay", Arguments.createMap())
    }

    override fun overlayRequestedVideoTime() {
        sendEvent(reactContext, "onOverlayRequestedVideoTime", Arguments.createMap())
    }

    override fun overlayProducedAnalyticsEvent(eventSnapshot: AnalyticsEventSnapshot) {

    }

    override fun userState(userSnapshot: UserSnapshot) {
    }

    override fun channelInfoDidLoad(streamUrl: String?) {
        val params = Arguments.createMap()
        params.putString("videoUrl", streamUrl.orEmpty())
        sendEvent(reactContext, "onOverlayDidLoadChannelInfo", params)
    }


    override fun overlayClickedUserArea() {}
    override fun overlayClosedByUser(type: CloseOption, timestamp: Long) {}
    override fun overlayReceivedDeeplink(customUrl: String) {}
    override fun overlayRequestedSeekTo(timestampMillis: Long) {
        val params = Arguments.createMap()
        params.putDouble("timestampMillis", timestampMillis.toDouble())
        sendEvent(reactContext, "overlayRequestedSeekTo", params)
    }

    override fun overlayRequestedVideoDuration(): Long {
        return duration
    }
    override fun overlayRequestedVideoAspectRatio(): Float {
        return aspectRatio
    }
}
