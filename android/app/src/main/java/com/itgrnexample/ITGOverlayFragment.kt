package com.itgrnexample

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.syncedapps.inthegametv.ITGKey
import com.syncedapps.inthegametv.ITGOverlayView
import com.syncedapps.inthegametv.ITGSettings
import com.syncedapps.inthegametv.ITGTools

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
        view.load(settings.accountId,
            settings.channelSlug,
            settings.language,
            settings.foreignId,
            settings.userName)

//        view.blockMenu = settings.blockMenu
//        view.blockNotifications = settings.blockNotifications
//        view.blockSlip = settings.blockSlip
//        view.blockSidebar = settings.blockSidebar
        view.injectionDelay = settings.injectionDelay
        view.openMenuKey = ITGKey.UP
        overlay = view

        view.listener = tempManagerRef
        tempManagerRef?.setOverlay(view)
        tempManagerRef = null
        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }
}