import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Github,
  ExternalLink,
  Play,
  X,
  FolderGit2,
  Code2,
  Layers,
  Zap,
  Target,
  ArrowUpRight,
  Monitor,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "../data/portfolioData";
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

const modalContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

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
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div variants={cardVariants} className="mb-8 flex items-center justify-between gap-3">
        <h2 className="neo-section-heading text-2xl md:text-3xl flex items-center gap-3">
          <FolderGit2 size={22} style={{ color: "var(--color-accent)" }} />
          Projects
        </h2>
        <div className="hidden sm:block">
          <PixelSprite size={44} anim="float" />
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-5">
        {projects.map((p, idx) => (
          <motion.div
            key={`${p.name}-${idx}`}
            variants={cardVariants}
            className={`neo-card p-6 group relative overflow-hidden ${idx === 0 ? "md:col-span-2" : ""}`}
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <button onClick={() => openModal(p)} className="text-left group/title">
                <h3
                  className="text-xl font-bold transition-colors group-hover/title:opacity-80"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {p.name}
                </h3>
              </button>
              <div className="flex items-center gap-2 ml-3 shrink-0">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn-icon p-2"
                    title="Live Demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-icon p-2"
                  title="Source Code"
                >
                  <Github size={16} />
                </a>
              </div>
            </div>

            <p
              className="text-sm mb-4 leading-relaxed line-clamp-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {p.summary}
            </p>

            {p.highlights?.length > 0 && (
              <ul className="text-sm space-y-1.5 mb-4" style={{ color: "var(--color-text-secondary)" }}>
                {p.highlights.slice(0, 2).map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles
                      size={13}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--color-accent)" }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {p.tools?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.tools.slice(0, 6).map((t, i) => (
                  <span key={i} className="neo-chip">{t}</span>
                ))}
                {p.tools.length > 6 && (
                  <span
                    className="neo-chip"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    +{p.tools.length - 6}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-primary px-4 py-2.5 gap-2"
              >
                <Github size={15} />
                Source Code
              </a>
              <motion.button
                onClick={() => openModal(p)}
                className="neo-btn-secondary px-4 py-2.5 gap-2"
                whileTap={{ scale: 0.97 }}
              >
                <Play size={15} />
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
                  className="fixed inset-0 z-50"
                  style={{ background: "rgba(0,0,0,0.65)" }}
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 32 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 32 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed z-50 w-[95vw] max-w-4xl max-h-[90vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                  style={{
                    background: "var(--color-bg)",
                    border: "2px solid var(--color-border)",
                    boxShadow: "8px 8px 0px var(--color-shadow)",
                    borderRadius: "12px",
                  }}
                >
                  {/* Modal Header */}
                  <div
                    className="px-6 md:px-8 py-5"
                    style={{ borderBottom: "2px solid var(--color-border)" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="neo-btn-icon p-2" style={{ cursor: "default" }}>
                            <Code2 size={18} style={{ color: "var(--color-accent)" }} />
                          </div>
                          <Dialog.Title asChild>
                            <motion.h3
                              className="text-2xl md:text-3xl font-black"
                              style={{ color: "var(--color-text-primary)" }}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              {selected?.name ?? "Project"}
                            </motion.h3>
                          </Dialog.Title>
                        </div>
                        {selected?.summary && (
                          <motion.p
                            className="text-sm max-w-2xl"
                            style={{ color: "var(--color-text-secondary)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                          >
                            {selected.summary}
                          </motion.p>
                        )}
                      </div>

                      <Dialog.Close asChild>
                        <motion.button
                          className="neo-btn-icon p-2.5 shrink-0"
                          aria-label="Close"
                          whileTap={{ scale: 0.95 }}
                        >
                          <X size={18} />
                        </motion.button>
                      </Dialog.Close>
                    </div>

                    {/* Quick links */}
                    <motion.div
                      className="flex items-center gap-2.5 mt-4"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selected?.github && (
                        <a
                          href={selected.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neo-btn-secondary px-4 py-2 gap-2 text-xs"
                        >
                          <Github size={14} />
                          View Code
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                      {selected?.live && (
                        <a
                          href={selected.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neo-btn-primary px-4 py-2 gap-2 text-xs"
                        >
                          <Monitor size={14} />
                          Live Demo
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                    </motion.div>
                  </div>

                  {/* Modal Content */}
                  <div className="px-6 md:px-8 py-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                    <motion.div
                      className="space-y-7"
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Overview */}
                      {selected?.description && (
                        <motion.div custom={0} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="neo-btn-icon p-1.5" style={{ cursor: "default" }}>
                              <Layers size={14} style={{ color: "var(--color-accent)" }} />
                            </div>
                            <h4 className="neo-section-heading text-base font-bold">
                              Project Overview
                            </h4>
                          </div>
                          <div className="neo-card p-5">
                            <p
                              className="text-sm leading-relaxed whitespace-pre-wrap"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              {selected.description}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Key Features */}
                      {selected?.highlights?.length > 0 && (
                        <motion.div custom={1} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="neo-btn-icon p-1.5" style={{ cursor: "default" }}>
                              <Sparkles size={14} style={{ color: "var(--color-accent)" }} />
                            </div>
                            <h4 className="neo-section-heading text-base font-bold">
                              Key Features
                            </h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3">
                            {selected.highlights.map((item, i) => (
                              <motion.div
                                key={i}
                                custom={1 + i * 0.08}
                                variants={modalContentVariants}
                                className="neo-card p-4 flex items-start gap-3"
                              >
                                <div className="shrink-0 mt-0.5">
                                  <ChevronRight
                                    size={14}
                                    style={{ color: "var(--color-accent)" }}
                                  />
                                </div>
                                <span
                                  className="text-sm leading-relaxed"
                                  style={{ color: "var(--color-text-secondary)" }}
                                >
                                  {item}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Impact */}
                      {selected?.impact && (
                        <motion.div custom={2} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="neo-btn-icon p-1.5" style={{ cursor: "default" }}>
                              <Target size={14} style={{ color: "var(--color-accent-amber)" }} />
                            </div>
                            <h4 className="neo-section-heading text-base font-bold">
                              Impact & Results
                            </h4>
                          </div>
                          <div className="neo-card p-5">
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              {selected.impact}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Tech Stack */}
                      {selected?.tools?.length > 0 && (
                        <motion.div custom={3} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="neo-btn-icon p-1.5" style={{ cursor: "default" }}>
                              <Zap size={14} style={{ color: "var(--color-accent)" }} />
                            </div>
                            <h4 className="neo-section-heading text-base font-bold">
                              Tech Stack
                            </h4>
                          </div>
                          <div className="neo-card p-5">
                            <div className="flex flex-wrap gap-2">
                              {selected.tools.map((t, i) => (
                                <span key={i} className="neo-chip">{t}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Video Demo */}
                      {selected?.video && (
                        <motion.div custom={4} variants={modalContentVariants}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="neo-btn-icon p-1.5" style={{ cursor: "default" }}>
                              <Play size={14} style={{ color: "var(--color-accent-amber)" }} />
                            </div>
                            <h4 className="neo-section-heading text-base font-bold">
                              Demo Video
                            </h4>
                          </div>
                          <div
                            className="overflow-hidden"
                            style={{
                              border: "2px solid var(--color-border)",
                              borderRadius: "8px",
                            }}
                          >
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

                  {/* Modal Footer */}
                  <motion.div
                    className="px-6 md:px-8 py-4 flex items-center justify-between"
                    style={{
                      borderTop: "2px solid var(--color-border)",
                      background: "var(--color-bg-subtle)",
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <FolderGit2 size={15} />
                      <span>Explore the full project</span>
                    </div>
                    {selected?.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-btn-primary px-5 py-2.5 gap-2 text-sm"
                      >
                        <Github size={15} />
                        View Repository
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </motion.div>
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
