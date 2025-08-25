import React from "react";
import {
  BookOpen,
  Award,
  Calendar,
  Trophy,
  Star,
  Code2,
  Rocket,
  FileDown,
  ArrowRight,
  Mail,
  Building2,
  MapPin,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { competitiveProfiles, experienceData } from "../data/portfolioData";

function getCurrentRole(exps) {
  const roles = exps.flatMap((c) =>
    c.roles.map((r) => ({ ...r, company: c.company }))
  );
  const present = roles.filter(
    (r) => String(r.end).toLowerCase() === "present"
  );
  const ref = present.length ? present : roles;
  const monthIndex = (m) =>
    [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ].indexOf(String(m).slice(0, 3).toLowerCase());
  const parseMY = (s) => {
    if (!s) return { y: -Infinity, m: -1 };
    const cleaned = String(s)
      .replace(/\u00A0/g, " ")
      .trim();
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

// --- Framer Motion variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const gridStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const hoverLift = {
  hover: {
    y: -4,
    scale: 1.01,
    transition: { type: "spring", stiffness: 280, damping: 18 },
  },
  tap: { scale: 0.99 },
};

const SummarySection = ({ setActiveSection }) => {
  const { totalSolvedAllOJ, codeforces, codechef } = competitiveProfiles;
  const tech = ["Go", "React", "Node.js", "PostgreSQL", "Docker"];
  const current = getCurrentRole(experienceData);
  const prefersReducedMotion = useReducedMotion();
  const currentURL = window.location.href;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <BookOpen className="text-blue-400" />
        Summary
      </h2>

      <motion.div
        variants={gridStagger}
        initial="hidden"
        animate="visible"
        className="grid xl:grid-cols-3 gap-6"
      >
        {/* Left: About + Current Job + Current Focus */}
        <div className="xl:col-span-2 space-y-6">
          {/* About */}
          <motion.div
            variants={cardVariants}
            whileHover={prefersReducedMotion ? undefined : hoverLift.hover}
            whileTap={hoverLift.tap}
            className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5"
          >
            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              About Me
            </h3>
            <p className="text-white/80 leading-relaxed">
              I'm a passionate Computer Science Engineer specializing in
              competitive programming and full-stack development. With a strong
              foundation in algorithms and data structures, I've solved over{" "}
              {totalSolvedAllOJ}+ problems across online judges and achieved
              notable contest rankings.
            </p>
          </motion.div>

          {/* Current Job */}
          {current && (
            <motion.div
              variants={cardVariants}
              whileHover={prefersReducedMotion ? undefined : hoverLift.hover}
              whileTap={hoverLift.tap}
              className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10 p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-white/80">
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      {current.title}
                    </h3>
                    <span className="text-white/40">•</span>
                    <span className="text-purple-300/90 font-medium">
                      {current.company?.name}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/70">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={16} className="text-blue-300" />
                      {current.start} — {current.end}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} className="text-green-300" />{" "}
                      {current.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Building2 size={16} className="text-sky-300" />{" "}
                      {current.type}
                    </span>
                  </div>
                </div>
                <motion.button
                  onClick={() => setActiveSection("experience")}
                  className="inline-flex items-center gap-2 self-start rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
                  whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View <ArrowRight size={16} />
                </motion.button>
              </div>
              {current.tech?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.tech.slice(0, 6).map((t) => (
                    <motion.span
                      key={t}
                      className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300 ring-1 ring-inset ring-blue-300/20"
                      whileHover={
                        prefersReducedMotion ? undefined : { scale: 1.05 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              ) : null}
            </motion.div>
          )}

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <motion.button
              onClick={() => setActiveSection("competitive")}
              className="text-left rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:bg-white/10 transition"
              whileHover={prefersReducedMotion ? undefined : hoverLift.hover}
              whileTap={hoverLift.tap}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">
                  Problems Solved (All OJs)
                </span>
                <Code2 size={18} className="text-blue-300" />
              </div>
              <div className="text-2xl font-bold">{totalSolvedAllOJ}+</div>
              <div className="mt-1 text-white/70 text-sm">See profiles →</div>
            </motion.button>

            <motion.button
              onClick={() => setActiveSection("competitive")}
              className="text-left rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-amber-500/10 to-red-500/10 hover:bg-white/10 transition"
              whileHover={prefersReducedMotion ? undefined : hoverLift.hover}
              whileTap={hoverLift.tap}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Codeforces Max</span>
                <Trophy size={18} className="text-amber-300" />
              </div>
              <div className="text-2xl font-bold">{codeforces.maxRating}</div>
              <div className="mt-1 text-white/70 text-sm">
                {codeforces.rankTitle}
              </div>
            </motion.button>

            <motion.button
              onClick={() => setActiveSection("competitive")}
              className="text-left rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 hover:bg-white/10 transition"
              whileHover={prefersReducedMotion ? undefined : hoverLift.hover}
              whileTap={hoverLift.tap}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">CodeChef</span>
                <Star size={18} className="text-yellow-300" />
              </div>
              <div className="text-2xl font-bold">{codechef.stars}★</div>
              <div className="mt-1 text-white/70 text-sm">
                Max {codechef.maxRating}
              </div>
            </motion.button>
          </div>

          {/* Currently working on */}
          <motion.div
            variants={cardVariants}
            whileHover={prefersReducedMotion ? undefined : hoverLift.hover}
            whileTap={hoverLift.tap}
            className="rounded-2xl p-5 ring-1 ring-white/10 bg-white/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Rocket size={18} className="text-emerald-300" />
              <h3 className="text-lg font-semibold text-emerald-300">
                Currently working on
              </h3>
            </div>
            <ul className="list-disc pl-5 text-white/80 space-y-1">
              <li>Learning Golang.</li>
              <li>Learning System Design.</li>
            </ul>
          </motion.div>
        </div>

        {/* Right column: Education + Tech + CTAs */}
        <div className="space-y-6">
          {/* Education */}
          <motion.div
            variants={cardVariants}
            whileHover={prefersReducedMotion ? undefined : hoverLift.hover}
            whileTap={hoverLift.tap}
            className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5"
          >
            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              Education
            </h3>
            <h4 className="text-base md:text-lg font-semibold mb-1">
              B.Sc. (Eng.) in Computer Science and Engineering
            </h4>
            <p className="text-purple-300 font-medium mb-2">
              Comilla University
            </p>
            <div className="flex items-center text-white/80 mb-1">
              <Calendar size={16} className="mr-2" />
              January 2020 – July 2025
            </div>
            <div className="flex items-center text-white/80">
              <Award size={16} className="mr-2" />
              CGPA: 3.30 out of 4.00
            </div>
          </motion.div>

          {/* Tech chips with tooltips */}
          <Tooltip.Provider delayDuration={150}>
            <motion.div
              variants={cardVariants}
              whileHover={prefersReducedMotion ? undefined : hoverLift.hover}
              whileTap={hoverLift.tap}
              className="rounded-2xl p-5 ring-1 ring-white/10 bg-white/5"
            >
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Core Tech
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <Tooltip.Root key={t}>
                    <Tooltip.Trigger asChild>
                      <motion.span
                        className="px-3 py-1 rounded-lg text-sm ring-1 ring-blue-400/30 bg-gradient-to-r from-blue-500/15 to-purple-500/15 hover:bg-white/10 cursor-default"
                        whileHover={
                          prefersReducedMotion ? undefined : { scale: 1.05 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {t}
                      </motion.span>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      className="rounded-md px-2 py-1 text-xs bg-black/80 ring-1 ring-white/10 text-white shadow"
                    >
                      {`I use ${t} extensively in projects`}
                      <Tooltip.Arrow className="fill-black/80" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                ))}
              </div>
            </motion.div>
          </Tooltip.Provider>

          {/* CTAs */}
          <motion.div
            variants={cardVariants}
            whileHover={prefersReducedMotion ? undefined : hoverLift.hover}
            whileTap={hoverLift.tap}
            className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-blue-600/10 to-purple-600/10"
          >
            <div className="grid grid-cols-1 gap-3">
              <motion.button
                onClick={() => setActiveSection("projects")}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition"
                whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">Explore Projects</span>
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                onClick={() => setActiveSection("competitive")}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition"
                whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">See Contest History</span>
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                onClick={() => setActiveSection("blog")}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition"
                whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">Read Blog</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>

            {/* Resume + Email */}
            <div className="mt-4 flex items-center gap-2">
              <a
                href={`${currentURL}/Ahnaf_Hasan_Shifat.pdf`}
                className="px-3 py-2 flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-900/30 transition text-sm"
                target="_blank"
              >
                <FileDown size={16} />
                Resume
              </a>
              <motion.a
                href="mailto:sheikhahnafshifat@gmail.com"
                className="px-3 py-2 rounded-lg bg-white/10 text-white inline-flex items-center gap-2 hover:bg-white/15 transition text-sm"
                whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={16} />
                Email Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SummarySection;
