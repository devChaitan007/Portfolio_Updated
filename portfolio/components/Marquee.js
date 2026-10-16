
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

const phrases = [
  "STORY FIRST",
  "CUT WITH PURPOSE",
  "CAPTIONS THAT POP",
  "CREATIVE ENERGY",
  "SCROLL-STOPPING EDITS",
];

export default function Marquee() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="creative-marquee" aria-label="Editing philosophy">
      <div className="marquee-track">
        <motion.div
          className="marquee-content"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 28,
                  ease: "linear",
                  repeat: Infinity,
                }
          }
        >
          {[0, 1].map((copy) => (
            <div
              className="marquee-group"
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {phrases.map((phrase, index) => (
                <span className="marquee-item" key={`${copy}-${phrase}`}>
                  {phrase}
                  <Sparkles
                    className={`marquee-sparkle sparkle-${index % 3}`}
                    size={19}
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
