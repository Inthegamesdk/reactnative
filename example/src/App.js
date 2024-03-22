import React, { useEffect,createElement } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";



function App() {
  useEffect(() => {
      if (typeof window !== 'undefined') {
        const exampleConfig = {
          videoPlayerId: 'VideoPlayerId',
          channelSlug: 'rn-demo',
          accountId: '62a73d850bcf95e08a025f82',
        };
       (window).inthegame?.init(exampleConfig);
    };
  }, []);
  return (
    <View style={styles.app}>
       <Video
        style={{width: '100%', height: '100%', minHeight: '100vh'}}
        id="VideoPlayerId"
        source={
          'https://media.inthegame.io/integration-assets/superdemo-720p.mp4'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex:1,
    backgroundColor: 'red'
  },
});
const Video = props => {
  const attrs = {
    src: props.source,
    id: props.id,
    controls: 'controls',
    style: props.style,
    autoPlay: 'autoplay'
  };
  return createElement('video', attrs);
};

export default App;
