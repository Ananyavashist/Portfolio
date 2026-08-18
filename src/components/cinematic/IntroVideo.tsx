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
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[var(--cinematic-black)]"
    >
      <video
        ref={videoRef}
        src={asset(cinematic.video)}
        className="h-full w-full object-contain"
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
        className="pointer-events-none absolute inset-x-0 bottom-[82%] whitespace-nowrap text-center text-[36px] leading-none text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: captionVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {cinematic.caption}
      </motion.p>
    </div>
  );
}
