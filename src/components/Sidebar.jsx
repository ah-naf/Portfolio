import React from "react";
import { Mail, Phone, Linkedin, Github, BookOpen } from "lucide-react";
import { navSections, profile } from "../data/portfolioData";

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="lg:col-span-4 xl:col-span-3">
      <div className="sticky top-24 space-y-6">
        {/* Profile card */}
        <div className="rounded-3xl bg-black/25 backdrop-blur-xl ring-1 ring-white/10 p-6 text-white/90">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Contact</h2>
              <p className="text-sm text-white/60">Let’s connect</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profile.links.linkedin}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                <Linkedin size={18} className="text-blue-400" />
              </a>
              <a
                href={profile.links.github}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                <Github size={18} className="text-gray-300" />
              </a>
              <a
                href={profile.links.blog}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                <BookOpen size={18} className="text-emerald-400" />
              </a>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-white/80 hover:text-white transition"
            >
              <Mail size={16} /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phoneRaw}`}
              className="flex items-center gap-3 text-white/80 hover:text-white transition"
            >
              <Phone size={16} /> {profile.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Navigation card */}
        <nav className="rounded-3xl bg-black/25 backdrop-blur-xl ring-1 ring-white/10 p-3">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {navSections.map((s) => {
              const active = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center justify-start gap-2 px-4 py-3 rounded-2xl transition ${
                    active
                      ? "bg-gradient-to-r from-blue-600/70 to-purple-600/70 text-white shadow-lg shadow-blue-900/30"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {s.icon}
                  <span className="text-sm font-medium">{s.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
