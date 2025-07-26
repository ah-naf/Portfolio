import React, { useState, useEffect, useCallback } from "react";
import { Github, ExternalLink, Play, X } from "lucide-react";
import { projects } from "../data/portfolioData";

const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);

  const close = useCallback(() => setSelected(null), []);
  const onKey = useCallback(
    (e) => {
      if (e.key === "Escape") close();
    },
    [close]
  );
  // TODO: fix modal
  useEffect(() => {
    if (selected) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [selected, onKey]);

  return (
    <section className="rounded-3xl relative bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <Github className="text-blue-400" />
        Projects
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((p, idx) => (
          <div
            key={`${p.name}-${idx}`}
            className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition group"
          >
            <div className="flex items-start justify-between mb-3">
              <button
                onClick={() => setSelected(p)}
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

            <p className="text-white/80 mb-4 leading-relaxed">{p.summary}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {p.tools?.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm ring-1 ring-blue-400/30 bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-blue-200"
                >
                  {t}
                </span>
              ))}
            </div>

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
                onClick={() => setSelected(p)}
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

      {/* Modal */}
      {selected && (
        <div
          className="absolute top-0 inset-0 z-50 bg-black/60 backdrop-blur-sm px-4 py-6"
          onClick={close}
        >
          <div
            className="w-full max-w-3xl rounded-3xl bg-black/80 ring-1 ring-white/10 text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-xl font-semibold">{selected.name}</h3>
              <button
                onClick={close}
                className="p-2 rounded-lg hover:bg-white/10 transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 pt-5 pb-2 space-y-5">
              {/* Description */}
              <div>
                <h4 className="text-blue-300 font-semibold mb-2">Overview</h4>
                <p className="text-white/85 leading-relaxed">
                  {selected.description}
                </p>
              </div>

              {/* Impact */}
              {selected.impact && (
                <div>
                  <h4 className="text-emerald-300 font-semibold mb-2">
                    Impact
                  </h4>
                  <p className="text-white/85 leading-relaxed">
                    {selected.impact}
                  </p>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-purple-300 font-semibold mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.tools?.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-sm ring-1 ring-blue-400/30 bg-gradient-to-r from-blue-500/15 to-purple-500/15"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video (optional) */}
              {selected.video && (
                <div className="pt-1">
                  <h4 className="text-pink-300 font-semibold mb-3">Demo</h4>
                  <div className="w-full aspect-video rounded-xl overflow-hidden ring-1 ring-white/10 bg-black/40">
                    <iframe
                      className="w-full h-full"
                      src={selected.video}
                      title={`${selected.name} demo video`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/10">
              <div className="text-white/60 text-sm">
                Want to explore the code?
              </div>
              <a
                href={selected.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-900/30 transition text-sm"
              >
                <Github size={16} />
                View Repository
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
