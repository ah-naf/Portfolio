import React, { useEffect, useState } from "react";
import LetterGlitch from "./components/LetterGlitch";
import TopBar from "./components/TopBar";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import CompetitiveSection from "./sections/CompetitiveSection";
import ProjectsSection from "./sections/ProjectSection";
import SkillsSection from "./sections/SkillSection";
import BlogSection from "./sections/BlogSection";
import Sidebar from "./components/Sidebar";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("summary");
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <LetterGlitch
        glitchColors={["#0b1220", "#132036", "#1d2e4a", "#254055", "#2f5168"]}
        glitchSpeed={80}
        outerVignette={true}
        centerVignette={false}
        smooth={true}
        opacity={0.95}
      />

      {/* Top bar */}
      <TopBar isVisible={isVisible} />

      {/* Content grid */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Profile + Nav (sticky) */}
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Right: Active content */}
          <main className="lg:col-span-8 xl:col-span-9">
            {activeSection === "summary" && (
              <SummarySection setActiveSection={setActiveSection} />
            )}
            {activeSection === "experience" && <ExperienceSection />}
            {activeSection === "competitive" && <CompetitiveSection />}
            {activeSection === "projects" && <ProjectsSection />}
            {activeSection === "skills" && <SkillsSection />}
            {activeSection === "blog" && <BlogSection />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
