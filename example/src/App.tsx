import * as React from 'react';

import { StyleSheet } from 'react-native';
import { ITGVideoOverlay } from 'itg-react-native';

export default function App() {
  return (
    <ITGVideoOverlay
        style={styles.container}
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
