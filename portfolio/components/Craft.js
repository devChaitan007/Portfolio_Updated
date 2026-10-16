"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { passes } from "@/data/site";

const bars = Array.from({ length: 96 }, (_, i) =>
  Math.round(18 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.37)) * 78)
);
const lanes = [
  { name: "Hook", clips: [{ w: 100, label: "Pinned title", tone: "pink" }] },
  { name: "Video", clips: [
    { w: 22, label: "Speaker", tone: "clip" }, { w: 12, label: "B-roll", tone: "alt" },
    { w: 26, label: "Speaker", tone: "clip" }, { w: 10, label: "B-roll", tone: "alt" }, { w: 30, label: "Guest", tone: "clip" } ] },
  { name: "Captions", clips: Array.from({ length: 18 }, () => ({ w: 100 / 18, label: "", tone: "yel" })) },
];

const grow = (d) => ({
  initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.7, delay: d, ease: [0.2, 0.7, 0.2, 1] }, style: { originX: 0 },
});

export default function Craft() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 35%"] });
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="craft" className="craft" ref={ref}>
      <div className="wrap">
        <h2>Every reel gets the same four passes.</h2>
        <div className="timeline" role="img" aria-label="Editing timeline with hook, video, caption and audio tracks">
          <div className="rail"><motion.div className="playhead" style={{ left }} /></div>
          {lanes.map((l, li) => (
            <div className="lane" key={l.name}>
              <span className="lane-name">{l.name}</span>
              <div className="clips">
                {l.clips.map((c, ci) => (
                  <motion.div key={ci} className={`clip ${c.tone}`} style={{ width: `${c.w}%`, originX: 0 }}
                    {...grow(li * 0.15 + ci * 0.04)}>{c.label}</motion.div>
                ))}
              </div>
            </div>
          ))}
          <div className="lane">
            <span className="lane-name">Sound</span>
            <div className="wave">
              {bars.map((h, i) => (
                <motion.i key={i} style={{ height: `${h}%`, originY: 0.5 }} initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 + i * 0.008 }} />
              ))}
            </div>
          </div>
        </div>
        <div className="passes">
          {passes.map((p) => (
            <div key={p.name}><h3>{p.name}</h3><p>{p.text}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
