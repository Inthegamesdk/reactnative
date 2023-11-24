export interface OverlayProps {
  accountId: string;
  channelSlug: string;
  language: string;
  environment: string;
  secondaryChannelSlug?: string;
  foreignId: string;
  userName: string;
  userAvatar: string;
  videoResolution: string;
  blockMenu: boolean;
  blockNotifications: boolean;
  blockSlip: boolean;
  blockSidebar: boolean;
  injectionDelay: number;
}
