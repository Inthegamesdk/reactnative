import * as React from 'react';

import { StyleSheet } from 'react-native';
import { ITGVideoOverlay, type ITGOverlayRef } from 'itg-react-native';

export default function App() {
  const overlayRef = React.useRef<ITGOverlayRef>(null);

  return (
    <ITGVideoOverlay
      ref={overlayRef}
        source={
          {
            uri: "https://media.inthegame.io/uploads/dev/testing/videos/DolbyAtmosdemos4kHDR(GoodfortestingTVormobileHDRSupporteddevices).mp4"
          }
        } 
        accountId={'62a73d850bcf95e08a025f82'}
        channelSlug={'android_test'}
        environment={'dev'}
        paused={false}
        muted={false}
        controls={true}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
