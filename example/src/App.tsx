import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { ITGVideoOverlay, type ITGOverlayRef } from 'itg-react-native';
import Video from 'react-native-video';

export default function App() {
  const overlayRef = React.useRef(null);
  return (
   <View style={{flex:1}}>
<ITGVideoOverlay
      ref={overlayRef}
        accountId={'62a73d850bcf95e08a025f82'}
        channelSlug={'rn-demo'}
        environment={'dev'}
        paused={false}
        muted={false}
        controls={true}/>
      

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
