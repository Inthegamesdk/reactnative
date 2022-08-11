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
import com.syncedapps.inthegametv.ITGKey
import com.syncedapps.inthegametv.ITGOverlayView
import com.syncedapps.inthegametv.ITGSettings
import com.syncedapps.inthegametv.ITGTools
import com.syncedapps.inthegametv.network.CloseOption
import com.syncedapps.inthegametv.network.ITGEnvironment

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
        config.clearUserToken()

        val view = ITGOverlayView(requireContext())
        view.load(settings.channelId,
            settings.accountName,
            settings.getEnvironment(),
            settings.language,
            settings.userBroadcasterForeignID,
            settings.userInitialName)

        view.blockMenu = settings.blockMenu
        view.blockNotifications = settings.blockNotifications
        view.blockSlip = settings.blockSlip
        view.blockSidebar = settings.blockSidebar
        view.injectionDelay = settings.injectionDelay
        view.openMenuKey = ITGKey.NONE
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