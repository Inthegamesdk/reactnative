package com.itgoverlay

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.syncedapps.inthegametv.ITGOverlayView
import com.syncedapps.inthegametv.ITGSettings

class ITGOverlayFragment: Fragment() {
    var overlay: ITGOverlayView? = null
    var settings = ITGOverlaySettings()
    var tempManagerRef: ITGOverlayManager? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        super.onCreateView(inflater, container, savedInstanceState)

        val config = ITGSettings(requireContext())
        config.clearAll()

        val view = ITGOverlayView(requireContext(), settings.getEnvironment())
        view?.layoutParams = ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
        view.load(settings.accountId,
            settings.channelSlug,
            settings.language,
            settings.foreignId,
            settings.userName,
            savedState = savedInstanceState
        )

        view.blockMenu = settings.blockMenu
        view.blockAll = settings.blockAll
        view.blockNotifications = settings.blockNotifications
        view.blockSlip = settings.blockSlip
        view.blockSidebar = settings.blockSidebar
        val videoView : View? = tempManagerRef?.videoID?.let { requireActivity().findViewById(it) }
        videoView?.layoutParams = ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT,)
        view.attachVideoView(videoView)
        overlay = view

        view.listener = tempManagerRef
        tempManagerRef?.setOverlay(view)
        tempManagerRef = null
        return view
    }

    override fun onStart() {
        super.onStart()
        overlay?.onStart()
    }

    override fun onStop() {
        overlay?.onStop()
        super.onStop()
    }

    override fun onDestroyView() {
        overlay?.onDestroyView()
        super.onDestroyView()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        overlay?.onSaveInstanceState(outState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }
}