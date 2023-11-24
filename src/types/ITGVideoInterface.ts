import type { ViewStyle } from 'react-native';
import type { VideoCallbacks } from './VideoCallbacks';




interface VideoProps {
  videoStyle: ViewStyle;
  containerStyle?: ViewStyle;
  source:
    | {
        uri?: string | undefined;
        headers?: { [key: string]: string } | undefined;
        type?: string | undefined;
      }
    | number;
  paused: boolean;
  muted: boolean;
  controls: boolean;
  resizeMode?: 'cover' | 'contain' | 'none' | 'stretch';
}

export type ITGVideoInterface = VideoProps & VideoCallbacks;
