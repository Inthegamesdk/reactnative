import React, { useEffect, useState } from 'react';
import type {Node} from 'react';
import ReactNative, {
  Platform,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  BackHandler,
  TVEventControl,
  LogBox,
  TouchableHighlight,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getChannelList()
  }, []);

  const getChannelList = () => {
  return fetch('https://itguploadsdata.blob.core.windows.net/general/list_demos_stage.json')
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
    <Image style={styles.image}
        source={ require('./img/logo_wide.png') }
      />
      </View>
      <FlatList
        style={styles.list}
        data={data}
        horizontal={true}
        renderItem={ ({item}) =>
        <View style={styles.item}>
        <TouchableHighlight style={styles.itemButton}
        underlayColor="#777777"
        onPress = {() =>
          navigation.navigate('Player', item)
        }>
          <Text style={styles.itemText}>{ item.name }</Text>
        </TouchableHighlight>
        </View>
       }
        />

    </View>
  );
};

export default HomeScreen;

const scale = Platform.isTVOS ? 2.0 : (Platform.isTV ? 1.0 : 0.8);
const topMargin = Platform.isTV ? 60 : 120
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    paddingTop: topMargin*scale,
    paddingBottom: 60*scale
  },
  image: {
    resizeMode: "contain",
    height: 120*scale,
  },
  imageContainer: {
    padding: 30*scale
  },
  list: {
    height: 100*scale,
    width:'100%',
  },
  video: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  item: {
    height: 140*scale,
    width: 160*scale,
   justifyContent: "center",
   alignItems: "center"
  },
  itemButton: {
      height: 120*scale,
      width: 140*scale,
    backgroundColor: "#222222",
    borderRadius: 10*scale,
   padding: 10*scale,
  justifyContent: "center",
  alignItems: "center"
  },
  itemText: {
    color: "#FFFFFF",
   fontSize: 16*scale,
   fontWeight: '600',
  },
  highlight: {
    fontWeight: '700',
  },
  });
