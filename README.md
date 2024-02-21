# itg-react-native

ITGOverlay for react-native

## Installation

```sh
npm install itg-react-native react-native-keyevent react-native-video react-native-vector-icons

```

## Usage

```js
import { ITGVideoOverlay } from 'itg-react-native';

// ...

  <View style={{flex:1}}>
<ITGVideoOverlay
      ref={overlayRef}
        accountId={'62a73d850bcf95e08a025f82'}
        channelSlug={'rn-demo'}
        environment={'dev'}
        paused={false}
        muted={false}
        onOverlayDidLoadChannelInfo={(videoUrl) => setChannelVideo(videoUrl)}
        controls={true}
        onOverlayRequestedPause={(isPaused) => isPaused ?  videoRef.current?.pause() : videoRef.current?.resume()}
        currentTime={currentTime}
        videoPlaybackState={videoState}
        videoDuration={videoDuration}
        onOverlayRequestedFullScreen={(payload) => setIsFullscreen(payload)}
        >
            <Video

            controls
            source={{
              uri: 'https://media.inthegame.io/integration-assets/superdemo-720p.mp4'
            }}
            ref={videoRef}
            resizeMode={isFullscreen ? 'cover' : 'contain'}
            onLoad={(data) => {
              setVideoDuration(data.duration)
            }}
            progressUpdateInterval={1000}
            onProgress={({currentTime}) => setCurrentTime(currentTime)}
            onPlaybackStateChanged={({isPlaying}) => setVideoState(isPlaying)}
            onSeek={(data) => setCurrentTime(data.seekTime)}
          />  
          </ITGVideoOverlay>
   </View>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
