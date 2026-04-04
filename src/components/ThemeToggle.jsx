import React from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ theme, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="neo-btn-icon p-2"
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun size={18} style={{ color: "var(--color-accent-amber)" }} />
      ) : (
        <Moon size={18} style={{ color: "var(--color-accent)" }} />
      )}
    </button>
  );
};

export default ThemeToggle;
