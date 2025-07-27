import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Github, ExternalLink, Play, X } from "lucide-react";
import { projects } from "../data/portfolioData";

const ProjectsSection = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // lock body scroll when modal is open
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
    <section className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <Github className="text-blue-400" />
        Projects
      </h2>

      {/* Cards */}
      <div className="grid gap-6">
        {projects.map((p, idx) => (
          <div
            key={`${p.name}-${idx}`}
            className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition group"
          >
            <div className="flex items-start justify-between mb-3">
              <button
                onClick={() => openModal(p)}
                className="text-left text-xl font-semibold hover:underline decoration-blue-300 underline-offset-4"
                title="View details"
              >
                {p.name}
              </button>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/70 hover:text-blue-300"
                title="Source Code"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            <p className="text-white/80 mb-3 leading-relaxed line-clamp-3">
              {p.summary}
            </p>

            {/* Bullet preview (first 2 highlights) */}
            {p.highlights?.length > 0 && (
              <ul className="text-white/80 text-sm space-y-1 mb-4 list-disc pl-5">
                {p.highlights.slice(0, 2).map((h, i) => (
                  <li key={i} className="marker:text-blue-300">
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {p.tools?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tools.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm ring-1 ring-blue-400/30 bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-blue-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-900/30 transition text-sm"
              >
                <Github size={16} />
                Source Code
              </a>

              <button
                onClick={() => openModal(p)}
                className="px-3 py-2 rounded-lg bg-white/10 text-white inline-flex items-center gap-2 hover:bg-white/15 transition text-sm"
                title="View details"
              >
                <Play size={16} />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal with Radix UI */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed z-50 w-full max-w-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-black/80 ring-1 ring-white/10 text-white overflow-hidden
                       data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <Dialog.Title className="text-xl font-semibold">
                {selected?.name ?? "Project"}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <div className="px-6 pt-5 pb-2 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Overview */}
              {selected?.description && (
                <div>
                  <h4 className="text-blue-300 font-semibold mb-2">Overview</h4>
                  <p className="text-white/85 leading-relaxed whitespace-pre-wrap">
                    {selected.description}
                  </p>
                </div>
              )}

              {/* Highlights (bulleted) */}
              {selected?.highlights?.length > 0 && (
                <div>
                  <h4 className="text-emerald-300 font-semibold mb-2">
                    Key Features
                  </h4>
                  <ul className="list-disc pl-6 space-y-1 text-white/85">
                    {selected.highlights.map((item, i) => (
                      <li key={i} className="marker:text-emerald-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact */}
              {selected?.impact && (
                <div>
                  <h4 className="text-pink-300 font-semibold mb-2">Impact</h4>
                  <p className="text-white/85 leading-relaxed">
                    {selected.impact}
                  </p>
                </div>
              )}

              {/* Technologies */}
              {selected?.tools?.length > 0 && (
                <div>
                  <h4 className="text-purple-300 font-semibold mb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tools.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-sm ring-1 ring-blue-400/30 bg-gradient-to-r from-blue-500/15 to-purple-500/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Video (optional) */}
              {selected?.video ? (
                <div className="pt-1">
                  <h4 className="text-yellow-300 font-semibold mb-3">Demo</h4>
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
                <div className="pt-1">
                  <h4 className="text-yellow-300 font-semibold mb-2">Demo</h4>
                  <div className="w-full rounded-xl ring-1 ring-white/10 bg-white/5 p-4 text-white/70">
                    Demo video not available.
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-top border-white/10">
              <div className="text-white/60 text-sm">
                Want to explore the code?
              </div>
              {selected?.github && (
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-900/30 transition text-sm"
                >
                  <Github size={16} />
                  View Repository
                </a>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};

export default ProjectsSection;
