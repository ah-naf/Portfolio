import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import TopBar from "./components/TopBar";
import HeroSection from "./components/HeroSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import CompetitiveSection from "./sections/CompetitiveSection";
import ProjectsSection from "./sections/ProjectSection";
import SkillsSection from "./sections/SkillSection";
import BlogSection from "./sections/BlogSection";
import ContactSection from "./sections/ContactSection";
import { useTheme } from "./hooks/useTheme";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const TABS = [
  { id: "about",       label: "About" },
  { id: "experience",  label: "Experience" },
  { id: "projects",    label: "Projects" },
  { id: "skills",      label: "Skills" },
  { id: "competitive", label: "Competitive" },
  { id: "blog",        label: "Blog" },
  { id: "contact",     label: "Contact" },
];

// Offset = TopBar (65px) + TabNav (~49px)
const SCROLL_OFFSET = 114;

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [isVisible, setIsVisible] = useState(false);
  const { theme, toggle } = useTheme();
  const tabNavRef = useRef(null);

  useEffect(() => setIsVisible(true), []);

  // GSAP ScrollTrigger: update active tab as sections enter viewport
  useEffect(() => {
    const triggers = TABS.map((tab) => {
      const el = document.getElementById(`section-${tab.id}`);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: `top ${SCROLL_OFFSET + 40}px`,
        end: `bottom ${SCROLL_OFFSET + 40}px`,
        onEnter: () => setActiveTab(tab.id),
        onEnterBack: () => setActiveTab(tab.id),
      });
    });

    return () => triggers.forEach((t) => t?.kill());
  }, []);

  // Keep active tab button visible in the scrollable tab strip
  useEffect(() => {
    const nav = tabNavRef.current;
    if (!nav) return;
    const activeBtn = nav.querySelector(".neo-tab-active");
    if (activeBtn) {
      activeBtn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  }, [activeTab]);

  const scrollToSection = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    gsap.to(window, { scrollTo: y, duration: 0.7, ease: "power2.inOut" });
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Top bar */}
      <TopBar isVisible={isVisible} theme={theme} toggle={toggle} />

      {/* Hero */}
      <HeroSection />

      {/* Sticky tab navigation */}
      <div
        className="sticky z-40"
        style={{
          top: "65px",
          background: "var(--color-bg)",
          borderBottom: "2px solid var(--color-border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div
            ref={tabNavRef}
            className="flex overflow-x-auto scrollbar-hide"
            role="tablist"
            aria-label="Portfolio sections"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={activeTab === tab.id ? "neo-tab-active" : "neo-tab"}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All sections stacked vertically */}
      <main className="max-w-5xl mx-auto px-6">
        {TABS.map((tab, i) => (
          <motion.div
            key={tab.id}
            id={`section-${tab.id}`}
            className={i === 0 ? "py-10" : "py-16"}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab.id === "about"       && <SummarySection setActiveTab={setActiveTab} />}
            {tab.id === "experience"  && <ExperienceSection />}
            {tab.id === "projects"    && <ProjectsSection />}
            {tab.id === "skills"      && <SkillsSection />}
            {tab.id === "competitive" && <CompetitiveSection />}
            {tab.id === "blog"        && <BlogSection />}
            {tab.id === "contact"     && <ContactSection />}
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default Portfolio;
