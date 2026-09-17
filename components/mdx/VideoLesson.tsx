import type { ReactNode } from "react";
import VideoPlayer from "@/components/commons/VideoPlayer";
import styles from "./VideoLesson.module.css";

export default function VideoLesson({
  src,
  children,
}: {
  src: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.lesson}>
      {src ? (
        <VideoPlayer src={src} />
      ) : (
        <div className={styles.placeholder}>강의 영상을 준비하고 있어요.</div>
      )}
      <div className={styles.body}>{children}</div>
    </article>
  );
}
