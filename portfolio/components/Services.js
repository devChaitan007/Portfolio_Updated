
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clapperboard, Captions, Mic2, Smartphone } from "lucide-react";
import { services } from "@/data/site";

const icons = [Clapperboard, Captions, Mic2, Smartphone];

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="services section-pad" id="services">
      <div className="wrap">
        <motion.div
          className="section-heading services-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              WHAT I CAN DO FOR YOU
            </span>
            <h2>
              Good stories deserve
              <br />
              <span className="text-gradient">great editing.</span>
            </h2>
          </div>

          <p className="services-intro">
            From the first-second hook to the final caption, I shape raw
            footage into short-form videos that feel clear, polished, and
            engaging.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.article
                className={`service-card service-${service.color}`}
                key={service.number}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.09,
                }}
                whileHover={reduceMotion ? undefined : { y: -7 }}
              >
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>
                  <span className="service-icon">
                    <Icon size={23} strokeWidth={1.8} />
                  </span>
                </div>

                <p className="service-category">{service.category}</p>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-card-bottom">
                  <span>CREATIVE DETAIL MATTERS</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="services-note">
          <span className="services-note-icon">
            <Clapperboard size={20} />
          </span>
          <p>
            Have a video in mind? Let&apos;s turn your footage into a story
            worth watching.
          </p>
          <a href="#contact" aria-label="Discuss a video editing project">
            Let&apos;s talk <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
