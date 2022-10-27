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
    <View style={styles.image}>
    <Image
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 120
  },
  image: {
    padding: 60
  },
  list: {
    height: 200,
    width:'100%',
  },
  video: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  item: {
    height: 280,
    width: 320,
   justifyContent: "center",
   alignItems: "center"
  },
  itemButton: {
      height: 240,
      width: 280,
    backgroundColor: "#222222",
    borderRadius: 20,
   padding: 20,
  justifyContent: "center",
  alignItems: "center"
  },
  itemText: {
    color: "#FFFFFF",
   fontSize: 30,
   fontWeight: '600',
  },
  highlight: {
    fontWeight: '700',
  },
  });
