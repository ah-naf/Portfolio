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
  Sparkles,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion, useReducedMotion } from "framer-motion";
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
      "jan", "feb", "mar", "apr", "may", "jun",
      "jul", "aug", "sep", "oct", "nov", "dec",
    ].indexOf(String(m).slice(0, 3).toLowerCase());
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
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
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="rounded-3xl glass p-6 md:p-8 text-white/90"
    >
      {/* Header with animated icon */}
      <motion.div variants={cardVariants} className="flex items-center gap-3 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 ring-1 ring-white/10">
            <BookOpen className="text-purple-400" size={24} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">Summary</h2>
          <p className="text-sm text-white/50">Quick overview of my journey</p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid xl:grid-cols-3 gap-6"
      >
        {/* Left: About + Current Job + Quick Stats */}
        <div className="xl:col-span-2 space-y-6">
          {/* About */}
          <motion.div
            variants={cardVariants}
            className="group rounded-2xl p-6 bg-white/5 ring-1 ring-white/10 hover:ring-purple-500/30 transition-all duration-300 card-hover"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-purple-400" />
              <h3 className="text-lg font-semibold gradient-text">About Me</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              I'm a passionate Computer Science Engineer specializing in
              competitive programming and full-stack development. With a strong
              foundation in algorithms and data structures, I've solved over{" "}
              <span className="text-cyan-400 font-semibold">{totalSolvedAllOJ}+</span> problems 
              across online judges and achieved notable contest rankings.
            </p>
          </motion.div>

          {/* Current Job */}
          {current && (
            <motion.div
              variants={cardVariants}
              className="group rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 ring-1 ring-white/10 hover:ring-purple-500/30 transition-all duration-300 card-hover"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {current.title}
                    </h3>
                    <span className="text-white/30">•</span>
                    <span className="text-purple-300 font-medium">
                      {current.company?.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={14} className="text-blue-400" />
                      {current.start} — {current.end}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={14} className="text-green-400" />
                      {current.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Building2 size={14} className="text-cyan-400" />
                      {current.type}
                    </span>
                  </div>
                </div>
                <motion.button
                  onClick={() => setActiveSection("experience")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 text-sm font-medium transition-all"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View <ArrowRight size={16} />
                </motion.button>
              </div>
              {current.tech?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.tech.slice(0, 6).map((t) => (
                    <motion.span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/20"
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Quick Stats */}
          <motion.div variants={cardVariants} className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: "Problems Solved",
                value: `${totalSolvedAllOJ}+`,
                sub: "All OJs Combined",
                icon: <Code2 size={20} />,
                gradient: "from-blue-500/10 to-purple-500/10",
                iconColor: "text-blue-400",
                section: "competitive",
              },
              {
                label: "Codeforces Max",
                value: codeforces.maxRating,
                sub: codeforces.rankTitle,
                icon: <Trophy size={20} />,
                gradient: "from-amber-500/10 to-orange-500/10",
                iconColor: "text-amber-400",
                section: "competitive",
              },
              {
                label: "CodeChef",
                value: `${codechef.stars}★`,
                sub: `Max ${codechef.maxRating}`,
                icon: <Star size={20} />,
                gradient: "from-yellow-500/10 to-red-500/10",
                iconColor: "text-yellow-400",
                section: "competitive",
              },
            ].map((stat, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveSection(stat.section)}
                className={`group text-left rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br ${stat.gradient} hover:ring-purple-500/30 transition-all duration-300 card-hover`}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/50">{stat.label}</span>
                  <span className={stat.iconColor}>{stat.icon}</span>
                </div>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="mt-1 text-white/60 text-sm flex items-center gap-1">
                  {stat.sub}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Currently working on */}
          <motion.div
            variants={cardVariants}
            className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5 hover:ring-emerald-500/30 transition-all duration-300 card-hover"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <Rocket size={18} className="text-emerald-400" />
              <h3 className="text-lg font-semibold text-emerald-300">
                Currently working on
              </h3>
            </div>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                Learning Golang
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                Learning System Design
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Right column: Education + Tech + CTAs */}
        <div className="space-y-6">
          {/* Education */}
          <motion.div
            variants={cardVariants}
            className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10 hover:ring-blue-500/30 transition-all duration-300 card-hover"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award size={18} className="text-blue-400" />
              <h3 className="text-lg font-semibold gradient-text">Education</h3>
            </div>
            <h4 className="text-base font-semibold mb-1">
              B.Sc. (Eng.) in Computer Science and Engineering
            </h4>
            <p className="text-purple-300 font-medium mb-3">Comilla University</p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-blue-400" />
                January 2020 – July 2025
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-amber-400" />
                CGPA: 3.30 out of 4.00
              </div>
            </div>
          </motion.div>

          {/* Tech chips */}
          <Tooltip.Provider delayDuration={150}>
            <motion.div
              variants={cardVariants}
              className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5 hover:ring-cyan-500/30 transition-all duration-300 card-hover"
            >
              <h3 className="text-lg font-semibold gradient-text mb-4">Core Tech</h3>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <Tooltip.Root key={t}>
                    <Tooltip.Trigger asChild>
                      <motion.span
                        className="px-4 py-2 rounded-xl text-sm ring-1 ring-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 cursor-default transition-all"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
                      >
                        {t}
                      </motion.span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="top"
                        className="rounded-lg px-3 py-2 text-xs glass-strong text-white shadow-lg"
                      >
                        {`I use ${t} extensively in projects`}
                        <Tooltip.Arrow className="fill-black/80" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                ))}
              </div>
            </motion.div>
          </Tooltip.Provider>

          {/* CTAs */}
          <motion.div
            variants={cardVariants}
            className="rounded-2xl p-6 ring-1 ring-white/10 bg-gradient-to-br from-purple-600/10 to-blue-600/10"
          >
            <div className="space-y-3">
              {[
                { label: "Explore Projects", section: "projects" },
                { label: "See Contest History", section: "competitive" },
                { label: "Read Blog", section: "blog" },
              ].map((cta) => (
                <motion.button
                  key={cta.section}
                  onClick={() => setActiveSection(cta.section)}
                  className="w-full group flex items-center justify-between px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition-all"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">{cta.label}</span>
                  <ArrowRight size={18} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </div>

            {/* Resume + Email */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={`${currentURL}/Ahnaf_Hasan_Shifat.pdf`}
                className="flex-1 px-4 py-3 rounded-xl btn-primary text-white inline-flex items-center justify-center gap-2 text-sm font-medium"
                target="_blank"
              >
                <FileDown size={16} />
                Resume
              </a>
              <motion.a
                href="mailto:sheikhahnafshifat@gmail.com"
                className="px-4 py-3 rounded-xl btn-secondary text-white inline-flex items-center gap-2 text-sm font-medium"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={16} />
                Email
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SummarySection;
