import React from "react";
import { Trophy, Code, Star, Users, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { contestHistory, competitiveProfiles } from "../data/portfolioData";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
};

const hoverLift = {
  hover: {
    y: -4,
    scale: 1.01,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
  tap: { scale: 0.99 },
};

const CompetitiveSection = () => {
  const { codeforces, codechef, stopstalk, totalSolvedAllOJ } =
    competitiveProfiles;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90"
    >
      {/* Header with StopStalk button at the top */}
      <motion.div
        className="flex items-center justify-between mb-6"
        variants={fadeInUp}
        custom={0}
      >
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Trophy className="text-blue-400" />
          Competitive Programming
        </h2>

        <motion.a
          href={stopstalk.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-900/30 transition text-sm md:text-base"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink size={16} />
          StopStalk Profile
        </motion.a>
      </motion.div>

      {/* Profiles summary */}
      <motion.div
        variants={containerStagger}
        className="grid md:grid-cols-2 gap-6 mb-3"
      >
        {/* Codeforces */}
        <motion.div
          variants={cardVariants}
          whileHover={hoverLift.hover}
          whileTap={hoverLift.tap}
          className="rounded-2xl p-6 ring-1 ring-orange-400/30 bg-gradient-to-br from-orange-500/15 to-red-500/15"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold flex items-center">
              <Code className="mr-2 text-orange-300" />
              Codeforces
            </h3>
            <motion.a
              href={codeforces.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white inline-flex items-center gap-1 text-sm"
              title={codeforces.handle}
              whileHover={prefersReducedMotion ? undefined : { x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              @{codeforces.handle}
              <ExternalLink size={14} />
            </motion.a>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-300 font-bold text-lg">
                {codeforces.rankTitle}
              </p>
              <p className="text-white/80">
                Max Rating: {codeforces.maxRating}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-300">
                {totalSolvedAllOJ}+
              </div>
              <p className="text-white/80 text-sm">Problems Solved (All OJs)</p>
            </div>
          </div>
        </motion.div>

        {/* CodeChef */}
        <motion.div
          variants={cardVariants}
          whileHover={hoverLift.hover}
          whileTap={hoverLift.tap}
          className="rounded-2xl p-6 ring-1 ring-yellow-400/30 bg-gradient-to-br from-yellow-500/15 to-orange-500/15"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold flex items-center">
              <Star className="mr-2 text-yellow-300" />
              CodeChef
            </h3>
            <motion.a
              href={codechef.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white inline-flex items-center gap-1 text-sm"
              title={codechef.handle}
              whileHover={prefersReducedMotion ? undefined : { x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              @{codechef.handle}
              <ExternalLink size={14} />
            </motion.a>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 font-bold text-lg">
                {codechef.stars} Star
              </p>
              <p className="text-white/80">Max Rating: {codechef.maxRating}</p>
            </div>
            <div className="flex">
              {[...Array(codechef.stars)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-yellow-300 fill-current"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Contest History */}
      <motion.div className="mt-6" variants={fadeInUp} custom={2}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Trophy className="mr-2 text-blue-300" />
          Contest History
        </h3>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {contestHistory.map((contest, i) => (
              <motion.div
                key={`${contest.name}-${i}`}
                variants={cardVariants}
                whileHover={hoverLift.hover}
                whileTap={hoverLift.tap}
                layout
                className={`rounded-2xl p-4 transition ring-1 ${
                  contest.highlight
                    ? "bg-gradient-to-r from-yellow-500/15 to-orange-500/15 ring-yellow-400/40"
                    : "bg-white/5 ring-white/10 hover:scale-[1.01]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1 truncate">
                      {contest.url ? (
                        <a
                          href={contest.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          title={contest.name}
                        >
                          {contest.name}
                        </a>
                      ) : (
                        contest.name
                      )}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm">
                      <span className="flex items-center">
                        <Users size={16} className="mr-2" />
                        Team: {contest.team}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/10 ring-1 ring-white/10">
                        {contest.type}
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      contest.highlight
                        ? "text-yellow-300 text-right"
                        : "text-blue-300 text-right"
                    }
                  >
                    <div className="text-2xl font-bold">{contest.position}</div>
                    <p className="text-sm">Position</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default CompetitiveSection;
