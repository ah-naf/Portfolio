import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  BookOpen,
  Code,
  Star,
  Trophy,
  Sparkles,
} from "lucide-react";
import { profile } from "../data/portfolioData";

const NAV_SECTIONS = [
  { id: "summary", label: "Summary", icon: <BookOpen size={18} />, color: "text-purple-400" },
  { id: "experience", label: "Experience", icon: <Code size={18} />, color: "text-blue-400" },
  { id: "competitive", label: "Competitive", icon: <Trophy size={18} />, color: "text-amber-400" },
  { id: "projects", label: "Projects", icon: <Github size={18} />, color: "text-cyan-400" },
  { id: "skills", label: "Skills", icon: <Star size={18} />, color: "text-pink-400" },
  { id: "blog", label: "Blog", icon: <Sparkles size={18} />, color: "text-emerald-400" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="lg:col-span-4 xl:col-span-3">
      <div className="sticky top-24 space-y-6">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl glass p-6 text-white/90 card-hover"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold gradient-text">Contact</h2>
              <p className="text-sm text-white/50 mt-0.5">Let's connect</p>
            </div>
            <div className="flex items-center gap-2">
              {[
                { href: profile.links.linkedin, icon: <Linkedin size={18} />, color: "hover:text-blue-400 hover:bg-blue-400/10" },
                { href: profile.links.github, icon: <Github size={18} />, color: "hover:text-white hover:bg-white/10" },
                { href: profile.links.blog, icon: <BookOpen size={18} />, color: "hover:text-emerald-400 hover:bg-emerald-400/10" },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl bg-white/5 text-white/60 transition-all duration-300 ${link.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <motion.a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ x: 4 }}
            >
              <Mail size={16} className="text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm">{profile.email}</span>
            </motion.a>
            <motion.a
              href={`tel:${profile.phoneRaw}`}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ x: 4 }}
            >
              <Phone size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm">{profile.phoneDisplay}</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Navigation card */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="rounded-3xl glass p-3"
        >
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {NAV_SECTIONS.map((s) => {
              const active = activeSection === s.id;
              return (
                <motion.button
                  key={s.id}
                  variants={itemVariants}
                  onClick={() => setActiveSection(s.id)}
                  className={`relative flex items-center justify-start gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 overflow-hidden ${
                    active
                      ? "text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ x: active ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active background */}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-2xl"
                      style={{ boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <span className={`relative z-10 ${active ? "text-white" : s.color}`}>
                    {s.icon}
                  </span>

                  {/* Label */}
                  <span className="relative z-10 text-sm font-medium">
                    {s.label}
                  </span>

                  {/* Glow effect on hover */}
                  {!active && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                      style={{
                        background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.1), transparent 70%)",
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </aside>
  );
};

export default Sidebar;
