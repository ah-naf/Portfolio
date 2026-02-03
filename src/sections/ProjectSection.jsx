import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Github, ExternalLink, Play, X, FolderGit2, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "../data/portfolioData";

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

const TechBadge = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-blue-200 ring-1 ring-blue-400/20">
    {children}
  </span>
);

const ProjectsSection = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const openModal = (project) => {
    setSelected(project);
    setOpen(true);
  };

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
          <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full" />
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 ring-1 ring-white/10">
            <FolderGit2 className="text-cyan-400" size={24} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">Projects</h2>
          <p className="text-sm text-white/50">Things I've built</p>
        </div>
      </motion.div>

      {/* Project Cards - Bento Grid */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <motion.div
            key={`${p.name}-${idx}`}
            variants={cardVariants}
            className={`group rounded-2xl p-6 ring-1 ring-white/10 bg-white/5 hover:ring-cyan-500/30 transition-all duration-300 card-hover ${
              idx === 0 ? "md:col-span-2" : ""
            }`}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
          >
            <div className="flex items-start justify-between mb-4">
              <button
                onClick={() => openModal(p)}
                className="text-left group/title"
              >
                <h3 className="text-xl font-bold text-white group-hover/title:text-cyan-300 transition-colors">
                  {p.name}
                </h3>
              </button>
              <div className="flex items-center gap-2">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                    title="Live Demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  title="Source Code"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>

            <p className="text-white/70 mb-4 leading-relaxed line-clamp-2">
              {p.summary}
            </p>

            {p.highlights?.length > 0 && (
              <ul className="text-white/60 text-sm space-y-1.5 mb-4">
                {p.highlights.slice(0, 2).map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {p.tools?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tools.slice(0, 6).map((t, i) => (
                  <TechBadge key={i}>{t}</TechBadge>
                ))}
                {p.tools.length > 6 && (
                  <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/50">
                    +{p.tools.length - 6} more
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl btn-primary text-white inline-flex items-center gap-2 text-sm font-medium"
              >
                <Github size={16} />
                Source Code
              </a>
              <motion.button
                onClick={() => openModal(p)}
                className="px-4 py-2.5 rounded-xl btn-secondary text-white inline-flex items-center gap-2 text-sm font-medium"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={16} />
                Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed z-50 w-full max-w-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl glass-strong text-white overflow-hidden"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <Dialog.Title className="text-xl font-bold gradient-text">
                      {selected?.name ?? "Project"}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="p-2 rounded-xl hover:bg-white/10 transition"
                        aria-label="Close"
                      >
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="px-6 pt-5 pb-2 space-y-6 max-h-[70vh] overflow-y-auto">
                    {selected?.description && (
                      <div>
                        <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          Overview
                        </h4>
                        <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                          {selected.description}
                        </p>
                      </div>
                    )}

                    {selected?.highlights?.length > 0 && (
                      <div>
                        <h4 className="text-emerald-300 font-semibold mb-2 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {selected.highlights.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80">
                              <Sparkles size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selected?.impact && (
                      <div>
                        <h4 className="text-pink-300 font-semibold mb-2 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                          Impact
                        </h4>
                        <p className="text-white/80 leading-relaxed">
                          {selected.impact}
                        </p>
                      </div>
                    )}

                    {selected?.tools?.length > 0 && (
                      <div>
                        <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selected.tools.map((t, i) => (
                            <TechBadge key={i}>{t}</TechBadge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selected?.video ? (
                      <div>
                        <h4 className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          Demo
                        </h4>
                        <div className="w-full aspect-video rounded-xl overflow-hidden ring-1 ring-white/10 bg-black/40">
                          <iframe
                            className="w-full h-full"
                            src={selected.video}
                            title={`${selected.name} demo video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          Demo
                        </h4>
                        <div className="w-full rounded-xl ring-1 ring-white/10 bg-white/5 p-4 text-white/50 text-sm">
                          Demo video not available
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-white/10">
                    <span className="text-white/50 text-sm">Explore the code</span>
                    {selected?.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl btn-primary text-white inline-flex items-center gap-2 text-sm font-medium"
                      >
                        <Github size={16} />
                        View Repository
                      </a>
                    )}
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </motion.section>
  );
};

export default ProjectsSection;
