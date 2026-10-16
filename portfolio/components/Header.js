"use client";
import { motion, useScroll } from "framer-motion";
import { site } from "@/data/site";

export default function Header() {
  const { scrollYProgress } = useScroll();
  return (
    <header className="head">
      <div className="wrap head-in">
        <a href="#top" className="logo">{site.name}</a>
        <nav aria-label="Primary">
          <a href="#work">Reels</a>
          <a href="#craft">Process</a>
          <a href="#about">Developer</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
    </header>
  );
}
