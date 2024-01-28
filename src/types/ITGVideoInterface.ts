import type { ViewStyle } from 'react-native';
import type { VideoCallbacks } from './VideoCallbacks';
import type { ReactVideoSource } from 'react-native-video';




export interface VideoProps {
  videoStyle?:  ViewStyle;
  containerStyle?: ViewStyle;
  source?:
  ReactVideoSource;
  paused: boolean;
  muted: boolean;
  controls: boolean;
  resizeMode?: 'cover' | 'contain' | 'none' | 'stretch';
}

export type ITGVideoInterface = VideoProps & VideoCallbacks;
