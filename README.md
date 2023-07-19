# Inthegame React Native example

This repository is an example of how to integrate Inthegame in a React Native TV project. It includes wrappers for our native SDKs.

## Instalation

The project requires the `react-native-tvOS` package to support tvOS devices and `react-native-keyevent` to handle key events in android (required if using the predictions feature). Please add these packages if missing:
```
"react-native": "npm:react-native-tvos@0.69.6-0",
"react-native-keyevent": "^0.2.8",
```

Next, add the `ITGOverlay.js` file to your react-native project.

After that you'll need to configure the native modules in each platform.

### Android

Add the ITG dependency in the app's build.gradle:
```
implementation 'com.github.Inthegamesdk:ITGAndroidRelease:2.1.22'
```

Kotlin is required, please add it if not included yet. On the project's build.gradle:
```
classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.21")
```
On the app's build.gradle:
```
implementation "org.jetbrains.kotlin:kotlin-stdlib:1.8.21"
```

Next, add the wrapper files to your android studio project: `ITGOverlay.kt` and `ITGOverlayFragment.kt`

On your `MainApplication.java` file, add the ITG package:
```
packages.add(new ITGOverlayPackage());
```

### tvOS

On your xcode project use Swift Package Manager to install SDK using next link - https://github.com/Inthegamesdk/InthegameFramework.git

Then, copy the following wrapper files to your xcode project:
```
ITGOverlayManager.h
ITGOverlayManager.m
ITGOverlayManagerExtension.swift
ITGRNOverlayView.swift
```

## Usage

For more details on how to use the ITGOverlay, a complete example is in the `App.js` file of this repo.
To use the ITGOverlay, you include it in your layout, over the video player.

```
<ITGOverlay style={styles.overlay}
              accountId={"64100c941dca8096fc0df832"}
              channelSlug={"dudeplusdemo"}
              environment={"v2-1"}
              language={"en"}
              blockSlip={false}
              ref={e => this.overlay = e}
              onOverlayRequestedVideoTime={this.onOverlayRequestedVideoTime}
              onOverlayRequestedPlay={this.onOverlayRequestedPlay}
              onOverlayRequestedPause={this.onOverlayRequestedPause}
              onOverlayRequestedSeekTo={this.onOverlayRequestedSeekTo}
              onOverlayRequestedFocus={this.onOverlayRequestedFocus}
              onOverlayReleasedFocus={this.onOverlayReleasedFocus}
              onOverlayDidTapVideo={this.onOverlayDidTapVideo}
              onOverlayDidShowSidebar={this.onOverlayDidShowSidebar}
              onOverlayDidHideSidebar={this.onOverlayDidHideSidebar}
              onOverlayResizeVideoWidth={this.onOverlayResizeVideoWidth}
              onOverlayResetVideoWidth={this.onOverlayResetVideoWidth}
              onOverlayResizeVideoHeight={this.onOverlayResizeVideoHeight}
              onOverlayResetVideoHeight={this.onOverlayResetVideoHeight}
              onOverlayBackPressResult={this.onOverlayBackPressResult}/>
```

The accountId and channelSlug should be changed to match your ITG account and channel.

Please implement the delegate methods mentioned above as in the example project.

Next, on useEffect(). We start by initializing the overlay: 
```
this.overlay.setup()
```
Enable the tvOS menu key handler
```
TVEventControl.enableTVMenuKey();
```

Add a listener for back button events
```
BackHandler.addEventListener("hardwareBackPress", backAction);
return () =>
  BackHandler.removeEventListener("hardwareBackPress", backAction);
  
 ```
Add the back button action on the App element
```
const backAction = () => {
    this.overlay.handleBackPressIfNeeded()
    return true;
  };
```

### Updating video time

The overlay needs to be informed of the current video time to display scheduled content. So every time the user presses play, pause, seek forward/backward, you'll need to inform the overlay using the following methods:

```
this.overlay.videoPlaying(time) //parameter is the current video time in seconds
this.overlay.videoPaused()
```
In some situations the overlay will request a time update directly in a delegate call, you should handle it as follows:
```
onOverlayRequestedVideoTime = e => {
    this.overlay.videoPlaying(0)
}
```

### Opening menu and other elements

Ideally your app interface should have a way for the user to open the ITG menu and access all the useful content. You can open the menu with this call:
```
this.overlay.openMenu()
```

There are other functions to open ITG elements, you can check the full list in `ITGOverlay.js`.

