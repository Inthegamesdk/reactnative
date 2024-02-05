import type { ViewStyle } from 'react-native';
import type { VideoCallbacks } from './VideoCallbacks';





export interface VideoProps {
  videoStyle?:  ViewStyle;
  containerStyle?: ViewStyle;
  source?: string;
  paused: boolean;
  muted: boolean;
  controls: boolean;
  resizeMode?: 'cover' | 'contain' | 'none' | 'stretch';
}

export type ITGVideoInterface = VideoProps & VideoCallbacks;
