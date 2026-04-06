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
import { motion, useReducedMotion } from "framer-motion";
import { competitiveProfiles, experienceData } from "../data/portfolioData";
import PixelSprite from "../components/PixelSprite";

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
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const SummarySection = ({ setActiveTab, scrollToSection }) => {
  const { totalSolvedAllOJ, codeforces, codechef } = competitiveProfiles;
  const tech = ["Go", "React", "Node.js", "PostgreSQL", "Docker"];
  const current = getCurrentRole(experienceData);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
    >
      {/* Section heading */}
      <motion.div variants={cardVariants} className="mb-8 flex items-center justify-between gap-3">
        <h2 className="neo-section-heading text-2xl md:text-3xl">About</h2>
        <div className="hidden sm:flex items-end gap-1">
          <PixelSprite size={42} anim="bob" />
        </div>
      </motion.div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Left: About + Current Job + Quick Stats + Currently working */}
        <div className="xl:col-span-2 space-y-5">

          {/* About Me */}
          <motion.div variants={cardVariants} className="neo-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} style={{ color: "var(--color-accent)" }} />
              <h3 className="font-bold text-base" style={{ color: "var(--color-text-primary)" }}>
                About Me
              </h3>
            </div>
            <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              I'm a passionate Computer Science Engineer specializing in competitive
              programming and full-stack development. With a strong foundation in
              algorithms and data structures, I've solved over{" "}
              <span className="font-bold" style={{ color: "var(--color-accent)" }}>
                {totalSolvedAllOJ}+
              </span>{" "}
              problems across online judges and achieved notable contest rankings.
            </p>
          </motion.div>

          {/* Current Job */}
          {current && (
            <motion.div variants={cardVariants} className="neo-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                      {current.title}
                    </h3>
                    <span style={{ color: "var(--color-text-secondary)" }}>•</span>
                    <span className="font-semibold" style={{ color: "var(--color-accent)" }}>
                      {current.company?.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-3" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      {current.start} — {current.end}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} />
                      {current.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 size={14} />
                      {current.type}
                    </span>
                  </div>
                  {current.tech?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {current.tech.slice(0, 6).map((t) => (
                        <span key={t} className="neo-chip">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <motion.button
                  onClick={() => setActiveTab("experience")}
                  className="neo-btn-secondary px-4 py-2 gap-2 shrink-0 self-start"
                  whileTap={{ scale: 0.97 }}
                >
                  View <ArrowRight size={15} />
                </motion.button>
              </div>
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
                section: "competitive",
              },
              {
                label: "Codeforces Max",
                value: codeforces.maxRating,
                sub: codeforces.rankTitle,
                icon: <Trophy size={20} />,
                section: "competitive",
              },
              {
                label: "CodeChef",
                value: `${codechef.stars}★`,
                sub: `Max ${codechef.maxRating}`,
                icon: <Star size={20} />,
                section: "competitive",
              },
            ].map((stat, i) => (
              <motion.button
                key={i}
                onClick={() => scrollToSection(stat.section)}
                className="neo-card-interactive p-5 text-left group"
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {stat.label}
                  </span>
                  <span style={{ color: "var(--color-accent)" }}>{stat.icon}</span>
                </div>
                <div
                  className="text-2xl font-black mb-1"
                  style={{ color: "var(--color-accent)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm flex items-center gap-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {stat.sub}
                  <ArrowRight
                    size={13}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Currently working on */}
          <motion.div variants={cardVariants} className="neo-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <Rocket size={16} className="text-emerald-500" />
              <h3 className="font-bold text-base text-emerald-600">
                Currently working on
              </h3>
            </div>
            <ul className="space-y-2" style={{ color: "var(--color-text-secondary)" }}>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                Learning Golang
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                Learning System Design
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Right: Education + Core Tech + CTAs */}
        <div className="space-y-5">

          {/* Education */}
          <motion.div variants={cardVariants} className="neo-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} style={{ color: "var(--color-accent)" }} />
              <h3 className="font-bold text-base" style={{ color: "var(--color-text-primary)" }}>
                Education
              </h3>
            </div>
            <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--color-text-primary)" }}>
              B.Sc. (Eng.) in Computer Science and Engineering
            </h4>
            <p className="font-bold text-sm mb-4" style={{ color: "var(--color-accent)" }}>
              Comilla University
            </p>
            <div className="space-y-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <div className="flex items-center gap-2">
                <Calendar size={13} />
                January 2020 – July 2025
              </div>
              <div className="flex items-center gap-2">
                <Award size={13} style={{ color: "var(--color-accent-amber)" }} />
                CGPA: 3.30 out of 4.00
              </div>
            </div>
          </motion.div>

          {/* Core Tech chips */}
          <Tooltip.Provider delayDuration={150}>
            <motion.div variants={cardVariants} className="neo-card p-6">
              <h3 className="font-bold text-base mb-4" style={{ color: "var(--color-text-primary)" }}>
                Core Tech
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <Tooltip.Root key={t}>
                    <Tooltip.Trigger asChild>
                      <motion.span
                        className="neo-chip"
                        whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                      >
                        {t}
                      </motion.span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="top"
                        style={{
                          background: "var(--color-bg-subtle)",
                          border: "2px solid var(--color-border)",
                          boxShadow: "3px 3px 0px var(--color-shadow)",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          fontSize: "0.75rem",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {`I use ${t} extensively in projects`}
                        <Tooltip.Arrow style={{ fill: "var(--color-border)" }} />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                ))}
              </div>
            </motion.div>
          </Tooltip.Provider>

          {/* Navigation CTAs */}
          <motion.div variants={cardVariants} className="neo-card p-5">
            <div className="space-y-2.5">
              {[
                { label: "Explore Projects", tab: "projects" },
                { label: "See Contest History", tab: "competitive" },
                { label: "Read Blog", tab: "blog" },
              ].map((cta) => (
                <motion.button
                  key={cta.tab}
                  onClick={() => scrollToSection(cta.tab)}
                  className="w-full neo-btn-secondary flex items-center justify-between px-4 py-3"
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{cta.label}</span>
                  <ArrowRight size={16} />
                </motion.button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href={RESUME_URL}
                className="neo-btn-primary flex-1 justify-center px-4 py-3 gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileDown size={15} />
                Resume
              </a>
              <a
                href="mailto:sheikhahnafshifat@gmail.com"
                className="neo-btn-secondary px-4 py-3 gap-2"
              >
                <Mail size={15} />
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SummarySection;
