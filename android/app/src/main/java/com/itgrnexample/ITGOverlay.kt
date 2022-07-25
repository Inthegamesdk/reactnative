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

    /**
     * Handle "create" command (called from JS) and call createFragment method
     */

//    override fun createViewInstance(reactContext: ThemedReactContext): ITGOverlayView {
//        val overlay = ITGOverlayView(reactContext!!, DesignType.DEFAULT)
//        overlay.load("soccer_predictions", "demos", ITGEnvironment.productionDefault)
//        overlay.listener = this
//        overlayView = overlay
//
//        Handler(Looper.getMainLooper()).postDelayed({
//            overlay.findViewById<LinearLayout>(R.id.menu)?.setBackgroundColor(parseColor("#66FF0000"))
//            overlay.findViewById<LinearLayout>(R.id.sidebar)?.setBackgroundColor(parseColor("#550088FF"))
//            overlay.findViewById<LinearLayout>(R.id.container)?.setBackgroundColor(parseColor("#44FFFF00"))
//
//            val textView = TextView(reactContext)
//            textView.text = "TEST TEST TEST TEST"
//            textView.setTextColor(parseColor("#FFFFFF"))
//            textView.setBackgroundColor(parseColor("#000000"))
//            textView.layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT)
////            overlay.addView(textView)
//            overlay.findViewById<LinearLayout>(R.id.container)?.addView(textView)
//            overlay.findViewById<LinearLayout>(R.id.container)?.invalidate()
//            textView.bringToFront()
//            textView.visibility = View.VISIBLE
//            textView.requestLayout()
//            textView.post {
//                textView.layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT)
//            }
//            Log.i("OVERLAY", "ADDED TEXT VIEW")
//
//            Handler(Looper.getMainLooper()).postDelayed({
//                Log.i("OVERLAY", "SIZE ${textView.measuredWidth}")
//            }, 3000)
//        }, 1000)
//
//        return overlay
//    }

    @ReactProp(name = "accountName")
    fun FrameLayout.setAccountName(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "channelId")
    fun FrameLayout.setChannelId(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "language")
    fun FrameLayout.setLanguage(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "environment")
    fun FrameLayout.setEnvironment(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "userBroadcasterForeignID")
    fun FrameLayout.setUserBroadcasterForeignID(value: String = "") {
//        broadcasterName = value
    }
    @ReactProp(name = "userInitialName")
    fun FrameLayout.setUserInitialName(value: String = "") {
//        broadcasterName = value
    }

//    @ReactProp(name = "blockMenu")
//    fun ITGOverlayView.setBlockMenu(value: Boolean = false) {
//        blockMenu = value
//    }
//    @ReactProp(name = "blockNotifications")
//    fun ITGOverlayView.setBlockNotifications(value: Boolean = false) {
//        blockNotifications = value
//    }
//    @ReactProp(name = "blockSlip")
//    fun ITGOverlayView.setBlockSlip(value: Boolean = false) {
//        blockSlip = value
//    }
//    @ReactProp(name = "blockSidebar")
//    fun ITGOverlayView.setBlockSidebar(value: Boolean = false) {
//        blockSidebar = value
//    }
//    @ReactProp(name = "injectionDelay")
//    fun ITGOverlayView.setInjectionDelay(value: Int = 0) {
//        injectionDelay = value
//    }

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
            COMMAND_CREATE -> {
                val viewID = args?.getInt(0) ?: 0
                createFragment(root, viewID)
            }
//            "openLeaderboard" -> root.openLeaderboard()
//            "openMenu" -> root.openMenu()
//            "openAccount" -> root.openAccount()

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
        val myFragment = ITGOverlayFragment()
        val activity: FragmentActivity = reactContext!!.getCurrentActivity() as FragmentActivity
        activity.getSupportFragmentManager()
            .beginTransaction()
            .replace(viewID, myFragment, viewID.toString())
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