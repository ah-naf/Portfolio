import React from "react";
import { Star, Code2, Monitor, Database, Settings, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "../data/portfolioData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const categoryIcons = {
  "Programming Languages": <Code2 size={18} className="text-purple-400" />,
  "Web Frameworks": <Monitor size={18} className="text-blue-400" />,
  "API Development": <Layers size={18} className="text-cyan-400" />,
  "DevOps & Tools": <Settings size={18} className="text-emerald-400" />,
  "Familiar With": <Database size={18} className="text-amber-400" />,
};

const categoryGradients = {
  "Programming Languages": "from-purple-500/10 to-pink-500/10",
  "Web Frameworks": "from-blue-500/10 to-purple-500/10",
  "API Development": "from-cyan-500/10 to-blue-500/10",
  "DevOps & Tools": "from-emerald-500/10 to-cyan-500/10",
  "Familiar With": "from-amber-500/10 to-orange-500/10",
};

const categoryColors = {
  "Programming Languages": { ring: "ring-purple-500/30", text: "text-purple-300" },
  "Web Frameworks": { ring: "ring-blue-500/30", text: "text-blue-300" },
  "API Development": { ring: "ring-cyan-500/30", text: "text-cyan-300" },
  "DevOps & Tools": { ring: "ring-emerald-500/30", text: "text-emerald-300" },
  "Familiar With": { ring: "ring-amber-500/30", text: "text-amber-300" },
};

const SkillsSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="rounded-3xl glass p-6 md:p-8 text-white/90"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="flex items-center gap-3 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 ring-1 ring-white/10">
            <Star className="text-pink-400" size={24} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">Technical Skills</h2>
          <p className="text-sm text-white/50">Technologies I work with</p>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-5">
        {Object.entries(skills).map(([category, list], idx) => {
          const colors = categoryColors[category] || { ring: "ring-white/20", text: "text-white/80" };
          const gradient = categoryGradients[category] || "from-white/10 to-white/5";

          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br ${gradient} hover:${colors.ring} transition-all duration-300 card-hover ${
                idx === Object.entries(skills).length - 1 && Object.entries(skills).length % 2 === 1
                  ? "md:col-span-2"
                  : ""
              }`}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                {categoryIcons[category] || <Code2 size={18} className="text-white/60" />}
                <h3 className={`font-semibold ${colors.text}`}>{category}</h3>
              </div>

              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {list.map((s, i) => (
                  <motion.span
                    key={i}
                    variants={chipVariants}
                    className="px-4 py-2 rounded-xl text-sm ring-1 ring-white/10 bg-white/5 hover:bg-white/10 hover:ring-white/20 cursor-default transition-all"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default SkillsSection;
