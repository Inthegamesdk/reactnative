/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import type {Node} from 'react';
import ReactNative, {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  BackHandler,
  TVEventControl,
  LogBox,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Video from 'react-native-video';
import KeyEvent from 'react-native-keyevent';
import ITGOverlay from './ITGOverlay.js';
import HomeScreen from './HomeScreen.js';
import PlayerScreen from './PlayerScreen.js';

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])

const Stack = createStackNavigator();

const App = () => {
return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Player" component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
