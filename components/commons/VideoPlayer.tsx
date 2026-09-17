"use client";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import dynamic from "next/dynamic";
import { Pause, Play } from "lucide-react";
import styles from "./VideoPlayer.module.css";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPlayer({ src }: { src: string }) {
  return (
    <MediaController className={styles.player} autohide="-1">
      <ReactPlayer
        slot="media"
        src={src}
        controls={false}
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "contain",
        }}
      />
      <div className={styles.controls}>
        <MediaControlBar className={styles.timeline}>
          <MediaTimeRange className={styles.progress} />
          <MediaTimeDisplay className={styles.time} showDuration noToggle />
        </MediaControlBar>
        <MediaControlBar className={styles.toolbar}>
          <MediaPlayButton className={`${styles.button} ${styles.play}`}>
            <Play slot="play" className={styles.playIcon} aria-hidden="true" />
            <Pause slot="pause" className={styles.playIcon} aria-hidden="true" />
            <span slot="tooltip-play">재생</span>
            <span slot="tooltip-pause">일시 정지</span>
          </MediaPlayButton>
          <MediaSeekBackwardButton
            className={`${styles.button} ${styles.backward}`}
            seekOffset={10}
          >
            <span slot="tooltip-content">10초 뒤로</span>
          </MediaSeekBackwardButton>
          <MediaSeekForwardButton
            className={`${styles.button} ${styles.forward}`}
            seekOffset={10}
          >
            <span slot="tooltip-content">10초 앞으로</span>
          </MediaSeekForwardButton>
          <span className={styles.spacer} aria-hidden="true" />
          <MediaMuteButton className={`${styles.button} ${styles.mute}`} />
          <MediaVolumeRange className={styles.volume} />
          <MediaPlaybackRateButton className={`${styles.button} ${styles.rate}`}>
            <span slot="tooltip-content">재생 속도</span>
          </MediaPlaybackRateButton>
          <MediaFullscreenButton className={`${styles.button} ${styles.fullscreen}`}>
            <span slot="tooltip-enter">전체 화면</span>
            <span slot="tooltip-exit">전체 화면 닫기</span>
          </MediaFullscreenButton>
        </MediaControlBar>
      </div>
    </MediaController>
  );
}
