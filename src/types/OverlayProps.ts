import type { ReactNode } from "react";

export interface OverlayProps {
  children?: ReactNode
  accountId: string;
  channelSlug: string;
  language?: string;
  environment: string;
  secondaryChannelSlug?: string;
  foreignId?: string;
  userName?: string;
  userAvatar?: string;
  videoResolution?: string;
  blockMenu?: boolean;
  blockNotifications?: boolean;
  blockSlip?: boolean;
  blockSidebar?: boolean;
  injectionDelay?: number;
  currentTime: number;
  videoPlaybackState: boolean;
  videoDuration: number;
}
