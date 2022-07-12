import React from 'react';
import type {Node} from 'react';
import ReactNative, {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
} from 'react-native';


const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} />

        <Image source={require('./img/logo_wide.png')} />
        <Button title="START"
                style={styles.button}
                color="#000000"
                containerStyle={styles.buttonContainer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  highlight: {
    fontWeight: '700',
  },
   button: {
     fontSize: 40,
     color: "#FFFFFF",
     width: 220,
     height: 60
    },
  buttonContainer: {
       padding: 4,
       height: 100,
       overflow: 'hidden',
       borderRadius: 4,
       backgroundColor: '#000000',
       marginTop: 12,
       marginBottom: 12,
       borderRadius: 6,
       borderColor: "#AAAAAA",
       borderWidth: 2,
       justifyContent: 'center',
       alignItems: 'center'
    },});
