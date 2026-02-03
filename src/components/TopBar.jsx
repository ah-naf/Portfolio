import React, { useState, useEffect } from "react";
import { Mail, Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/portfolioData";

const TopBar = ({ isVisible = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            isScrolled
              ? "glass-strong shadow-lg shadow-purple-900/10"
              : "glass"
          }`}
        >
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            {/* Animated status dot */}
            <motion.div
              className="relative h-3 w-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative block h-3 w-3 rounded-full bg-emerald-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl font-bold tracking-wide"
            >
              <span className="gradient-text-animated">{profile.name}</span>
            </motion.h1>

            <span className="hidden md:inline text-white/30">|</span>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:inline text-sm text-white/60"
            >
              {profile.title}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;
