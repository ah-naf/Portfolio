import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { 
  Github, 
  ExternalLink, 
  Play, 
  X, 
  FolderGit2, 
  Sparkles, 
  Code2, 
  Layers, 
  Zap, 
  Target,
  ArrowUpRight,
  Monitor,
  ChevronRight
} from "lucide-react";
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

const modalContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const TechBadge = ({ children, variant = "default" }) => {
  const variants = {
    default: "from-purple-500/15 to-blue-500/15 text-blue-200 ring-blue-400/20",
    highlight: "from-cyan-500/20 to-emerald-500/20 text-emerald-200 ring-emerald-400/30",
  };
  
  return (
    <motion.span 
      className={`px-3 py-1.5 rounded-full text-xs bg-gradient-to-r ${variants[variant]} ring-1 cursor-default`}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.span>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color, delay }) => (
  <motion.div
    custom={delay}
    variants={modalContentVariants}
    className={`group p-4 rounded-2xl bg-gradient-to-br ${color} ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300`}
    whileHover={{ y: -2, scale: 1.02 }}
  >
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-white/10">
        <Icon size={18} className="text-white/80" />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-semibold text-white/90 mb-1">{title}</h5>
        <p className="text-sm text-white/60 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
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

      {/* Enhanced Modal */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed z-50 w-[95vw] max-w-4xl max-h-[90vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, rgba(15, 10, 40, 0.98) 0%, rgba(5, 0, 20, 0.98) 100%)",
                    boxShadow: "0 0 100px rgba(124, 58, 237, 0.2), 0 0 60px rgba(14, 165, 233, 0.1), 0 25px 50px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {/* Decorative gradient orbs */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
                  
                  {/* Header */}
                  <div className="relative px-6 md:px-8 py-5 border-b border-white/10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.div 
                            className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 ring-1 ring-white/10"
                            initial={{ rotate: -10, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            <Code2 size={20} className="text-cyan-400" />
                          </motion.div>
                          <Dialog.Title asChild>
                            <motion.h3 
                              className="text-2xl md:text-3xl font-bold"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <span className="gradient-text-animated">{selected?.name ?? "Project"}</span>
                            </motion.h3>
                          </Dialog.Title>
                        </div>
                        
                        {selected?.summary && (
                          <motion.p 
                            className="text-white/60 text-sm md:text-base max-w-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {selected.summary}
                          </motion.p>
                        )}
                      </div>
                      
                      <Dialog.Close asChild>
                        <motion.button
                          className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition-all"
                          aria-label="Close"
                          whileHover={{ scale: 1.05, rotate: 90 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X size={20} />
                        </motion.button>
                      </Dialog.Close>
                    </div>
                    
                    {/* Quick action buttons */}
                    <motion.div 
                      className="flex items-center gap-3 mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selected?.github && (
                        <a
                          href={selected.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 text-sm font-medium transition-all"
                        >
                          <Github size={16} />
                          <span>View Code</span>
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                        </a>
                      )}
                      {selected?.live && (
                        <a
                          href={selected.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 ring-1 ring-cyan-400/30 text-sm font-medium transition-all"
                        >
                          <Monitor size={16} className="text-cyan-400" />
                          <span>Live Demo</span>
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                        </a>
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative px-6 md:px-8 py-6 max-h-[calc(90vh-200px)] overflow-y-auto custom-scrollbar">
                    <motion.div 
                      className="space-y-8"
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Overview Section */}
                      {selected?.description && (
                        <motion.div custom={0} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 rounded-lg bg-blue-500/20">
                              <Layers size={16} className="text-blue-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-blue-300">Project Overview</h4>
                          </div>
                          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/5 ring-1 ring-white/10">
                            <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                              {selected.description}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Key Features Grid */}
                      {selected?.highlights?.length > 0 && (
                        <motion.div custom={1} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 rounded-lg bg-emerald-500/20">
                              <Sparkles size={16} className="text-emerald-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-emerald-300">Key Features</h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3">
                            {selected.highlights.map((item, i) => (
                              <motion.div
                                key={i}
                                custom={1 + i * 0.1}
                                variants={modalContentVariants}
                                className="group flex items-start gap-3 p-4 rounded-xl bg-white/5 ring-1 ring-white/10 hover:ring-emerald-500/30 hover:bg-white/10 transition-all"
                                whileHover={{ x: 4 }}
                              >
                                <div className="p-1.5 rounded-lg bg-emerald-500/20 flex-shrink-0 mt-0.5">
                                  <ChevronRight size={14} className="text-emerald-400" />
                                </div>
                                <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Impact Section */}
                      {selected?.impact && (
                        <motion.div custom={2} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 rounded-lg bg-pink-500/20">
                              <Target size={16} className="text-pink-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-pink-300">Impact & Results</h4>
                          </div>
                          <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/5 ring-1 ring-pink-500/20">
                            <p className="text-white/80 leading-relaxed">
                              {selected.impact}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Tech Stack */}
                      {selected?.tools?.length > 0 && (
                        <motion.div custom={3} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 rounded-lg bg-purple-500/20">
                              <Zap size={16} className="text-purple-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-purple-300">Tech Stack</h4>
                          </div>
                          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 ring-1 ring-white/10">
                            <div className="flex flex-wrap gap-2">
                              {selected.tools.map((t, i) => (
                                <TechBadge key={i} variant={i < 3 ? "highlight" : "default"}>
                                  {t}
                                </TechBadge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Video Demo */}
                      {selected?.video && (
                        <motion.div custom={4} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 rounded-lg bg-amber-500/20">
                              <Play size={16} className="text-amber-400" />
                            </div>
                            <h4 className="text-lg font-semibold text-amber-300">Demo Video</h4>
                          </div>
                          <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/40">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />
                            <div className="w-full aspect-video">
                              <iframe
                                className="w-full h-full"
                                src={selected.video}
                                title={`${selected.name} demo video`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Footer */}
                  <motion.div 
                    className="relative px-6 md:px-8 py-4 border-t border-white/10 bg-black/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <FolderGit2 size={16} />
                        <span>Explore the full project</span>
                      </div>
                      {selected?.github && (
                        <motion.a
                          href={selected.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-white text-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Github size={16} />
                          View Repository
                          <ArrowUpRight size={14} />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>

      {/* Custom scrollbar styles for modal */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #7c3aed, #0ea5e9);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #8b5cf6, #22d3ee);
        }
      `}</style>
    </motion.section>
  );
};

export default ProjectsSection;
