
"use client";

import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
} from "lucide-react";

export default function ProjectVideo({
  src,
  poster,
  title,
  activeVideo,
  setActiveVideo,
  videoId,
}) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const isActive = activeVideo === videoId;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    } else {
      video.pause();
      video.currentTime = video.currentTime;
    }
  }, [isActive]);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && !video.paused) {
      video.pause();
      setActiveVideo(null);
      return;
    }

    setActiveVideo(videoId);

    try {
      await video.play();
    } catch (error) {
      console.error("Video playback failed:", error);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function replay() {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setActiveVideo(videoId);

    video.play().catch((error) => {
      console.error("Video replay failed:", error);
    });
  }

  return (
    <div className="project-video-player">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        muted={muted}
        onPlay={() => setActiveVideo(videoId)}
        onPause={() => {
          if (activeVideo === videoId) {
            setActiveVideo(null);
          }
        }}
        onEnded={() => setActiveVideo(null)}
        onClick={togglePlayback}
        aria-label={title}
      />

      {(!isActive || videoRef.current?.paused) && (
        <button
          type="button"
          className="project-play"
          onClick={togglePlayback}
          aria-label={`Play ${title}`}
        >
          <Play size={23} fill="currentColor" />
        </button>
      )}

      <div className="project-video-controls">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isActive ? "Pause video" : "Play video"}
        >
          {isActive ? <Pause size={17} /> : <Play size={17} />}
        </button>

        <button type="button" onClick={replay} aria-label="Replay video">
          <RotateCcw size={16} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>
    </div>
  );
}
