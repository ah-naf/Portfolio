import React from "react";
import { Linkedin, Github, Mail, BookOpen, Calendar, MapPin, FileDown } from "lucide-react";
import { motion } from "framer-motion";
import { profile, experienceData } from "../data/portfolioData";

const RESUME_URL = "https://ah-naf.github.io/Portfolio/Ahnaf_Hasan_Shifat.pdf";

function getCurrentRole(exps) {
  const roles = exps.flatMap((c) =>
    c.roles.map((r) => ({ ...r, company: c.company }))
  );
  const present = roles.filter(
    (r) => String(r.end).toLowerCase() === "present"
  );
  const ref = present.length ? present : roles;
  const monthIndex = (m) =>
    ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
      .indexOf(String(m).slice(0, 3).toLowerCase());
  const parseMY = (s) => {
    if (!s) return { y: -Infinity, m: -1 };
    const cleaned = String(s).replace(/\u00A0/g, " ").trim();
    const [m, y] = cleaned.split(/\s+/);
    const mi = monthIndex(m);
    const yi = parseInt(y, 10);
    return { y: isNaN(yi) ? -Infinity : yi, m: mi < 0 ? -1 : mi };
  };
  return ref.slice().sort((a, b) => {
    const A = parseMY(a.start);
    const B = parseMY(b.start);
    if (A.y !== B.y) return B.y - A.y;
    return B.m - A.m;
  })[0];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  const current = getCurrentRole(experienceData);

  return (
    <section
      className="dot-grid min-h-[88vh] flex items-center pt-20 pb-12"
    >
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT: Name + bio + social links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              — {profile.title}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-6 tracking-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              AHNAF
              <br />
              HASAN
              <br />
              <span style={{ color: "var(--color-accent)" }}>SHIFAT</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base mb-8 max-w-xs leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Building robust systems and solving algorithmic challenges.
              2500+ problems solved. Currently building at NiftyCoders.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2.5"
            >
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-icon p-2.5"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-icon p-2.5"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="neo-btn-icon p-2.5"
                aria-label="Email"
                title="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href={profile.links.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-icon p-2.5"
                aria-label="Blog"
                title="Medium Blog"
              >
                <BookOpen size={18} />
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-primary px-5 py-2.5 gap-2"
              >
                <FileDown size={16} />
                Resume
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Current role card */}
          {current && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <div
                className="neo-card-accent p-7 w-full max-w-sm"
              >
                {/* Status */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse"
                    aria-hidden="true"
                  />
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    Currently
                  </span>
                </div>

                {/* Title + company */}
                <h2
                  className="text-2xl font-extrabold mb-1 leading-tight"
                  style={{ color: "#ffffff" }}
                >
                  {current.title}
                </h2>
                <p
                  className="font-semibold mb-5"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                >
                  @ {current.company?.name}
                </p>

                {/* Meta */}
                <div
                  className="flex flex-col gap-2 text-sm mb-5"
                  style={{ color: "rgba(255,255,255,0.68)" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={14} />
                    {current.start} — {current.end}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={14} />
                    {current.location}
                  </span>
                </div>

                {/* Tech chips */}
                {current.tech?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {current.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-semibold rounded"
                        style={{
                          background: "rgba(255,255,255,0.18)",
                          color: "#ffffff",
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
