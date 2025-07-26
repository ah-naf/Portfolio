import React from "react";
import { Mail, Phone } from "lucide-react";
import { profile } from "../data/portfolioData";

const TopBar = ({ isVisible = true }) => {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl bg-black/20 backdrop-blur-md ring-1 ring-white/10 px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/90 animate-pulse" />
            <h1 className="text-lg md:text-xl font-semibold text-white/90 tracking-wide">
              {profile.name}
            </h1>
            <span className="hidden md:inline text-sm text-white/60">•</span>
            <span className="hidden md:inline text-sm text-white/70">
              {profile.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="hidden md:inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              <Mail size={16} />
              <span>{profile.email}</span>
            </a>
            <a
              href={`tel:${profile.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              <Phone size={16} />
              <span>{profile.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
