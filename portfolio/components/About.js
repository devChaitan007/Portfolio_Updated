"use client";
import { motion } from "framer-motion";
import { site, skills } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="wrap about-in">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}>
  <motion.img
    src={site.photo} alt="Chaitanya Drona" className="photo"
    variants={{
      hidden: { clipPath: "inset(0 0 100% 0)" },
      show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1, ease: [0.2, 0.7, 0.2, 1] } },
    }}
  />
</motion.div>
        <div>
          <h2>I also write the software.</h2>
          <p className="lead">
            I'm studying B.Tech Computer Science at Poornima University, Jaipur (2023 to 2027) and I build MERN apps.
            My latest project is AI Business OS, a SaaS with a CRM for leads and opportunities, an AI email generator
            with automation, an AI chatbot, and an admin dashboard.
          </p>
          <p className="lead">Editing and code come from the same habit: break a messy problem into clean steps.</p>
          <dl className="skills">
            {skills.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
          <div className="btns">
            <a className="btn" href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn" href={site.resume} download>Resume (PDF)</a>
          </div>
        </div>
      </div>
    </section>
  );
}
