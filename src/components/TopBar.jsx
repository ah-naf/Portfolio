import React from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const RESUME_URL = "https://ah-naf.github.io/Portfolio/Ahnaf_Hasan_Shifat.pdf";

const TopBar = ({ isVisible = true, theme, toggle }) => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -80,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: "var(--color-bg)",
        borderBottom: "2px solid var(--color-border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Logo + name */}
        <div className="flex items-center gap-3">
          <div
            className="neo-btn-icon w-9 h-9 shrink-0 overflow-hidden p-0.5"
            style={{ cursor: "default" }}
            aria-hidden="true"
          >
            <img
              src={`${import.meta.env.BASE_URL}pixel_sprite.png`}
              alt=""
              className="w-full h-full object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <span
            className="font-bold text-base"
            style={{ color: "var(--color-text-primary)" }}
          >
            Ahnaf
          </span>
        </div>

        {/* Right: Resume + theme toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn-secondary hidden sm:inline-flex px-3.5 py-1.5 text-xs"
          >
            Resume ↗
          </a>
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;
