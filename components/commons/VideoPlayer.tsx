"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [feedback, setFeedback] = useState<{
    action: "play" | "pause";
    id: number;
  } | null>(null);
  const feedbackId = useRef(0);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFeedback = useCallback((action: "play" | "pause") => {
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    setFeedback({ action, id: ++feedbackId.current });
    feedbackTimeout.current = setTimeout(() => setFeedback(null), 650);
  }, []);

  useEffect(() => () => {
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
  }, []);

  return (
    <MediaController className={styles.player} autohide="2">
      <ReactPlayer
        slot="media"
        src={src}
        controls={false}
        playsInline
        preload="metadata"
        onPlay={() => showFeedback("play")}
        onPause={() => showFeedback("pause")}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "contain",
        }}
      />
      {feedback && (
        <div
          key={feedback.id}
          slot="centered-chrome"
          className={styles.feedback}
          data-playback-feedback={feedback.action}
          aria-hidden="true"
        >
          {feedback.action === "play" ? <Play /> : <Pause />}
        </div>
      )}
      <div className={styles.controls}>
        <MediaControlBar className={styles.timeline}>
          <MediaTimeRange className={styles.progress} />
        </MediaControlBar>
        <MediaControlBar className={styles.toolbar}>
          <MediaPlayButton className={styles.button}>
            <Play slot="play" className={styles.playIcon} aria-hidden="true" />
            <Pause slot="pause" className={styles.playIcon} aria-hidden="true" />
            <span slot="tooltip-play">재생</span>
            <span slot="tooltip-pause">일시 정지</span>
          </MediaPlayButton>
          <div className={styles.volumeGroup}>
            <MediaMuteButton className={styles.button} />
            <MediaVolumeRange className={styles.volume} />
          </div>
          <MediaTimeDisplay className={styles.time} showDuration noToggle />
          <MediaSeekBackwardButton
            className={`${styles.button} ${styles.skip}`}
            seekOffset={10}
          >
            <span slot="tooltip-content">10초 뒤로</span>
          </MediaSeekBackwardButton>
          <MediaSeekForwardButton
            className={`${styles.button} ${styles.skip}`}
            seekOffset={10}
          >
            <span slot="tooltip-content">10초 앞으로</span>
          </MediaSeekForwardButton>
          <span className={styles.spacer} aria-hidden="true" />
          <MediaPlaybackRateButton className={`${styles.button} ${styles.rate}`}>
            <span slot="tooltip-content">재생 속도</span>
          </MediaPlaybackRateButton>
          <MediaFullscreenButton className={styles.button}>
            <span slot="tooltip-enter">전체 화면</span>
            <span slot="tooltip-exit">전체 화면 닫기</span>
          </MediaFullscreenButton>
        </MediaControlBar>
      </div>
    </MediaController>
  );
}
