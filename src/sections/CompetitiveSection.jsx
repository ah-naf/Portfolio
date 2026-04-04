import { Trophy, Code, Star, Users, ExternalLink, Award, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { contestHistory, competitiveProfiles } from "../data/portfolioData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
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

const CompetitiveSection = () => {
  const { codeforces, codechef, stopstalk, totalSolvedAllOJ } = competitiveProfiles;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="flex items-center justify-between mb-8 gap-4"
      >
        <h2 className="neo-section-heading text-2xl md:text-3xl flex items-center gap-3">
          <Trophy size={22} style={{ color: "var(--color-accent)" }} />
          Competitive Programming
        </h2>

        <a
          href={stopstalk.url}
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn-primary hidden sm:inline-flex px-4 py-2.5 gap-2 text-sm"
        >
          <ExternalLink size={15} />
          StopStalk
        </a>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-4 mb-8">

        {/* Total problems */}
        <motion.button
          variants={cardVariants}
          className="neo-card-interactive p-5 text-left"
          whileHover={prefersReducedMotion ? undefined : { y: -2 }}
          disabled
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Total Problems
            </span>
            <Code size={18} style={{ color: "var(--color-accent)" }} />
          </div>
          <div className="text-3xl font-black mb-1" style={{ color: "var(--color-accent)" }}>
            {totalSolvedAllOJ}+
          </div>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Across all platforms
          </p>
        </motion.button>

        {/* Codeforces */}
        <motion.a
          href={codeforces.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          className="neo-card-interactive p-5 block"
          whileHover={prefersReducedMotion ? undefined : { y: -2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Codeforces
            </span>
            <span className="text-xs font-semibold" style={{ color: "#ea580c" }}>
              @{codeforces.handle}
            </span>
          </div>
          <div className="text-3xl font-black mb-1" style={{ color: "#ea580c" }}>
            {codeforces.maxRating}
          </div>
          <p className="text-sm flex items-center gap-1" style={{ color: "#ea580c" }}>
            <Award size={13} />
            {codeforces.rankTitle}
          </p>
        </motion.a>

        {/* CodeChef */}
        <motion.a
          href={codechef.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          className="neo-card-interactive p-5 block"
          whileHover={prefersReducedMotion ? undefined : { y: -2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              CodeChef
            </span>
            <span className="text-xs font-semibold" style={{ color: "#ca8a04" }}>
              @{codechef.handle}
            </span>
          </div>
          <div className="flex items-center gap-2 text-3xl font-black mb-1" style={{ color: "#ca8a04" }}>
            {codechef.stars}
            <div className="flex">
              {[...Array(Math.min(codechef.stars, 5))].map((_, i) => (
                <Star key={i} size={14} className="fill-current" style={{ color: "#ca8a04" }} />
              ))}
            </div>
          </div>
          <p className="text-sm" style={{ color: "#ca8a04" }}>Max {codechef.maxRating}</p>
        </motion.a>
      </motion.div>

      {/* Contest history */}
      <motion.div variants={cardVariants}>
        <h3
          className="text-lg font-bold mb-4 flex items-center gap-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          <Zap size={17} style={{ color: "var(--color-accent)" }} />
          Contest History
        </h3>

        <motion.div variants={containerVariants} className="space-y-3">
          {contestHistory.map((contest, i) => (
            <motion.div
              key={`${contest.name}-${i}`}
              variants={cardVariants}
              className={contest.highlight ? "neo-card-accent p-4" : "neo-card p-4"}
              whileHover={prefersReducedMotion ? undefined : { x: 2 }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h4
                    className="font-semibold mb-1.5 text-sm truncate"
                    style={{ color: contest.highlight ? "#ffffff" : "var(--color-text-primary)" }}
                  >
                    {contest.url ? (
                      <a
                        href={contest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                      >
                        {contest.name}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      contest.name
                    )}
                  </h4>
                  <div
                    className="flex flex-wrap items-center gap-2 text-xs"
                    style={{ color: contest.highlight ? "rgba(255,255,255,0.75)" : "var(--color-text-secondary)" }}
                  >
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {contest.team}
                    </span>
                    <span
                      className="neo-badge"
                      style={
                        contest.highlight
                          ? { background: "rgba(255,255,255,0.2)", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.4)" }
                          : undefined
                      }
                    >
                      {contest.type}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className="text-2xl font-black"
                    style={{ color: contest.highlight ? "#ffffff" : "var(--color-accent)" }}
                  >
                    {contest.position}
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: contest.highlight ? "rgba(255,255,255,0.65)" : "var(--color-text-secondary)" }}
                  >
                    Position
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Mobile StopStalk button */}
      <motion.a
        href={stopstalk.url}
        target="_blank"
        rel="noopener noreferrer"
        variants={cardVariants}
        className="sm:hidden mt-6 w-full neo-btn-primary justify-center px-4 py-3 gap-2 text-sm"
      >
        <ExternalLink size={15} />
        View StopStalk Profile
      </motion.a>
    </motion.section>
  );
};

export default CompetitiveSection;
