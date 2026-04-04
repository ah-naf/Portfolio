import { BookOpen, ArrowUpRight, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { mediumPosts, profile } from "../data/portfolioData";

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

const BlogSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div variants={cardVariants} className="mb-8">
        <h2 className="neo-section-heading text-2xl md:text-3xl flex items-center gap-3">
          <BookOpen size={22} style={{ color: "var(--color-accent)" }} />
          Blog & Writing
        </h2>
      </motion.div>

      {/* Posts grid */}
      <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-5">
        {mediumPosts.map((post, idx) => (
          <motion.a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            className={`neo-card-interactive p-6 block group ${idx === 0 ? "sm:col-span-2" : ""}`}
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div
                className="neo-btn-icon p-2"
                style={{ cursor: "default" }}
                aria-hidden="true"
              >
                <BookOpen size={16} style={{ color: "var(--color-accent)" }} />
              </div>
              <div className="neo-btn-icon p-2 group-hover:opacity-80 transition-opacity">
                <ArrowUpRight size={16} style={{ color: "var(--color-accent)" }} />
              </div>
            </div>

            <h3
              className="text-base font-bold mb-2 line-clamp-2 transition-colors"
              style={{ color: "var(--color-text-primary)" }}
            >
              {post.title}
            </h3>

            {post.description && (
              <p
                className="text-sm mb-4 line-clamp-2"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {post.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs">
              <span
                className="font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                Read on Medium
              </span>
              {post.readTime && (
                <span
                  className="inline-flex items-center gap-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <Clock size={12} />
                  {post.readTime}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* View all CTA */}
      <motion.div variants={cardVariants} className="mt-7 text-center">
        <a
          href={profile.links.blog}
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn-secondary inline-flex px-6 py-3 gap-2"
        >
          <BookOpen size={16} />
          View All Posts on Medium
          <ArrowUpRight size={15} />
        </a>
      </motion.div>
    </motion.section>
  );
};

export default BlogSection;
