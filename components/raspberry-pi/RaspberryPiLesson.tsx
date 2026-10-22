"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import BoardDiagram from "./BoardDiagram";
import { boardViews, isPartId, type PartId } from "./board";
import { getActivePart } from "./scroll";
import styles from "./RaspberryPiLesson.module.css";

const BoardCanvas = dynamic(() => import("./BoardCanvas"), { ssr: false });

class ModelBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function RaspberryPiLesson({
  children,
}: {
  children: ReactNode;
}) {
  const lesson = useRef<HTMLElement>(null);
  const article = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLElement>(null);
  const [active, setActive] = useState<PartId>("overview");
  const [reducedMotion, setReducedMotion] = useState(true);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = lesson.current;
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!root || !header) return;
    // The site header can wrap on narrow screens or while the profile loads.
    // Keep both the sticky model and anchor offsets below its actual height.
    const syncOffset = () => {
      root.style.setProperty(
        "--pi-header-offset",
        `${header.getBoundingClientRect().height + 12}px`,
      );
    };
    const observer = new ResizeObserver(syncOffset);
    observer.observe(header);
    syncOffset();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const content = article.current;
    const model = figure.current;
    if (!content || !model) return;
    const sections = Array.from(
      content.querySelectorAll<HTMLElement>("[data-pi-section]"),
    );
    let pending = 0;
    const update = () => {
      pending = 0;
      const modelRect = model.getBoundingClientRect();
      // Query the actual layout, so the open sidebar and container breakpoints
      // use the same reading line as the page, including nested scrolling.
      const stacked = getComputedStyle(model).gridColumnStart !== "2";
      const readingLine = stacked
        ? Math.min(window.innerHeight - 24, Math.max(0, modelRect.bottom) + 48)
        : window.innerHeight * 0.36;
      const id = getActivePart(
        sections.map((section) => ({
          id: section.dataset.piSection ?? "overview",
          top: section.getBoundingClientRect().top,
        })),
        readingLine,
      );
      if (isPartId(id)) setActive(id);
    };
    const schedule = () => {
      if (!pending) pending = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(content);
    resize.observe(model);
    window.addEventListener("scroll", schedule, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(pending);
      resize.disconnect();
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const view = boardViews[active];
  const fallback = (
    <>
      <BoardDiagram active={active} />
      <div className={styles.fallbackNote}>
        3D를 표시할 수 없어 부품 배치도로 보여줍니다.
      </div>
    </>
  );

  return (
    <article ref={lesson} className={styles.lesson}>
      <div className={styles.layout}>
        <figure
          ref={figure}
          className={styles.viewer}
          aria-label="스크롤과 함께 살펴보는 라즈베리파이"
          data-active-part={active}
        >
          <a className={styles.skipLink} href="#overview">
            본문으로 이동
          </a>
          <div className={styles.viewerTitle}>
            <strong>Raspberry Pi 4</strong>
            <span>Model B · 1GB</span>
          </div>
          <div className={styles.viewport}>
            <BoardDiagram active={active} />
            <div className={styles.renderLayer}>
              <ModelBoundary fallback={fallback}>
                {contextLost ? (
                  fallback
                ) : (
                  <BoardCanvas
                    active={active}
                    reducedMotion={reducedMotion}
                    onContextLost={() => setContextLost(true)}
                    fallback={fallback}
                  />
                )}
              </ModelBoundary>
            </div>
          </div>
          <figcaption
            className={styles.caption}
            aria-live="polite"
            aria-atomic="true"
          >
            <strong style={{ color: view.color }}>{view.label}</strong>
            <span>{view.detail}</span>
          </figcaption>
        </figure>
        <div ref={article} className={styles.prose}>
          {children}
        </div>
      </div>
    </article>
  );
}
