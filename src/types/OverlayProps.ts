import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

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
  blockAll?: boolean;
  blockNotifications?: boolean;
  blockSlip?: boolean;
  blockSidebar?: boolean;
  injectionDelay?: number;
}
