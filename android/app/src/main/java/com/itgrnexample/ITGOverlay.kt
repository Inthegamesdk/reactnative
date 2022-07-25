package com.itgrnexample

import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.syncedapps.inthegametv.ITGOverlayView
import com.syncedapps.inthegametv.network.CloseOption
import com.syncedapps.inthegametv.network.ITGEnvironment

data class ITGOverlaySettings(
    var accountName: String = "",
    var channelId: String = "",
    var language: String? = null,
    var environment: String? = null,
    var userBroadcasterForeignID: String? = null,
    var userInitialName: String? = null,
    var blockMenu: Boolean = false,
    var blockNotifications: Boolean = false,
    var blockSlip: Boolean = false,
    var blockSidebar: Boolean = false,
    var injectionDelay: Int? = null,
) {
    fun getEnvironment(): ITGEnvironment {
        return when(environment) {
            "prod" -> ITGEnvironment.productionDefault
            "test" -> ITGEnvironment.testDefault
            else -> ITGEnvironment.devDefault
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

class ITGOverlayManager : ViewGroupManager<FrameLayout> {//, ITGOverlayView.ITGOverlayListener {

    override fun getName() = "ITGOverlay"
    val COMMAND_CREATE = "create"

    private var overlayView: ITGOverlayView? = null
//    private var videoId: String? = null

//    @ReactProp(name = "videoId")
//    fun setVideoId(view: ITGOverlayView, newId: String?) {
//        if (newId == null || newId == videoId) return
//        videoId = newId
//        ytPlayerView?.loadVideo(newId, 0f)
//    }

    override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
        return FrameLayout(reactContext!!)
    }

//    override fun getCommandsMap(): Map<String?, Int?>? {
//        return MapBuilder.of("create", COMMAND_CREATE)
//    }

    var settings = ITGOverlaySettings()

    @ReactProp(name = "accountName")
    fun setAccountName(view: FrameLayout, value: String = "") {
        settings.accountName = value
    }

    @ReactProp(name = "channelId")
    fun setChannelId(view: FrameLayout, value: String = "") {
        settings.channelId = value
    }
    @ReactProp(name = "language")
    fun setLanguage(view: FrameLayout, value: String = "") {
        settings.language = value
    }
    @ReactProp(name = "environment")
    fun setEnvironment(view: FrameLayout, value: String = "") {
        settings.environment = value
    }
    @ReactProp(name = "userBroadcasterForeignID")
    fun setUserBroadcasterForeignID(view: FrameLayout, value: String = "") {
        settings.userBroadcasterForeignID = value
    }
    @ReactProp(name = "userInitialName")
    fun setUserInitialName(view: FrameLayout, value: String = "") {
        settings.userInitialName = value
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

//    @ReactMethod
//    fun openLeaderboard() {
//        overlayView?.openLeaderboard()
//    }

//    override fun receiveCommand(root: FrameLayout, commandId: Int, args: ReadableArray?) {
//        super.receiveCommand(root, commandId, args)
//        val commandIdInt = commandId?.toInt()
//        if (commandIdInt == COMMAND_CREATE) {
//            val viewID = args?.getInt(0) ?: 0
//            createFragment(root, viewID)
//        }
//    }
    override fun receiveCommand(root: FrameLayout, commandId: String?, args: ReadableArray?) {
        super.receiveCommand(root, commandId, args)
        when (commandId) {
            "openLeaderboard" -> overlayView?.openLeaderboard()
            "openMenu" -> overlayView?.openMenu()
            "openAccount" -> overlayView?.openAccount()
            COMMAND_CREATE -> {
                val viewID = args?.getInt(0) ?: 0
                createFragment(root, viewID)
            }


        }
    }


    var reactContext: ReactApplicationContext? = null

    constructor(reactContext: ReactApplicationContext?) {
        this.reactContext = reactContext
    }
    /**
     * Replace your React Native view with a custom fragment
     */
    fun createFragment(root: FrameLayout, viewID: Int) {
        val parentView: ViewGroup = root.findViewById<View>(viewID) as ViewGroup
        setupLayout(parentView, root)
        val fragment = ITGOverlayFragment()
        fragment.settings = settings
        overlayView = fragment.overlay
        val activity: FragmentActivity = reactContext!!.getCurrentActivity() as FragmentActivity
        activity.getSupportFragmentManager()
            .beginTransaction()
            .replace(viewID, fragment, viewID.toString())
            .commit()
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

    /**
     * Layout all children properly
     */
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

//    override fun receiveCommand(
//        view: ITGOverlayView,
//        commandId: String?,
//        args: ReadableArray?
//    ) {
//        super.receiveCommand(view, commandId, args)
//
//    }
    //add methods!!!
//    override fun overlayClickedUserArea() {
//    }
//
//    override fun overlayClosedByUser(type: CloseOption, timestamp: Long) {
//    }
//
//    override fun overlayDidHideSidebar() {
//    }
//
//    override fun overlayDidShowSidebar() {
//    }
//
//    override fun overlayDidTapVideo() {
//    }
//
//    override fun overlayReleasedFocus(popMessage: Boolean) {
//    }
//
//    override fun overlayRequestedFocus(focusView: View) {
//    }
//
//    override fun overlayRequestedPause() {
//    }
//
//    override fun overlayRequestedPlay() {
//    }
//
//    override fun overlayRequestedPortraitTopGap(): Int {
//        return 0
//    }
//
//    override fun overlayRequestedVideoTime() {
//    }
//
//    override fun overlayResetVideoHeight() {
//    }
//
//    override fun overlayResetVideoWidth() {
//    }
//
//    override fun overlayResizeVideoHeight(activityHeight: Float) {
//    }
//
//    override fun overlayResizeVideoWidth(activityWidth: Float) {
//    }

}

//class ITGOverlay(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
//    override fun getName() = "ITGOverlay"
//}