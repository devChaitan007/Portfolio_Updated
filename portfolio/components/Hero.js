"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Phone from "./Phone";
import { site, reels, headline } from "@/data/site";

const words = headline.split(" ");

export default function Hero() {
  const [now, setNow] = useState(-1);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 7]);

  // Karaoke captions: the same effect used in the reels, applied to the headline.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setNow(words.length); return; }
    let i = -1;
    const t = setInterval(() => { i = i > words.length + 6 ? -1 : i + 1; setNow(i); }, 330);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="wrap hero-in">
        <div>
          <h1 aria-label={headline}>
            {words.map((w, i) => (
              <span key={i} aria-hidden="true" className={`w ${i === now ? "now" : i < now ? "done" : ""}`}>{w}</span>
            ))}
          </h1>
          <p className="sub">{site.name}. Video editor and full-stack developer in Jaipur.</p>
          <div className="btns">
            <a className="btn solid" href="#work">Watch the reels</a>
            <a className="btn" href={site.resume} download>Download resume</a>
          </div>
        </div>
        <motion.div style={{ y, rotate }} className="hero-phone">
          <Phone>
            <video src={reels[0].src} poster={reels[0].poster} autoPlay muted loop playsInline preload="metadata" />
          </Phone>
        </motion.div>
      </div>
    </section>
  );
}
