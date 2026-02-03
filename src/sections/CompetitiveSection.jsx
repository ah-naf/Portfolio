import React from "react";
import { Trophy, Code, Star, Users, ExternalLink, Award, Zap } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { contestHistory, competitiveProfiles } from "../data/portfolioData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

const CompetitiveSection = () => {
  const { codeforces, codechef, stopstalk, totalSolvedAllOJ } =
    competitiveProfiles;
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
      <motion.div
        variants={cardVariants}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full" />
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 ring-1 ring-white/10">
              <Trophy className="text-amber-400" size={24} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">
              Competitive Programming
            </h2>
            <p className="text-sm text-white/50">Problem solving journey</p>
          </div>
        </div>

        <motion.a
          href={stopstalk.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex px-4 py-2.5 rounded-xl btn-primary text-white items-center gap-2 text-sm font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink size={16} />
          StopStalk Profile
        </motion.a>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-4 mb-8">
        {/* Total Problems */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl p-5 bg-gradient-to-br from-purple-500/10 to-blue-500/10 ring-1 ring-white/10 hover:ring-purple-500/30 transition-all duration-300 card-hover"
          whileHover={prefersReducedMotion ? undefined : { y: -4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Total Problems</span>
            <Code size={18} className="text-purple-400" />
          </div>
          <div className="text-3xl font-bold gradient-text">{totalSolvedAllOJ}+</div>
          <p className="text-sm text-white/60 mt-1">Across all platforms</p>
        </motion.div>

        {/* Codeforces */}
        <motion.a
          href={codeforces.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          className="rounded-2xl p-5 bg-gradient-to-br from-orange-500/10 to-red-500/10 ring-1 ring-orange-500/20 hover:ring-orange-500/40 transition-all duration-300 card-hover"
          whileHover={prefersReducedMotion ? undefined : { y: -4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Codeforces</span>
            <span className="text-xs text-orange-300/70">@{codeforces.handle}</span>
          </div>
          <div className="text-3xl font-bold text-orange-300">{codeforces.maxRating}</div>
          <p className="text-sm text-orange-200/80 mt-1 flex items-center gap-1">
            <Award size={14} />
            {codeforces.rankTitle}
          </p>
        </motion.a>

        {/* CodeChef */}
        <motion.a
          href={codechef.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          className="rounded-2xl p-5 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 ring-1 ring-yellow-500/20 hover:ring-yellow-500/40 transition-all duration-300 card-hover"
          whileHover={prefersReducedMotion ? undefined : { y: -4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">CodeChef</span>
            <span className="text-xs text-yellow-300/70">@{codechef.handle}</span>
          </div>
          <div className="flex items-center gap-1.5 text-3xl font-bold text-yellow-300">
            {codechef.stars}
            <div className="flex">
              {[...Array(Math.min(codechef.stars, 5))].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-300 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-sm text-yellow-200/80 mt-1">Max {codechef.maxRating}</p>
        </motion.a>
      </motion.div>

      {/* Contest History */}
      <motion.div variants={cardVariants}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap size={18} className="text-cyan-400" />
          <span className="gradient-text">Contest History</span>
        </h3>

        <motion.div
          variants={containerVariants}
          className="space-y-3"
        >
          {contestHistory.map((contest, i) => (
            <motion.div
              key={`${contest.name}-${i}`}
              variants={cardVariants}
              className={`group rounded-2xl p-4 transition-all duration-300 ring-1 ${
                contest.highlight
                  ? "bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-orange-500/15 ring-amber-400/30 hover:ring-amber-400/50"
                  : "bg-white/5 ring-white/10 hover:ring-purple-500/30 hover:bg-white/10"
              }`}
              whileHover={prefersReducedMotion ? undefined : { x: 4 }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold mb-1.5 truncate">
                    {contest.url ? (
                      <a
                        href={contest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5"
                      >
                        {contest.name}
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      contest.name
                    )}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="text-blue-400" />
                      {contest.team}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
                      {contest.type}
                    </span>
                  </div>
                </div>
                <div className={`text-right ${contest.highlight ? "text-amber-300" : "text-cyan-300"}`}>
                  <div className="text-2xl font-bold">{contest.position}</div>
                  <p className="text-xs text-white/50">Position</p>
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
        className="sm:hidden mt-6 w-full inline-flex justify-center px-4 py-3 rounded-xl btn-primary text-white items-center gap-2 text-sm font-medium"
      >
        <ExternalLink size={16} />
        View StopStalk Profile
      </motion.a>
    </motion.section>
  );
};

export default CompetitiveSection;
