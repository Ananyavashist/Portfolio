"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cinematic } from "@/content/cinematic";
import { asset } from "@/lib/asset";

const CAPTION_LEAD_SECONDS = 3;

export function IntroVideo({ onFinish }: { onFinish: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [captionVisible, setCaptionVisible] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    // Some browsers reject the autoplay promise even when muted; the intro must
    // never trap the visitor behind a frozen first frame.
    const attempt = node.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => onFinish());
    }
  }, [onFinish]);

  const handleTimeUpdate = useCallback(() => {
    const node = videoRef.current;
    if (!node || !Number.isFinite(node.duration)) return;
    setCaptionVisible(node.duration - node.currentTime <= CAPTION_LEAD_SECONDS);
  }, []);

  return (
    <div
      id="IntroVideo"
      data-ui="IntroVideo"
      className="relative h-full w-full overflow-hidden bg-[var(--cinematic-black)]"
    >
      {/* Reproduces object-cover as a real box so the caption can be placed in
          the video's own coordinate space rather than the viewport's. */}
      <div
        id="IntroVideoFrame"
        data-ui="IntroVideoFrame"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "max(100vw, calc(100svh * 16 / 9))",
          height: "max(100svh, calc(100vw * 9 / 16))",
        }}
      >
        <video
          ref={videoRef}
          src={asset(cinematic.video)}
          className="h-full w-full"
          autoPlay
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          onTimeUpdate={handleTimeUpdate}
          onEnded={onFinish}
          onError={onFinish}
        />
        <motion.p
          id="IntroCaption"
          data-ui="IntroCaption"
          className="pointer-events-none absolute inset-x-0 bottom-[82%] whitespace-nowrap text-center leading-none text-white text-[clamp(1rem,2.2vw,2rem)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: captionVisible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {cinematic.caption}
        </motion.p>
      </div>
    </div>
  );
}
