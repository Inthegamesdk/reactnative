package com.itgoverlay

import android.view.View
import java.lang.reflect.Field

object RNUtils {
    val View?.exoPlayerViewIfAny: View?
        get() {
            val playerView = this ?: return null
            return readNonAccessibleField<View>(
                    "com.brentvatne.exoplayer.ReactExoplayerView",
                    "exoPlayerView",
                    playerView
            ) ?: return this
        }

    @Suppress("UNCHECKED_CAST")
    private fun <T> readNonAccessibleField(
            className: String,
            fieldName: String,
            dataProperty: Any
    ): T? {
        return try {
            val classRef = Class.forName(className)

            // Create Field object
            val fieldRef: Field = classRef.getDeclaredField(fieldName)

            val isAccessible = fieldRef.isAccessible
            // Set the accessibility as true
            fieldRef.isAccessible = true

            // Store the value of private field in variable
            val value = fieldRef.get(dataProperty)

            // Return the accessibility back
            fieldRef.isAccessible = isAccessible

            value as? T
        } catch (e : Exception) {
            e.printStackTrace()
            null
        }
    }
}
