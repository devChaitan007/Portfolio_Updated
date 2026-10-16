
"use client";

import { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Film,
  Captions,
  Clapperboard,
} from "lucide-react";

import ProjectVideo from "./ProjectVideo";
import { reels } from "@/data/site";

const categories = [
  "All",
  "Motivational",
  "Podcast",
  "Storytelling",
];

const reelInfo = [
  {
    category: "Motivational",
    focus: "Captions & emphasis",
    number: "01",
  },
  {
    category: "Podcast",
    focus: "Conversation pacing",
    number: "02",
  },
  {
    category: "Storytelling",
    focus: "B-roll & captions",
    number: "03",
  },
  {
    category: "Podcast",
    focus: "Multi-speaker storytelling",
    number: "04",
  },
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);

  const reduceMotion = useReducedMotion();

  const projects = useMemo(
    () =>
      reels.map((reel, index) => ({
        ...reel,
        ...(reelInfo[index] || {
          category: "Storytelling",
          focus: "Creative editing",
          number: String(index + 1).padStart(2, "0"),
        }),
        index,
      })),
    []
  );

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  function handleCategoryChange(category) {
    setActiveCategory(category);

    // Stop the current video when switching categories.
    setActiveVideo(null);
  }

  return (
    <section className="work section-pad" id="work">
      <div className="wrap">
        {/* Section heading */}
        <motion.div
          className="work-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              THE EDITING PLAYGROUND
            </span>

            <h2>
              A few frames.
              <br />
              <span className="text-gradient">A whole story.</span>
            </h2>
          </div>

          <p className="work-intro">
            Every cut has a purpose. Explore selected edits focused on
            storytelling, pacing, captions, and visual rhythm.
          </p>
        </motion.div>

        {/* Project count and category filters */}
        <div className="work-toolbar">
          <div className="work-count">
            <Film size={17} />
            <span>
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "PROJECT"
                : "PROJECTS"}
            </span>
          </div>

          <div
            className="work-filters"
            aria-label="Filter projects"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`work-filter ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Animated video gallery */}
        <motion.div layout className="work-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.src || project.title}
                className={`project-card project-card-${
                  project.index % 4
                }`}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 24 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.97 }
                }
                transition={{ duration: 0.35 }}
              >
                {/* Video player */}
                <div className="project-media">
                  <ProjectVideo
                    src={project.src}
                    poster={project.poster}
                    title={project.title}
                    videoId={project.index}
                    activeVideo={activeVideo}
                    setActiveVideo={setActiveVideo}
                  />

                  <span className="project-format">
                    <Clapperboard size={13} />
                    VERTICAL EDIT
                  </span>

                  <span className="project-duration">
                    {project.length}
                  </span>
                </div>

                {/* Project details */}
                <div className="project-content">
                  <div className="project-meta">
                    <span>{project.category}</span>

                    <span>
                      {project.number} /{" "}
                      {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{project.title}</h3>

                  <p className="project-note">
                    {project.note}
                  </p>

                  <div className="project-focus">
                    <Captions size={16} />

                    <span>{project.focus}</span>

                    <a
                      href="#contact"
                      className="project-detail"
                      aria-label={`Discuss an edit like ${project.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Gallery footer */}
        <div className="work-footer">
          <span className="work-footer-star">✳</span>

          <p>
            Different stories. Different rhythms. Always edited with
            intention.
          </p>

          <a href="#contact">
            Have a project? <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
