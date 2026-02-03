import React from "react";
import { BookOpen, ExternalLink, Sparkles, ArrowUpRight, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { mediumPosts } from "../data/portfolioData";

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

const BlogSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id="blog"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="rounded-3xl glass p-6 md:p-8 text-white/90"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="flex items-center gap-3 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full" />
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 ring-1 ring-white/10">
            <Sparkles className="text-emerald-400" size={24} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">Blog & Writing</h2>
          <p className="text-sm text-white/50">Thoughts and tutorials</p>
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-5">
        {mediumPosts.map((post, idx) => (
          <motion.a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            className={`group block rounded-2xl p-6 ring-1 ring-white/10 bg-white/5 hover:ring-emerald-500/30 transition-all duration-300 card-hover ${
              idx === 0 ? "sm:col-span-2" : ""
            }`}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <BookOpen size={18} className="text-emerald-400" />
              </div>
              <motion.div
                className="p-2 rounded-lg bg-white/5 text-white/40 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight size={18} />
              </motion.div>
            </div>

            <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
              {post.title}
            </h3>

            {post.description && (
              <p className="text-white/60 text-sm mb-4 line-clamp-2">
                {post.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-2 text-emerald-300">
                <ExternalLink size={14} />
                Read on Medium
              </span>
              {post.readTime && (
                <span className="inline-flex items-center gap-1.5 text-white/40">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* View All Posts CTA */}
      <motion.div variants={cardVariants} className="mt-6 text-center">
        <motion.a
          href="https://medium.com/@sheikhahnafshifat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-secondary text-white font-medium"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <BookOpen size={18} />
          View All Posts on Medium
          <ArrowUpRight size={16} className="opacity-60" />
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default BlogSection;
