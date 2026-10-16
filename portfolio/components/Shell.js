"use client";
import { MotionConfig } from "framer-motion";
export default function Shell({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
