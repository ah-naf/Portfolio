import { Star, Code2, Monitor, Database, Settings, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "../data/portfolioData";
import PixelSprite from "../components/PixelSprite";

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

const chipVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25 },
  },
};

const categoryIcons = {
  "Programming Languages": <Code2 size={17} style={{ color: "#7c3aed" }} />,
  "Web Frameworks": <Monitor size={17} style={{ color: "#2563eb" }} />,
  "API Development": <Layers size={17} style={{ color: "#0891b2" }} />,
  "DevOps & Tools": <Settings size={17} style={{ color: "#059669" }} />,
  "Familiar With": <Database size={17} style={{ color: "#d97706" }} />,
};

const categoryTextColors = {
  "Programming Languages": "#7c3aed",
  "Web Frameworks": "#2563eb",
  "API Development": "#0891b2",
  "DevOps & Tools": "#059669",
  "Familiar With": "#d97706",
};

const SkillsSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const entries = Object.entries(skills);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div variants={cardVariants} className="mb-8 flex items-center justify-between gap-3">
        <h2 className="neo-section-heading text-2xl md:text-3xl flex items-center gap-3">
          <Star size={22} style={{ color: "var(--color-accent)" }} />
          Technical Skills
        </h2>
        <div className="hidden sm:block">
          <PixelSprite size={40} anim="wiggle" />
        </div>
      </motion.div>

      {/* Skills grid */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-5">
        {entries.map(([category, list], idx) => {
          const isLastOdd = idx === entries.length - 1 && entries.length % 2 === 1;

          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`neo-card p-5 ${isLastOdd ? "md:col-span-2" : ""}`}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                {categoryIcons[category] ?? (
                  <Code2 size={17} style={{ color: "var(--color-text-secondary)" }} />
                )}
                <h3
                  className="font-bold text-sm"
                  style={{ color: categoryTextColors[category] ?? "var(--color-text-primary)" }}
                >
                  {category}
                </h3>
              </div>

              {/* Chips */}
              <motion.div variants={containerVariants} className="flex flex-wrap gap-2">
                {list.map((s, i) => (
                  <motion.span
                    key={i}
                    variants={chipVariants}
                    className="neo-chip"
                    whileHover={prefersReducedMotion ? undefined : { y: -1 }}
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
