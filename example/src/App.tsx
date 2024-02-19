import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { ITGVideoOverlay, type ITGOverlayRef } from 'itg-react-native';
import Video, { type VideoRef } from 'react-native-video';

export default function App() {
  const overlayRef = React.useRef<ITGOverlayRef>(null);
  const videoRef = React.useRef<VideoRef>(null);
  const [channelVideo, setChannelVideo] = React.useState('VideoUrl')
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [videoState, setVideoState] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [videoDuration, setVideoDuration] = React.useState(0)
  
  return (
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
              uri: channelVideo
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

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
