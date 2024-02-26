import type { ViewStyle } from 'react-native';
import type { ITGOverlayInterface } from './ITGOverlayInterface';
import type { ITGVideoInterface } from './ITGVideoInterface';

export type ITGVideoOverlayInterface = ITGOverlayInterface & ITGView;
export interface ITGOverlayRef {
    closeMenu: () => void,
    closeAccount: () => void,
    closeLeaderboard: () => void,
    closeShop: () => void,
    closeSidebar: () => void,
    closeAll: () => void,
    openAccount: () => void,
    openLeaderboard: () => void,
    openShop: () => void,
    setLiveMode: (enabled: boolean) => void,
    }

    export type  ITGView = {
        videoStyle?: ViewStyle,
        containerStyle?: ViewStyle;
        currentTime: number;
        videoPlaybackState: boolean
        videoDuration:  number
    }