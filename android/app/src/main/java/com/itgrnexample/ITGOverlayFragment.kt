package com.itgrnexample

import android.graphics.Color.parseColor
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.fragment.app.Fragment
import com.syncedapps.inthegametv.ITGOverlayView
import com.syncedapps.inthegametv.network.CloseOption
import com.syncedapps.inthegametv.network.ITGEnvironment

class ITGOverlayFragment: Fragment(), ITGOverlayView.ITGOverlayListener {
    var overlay: ITGOverlayView? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        super.onCreateView(inflater, container, savedInstanceState)
        val view = ITGOverlayView(requireContext())
        view.load("soccer_predictions", "demos", ITGEnvironment.productionDefault)
        view.listener = this
        overlay = view

        Handler(Looper.getMainLooper()).postDelayed({
            view.findViewById<LinearLayout>(R.id.menu)?.setBackgroundColor(parseColor("#66FF0000"))
            view.findViewById<LinearLayout>(R.id.sidebar)?.setBackgroundColor(parseColor("#550088FF"))
            view.findViewById<LinearLayout>(R.id.container)?.setBackgroundColor(parseColor("#44FFFF00"))

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
        }, 1000)
        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }

    override fun onPause() {
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
    }

    override fun onDestroy() {
        super.onDestroy()
    }

    override fun overlayClickedUserArea() {}
    override fun overlayClosedByUser(type: CloseOption, timestamp: Long) {}
    override fun overlayDidHideSidebar() {}
    override fun overlayDidShowSidebar() {}
    override fun overlayDidTapVideo() {}
    override fun overlayReleasedFocus(popMessage: Boolean) {}
    override fun overlayRequestedFocus(focusView: View) {}
    override fun overlayRequestedPause() {}
    override fun overlayRequestedPlay() {}
    override fun overlayRequestedPortraitTopGap(): Int { return 0 }
    override fun overlayRequestedVideoTime() {}
    override fun overlayResetVideoHeight() {}
    override fun overlayResetVideoWidth() {}
    override fun overlayResizeVideoHeight(activityHeight: Float) {}
    override fun overlayResizeVideoWidth(activityWidth: Float) {}
}