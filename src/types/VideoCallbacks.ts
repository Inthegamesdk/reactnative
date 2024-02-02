import type { VideoCallback } from './VideoCallback';

export interface VideoCallbacks {
  onAudioBecomingNoisy?: VideoCallback;
  onBandwidthUpdate?: VideoCallback;
  onEnd?: VideoCallback;
  onternalPlaybackChange?: VideoCallback;
  onFullscreenPlayerWillPresent?: VideoCallback;
  onFullscreenPlayerDidPresent?: VideoCallback;
  onFullscreenPlayerWillDismiss?: VideoCallback;
  onFullscreenPlayerDidDismiss?: VideoCallback;
  onLoad?: VideoCallback;
  onLoadStart?: VideoCallback;
  onPlaybackResume?: VideoCallback;
  onReadyForDisplay?: VideoCallback;
  onPictureInPictureStatusChanged?: VideoCallback;
  onPlaybackRateChange?: VideoCallback;
  onProgress?: VideoCallback;
  onSeek?: VideoCallback;
  onRestoreUserInterfaceForPictureInPictureStop?: VideoCallback;
  onTimedMetadata?: VideoCallback;
}
