"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Phone from "./Phone";
import { reels } from "@/data/site";

export default function Work() {
  const ref = useRef(null);
  const vids = useRef([]);
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(Math.min(reels.length - 1, Math.max(0, Math.floor(v * reels.length))))
  );

  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      v.muted = !sound;
      if (i === active) v.play().catch(() => {});
      else { v.pause(); v.currentTime = 0; }
    });
  }, [active, sound]);

  const jump = (i) => {
    const el = ref.current;
    const top = el.offsetTop + ((i + 0.5) / reels.length) * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="work" className="work" ref={ref}>
      <div className="stick wrap">
        <div className="work-text">
          <h2>Four reels, cut for the phone.</h2>
          <ul className="rows">
            {reels.map((r, i) => (
              <li key={r.title}>
                <button className={`row ${i === active ? "on" : ""}`} onClick={() => jump(i)} aria-current={i === active}>
                  <span className="row-top"><span className="row-title">{r.title}</span><span className="len">{r.length}</span></span>
                  <span className="note-wrap"><span className="note">{r.note}</span></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="work-phone">
          <Phone className="tall">
            {reels.map((r, i) => (
              <video
                key={r.src}
                ref={(el) => (vids.current[i] = el)}
                src={r.src}
                poster={r.poster}
                loop
                muted
                playsInline
                preload="metadata"
                className={i === active ? "show" : ""}
              />
            ))}
          </Phone>
          <button className="snd" onClick={() => setSound((s) => !s)} aria-pressed={sound}>
            {sound ? "Sound on" : "Sound off, tap to hear"}
          </button>
        </div>
      </div>
    </section>
  );
}
