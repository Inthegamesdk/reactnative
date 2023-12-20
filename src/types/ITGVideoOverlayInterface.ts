import type { ITGOverlayInterface } from './ITGOverlayInterface';
import type { ITGVideoInterface } from './ITGVideoInterface';

export type ITGVideoOverlayInterface = ITGOverlayInterface & ITGVideoInterface;
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