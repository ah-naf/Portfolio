import React from "react";
import {
  BookOpen,
  Award,
  Calendar,
  Trophy,
  Star,
  Code2,
  Rocket,
  ExternalLink,
  FileDown,
  ArrowRight,
  Mail,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { competitiveProfiles } from "../data/portfolioData";

const SummarySection = ({ setActiveSection }) => {
  const { totalSolvedAllOJ, codeforces, codechef } = competitiveProfiles;

  const tech = ["Go", "React", "Node.js", "PostgreSQL", "Docker"];

  return (
    <section className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <BookOpen className="text-blue-400" />
        Summary
      </h2>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Left: About + Education */}
        <div className="xl:col-span-2 space-y-6">
          {/* About */}
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              About Me
            </h3>
            <p className="text-white/80 leading-relaxed">
              I'm a passionate Computer Science Engineer specializing in
              competitive programming and full‑stack development. With a strong
              foundation in algorithms and data structures, I've solved over{" "}
              {totalSolvedAllOJ}+ problems across online judges and achieved
              notable contest rankings.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveSection("competitive")}
              className="text-left rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">
                  Problems Solved (All OJs)
                </span>
                <Code2 size={18} className="text-blue-300" />
              </div>
              <div className="text-2xl font-bold">{totalSolvedAllOJ}+</div>
              <div className="mt-1 text-white/70 text-sm">See profiles →</div>
            </button>

            <button
              onClick={() => setActiveSection("competitive")}
              className="text-left rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-amber-500/10 to-red-500/10 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Codeforces Max</span>
                <Trophy size={18} className="text-amber-300" />
              </div>
              <div className="text-2xl font-bold">{codeforces.maxRating}</div>
              <div className="mt-1 text-white/70 text-sm">
                {codeforces.rankTitle}
              </div>
            </button>

            <button
              onClick={() => setActiveSection("competitive")}
              className="text-left rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">CodeChef</span>
                <Star size={18} className="text-yellow-300" />
              </div>
              <div className="text-2xl font-bold">{codechef.stars}★</div>
              <div className="mt-1 text-white/70 text-sm">
                Max {codechef.maxRating}
              </div>
            </button>
          </div>

          {/* Current Focus */}
          <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Rocket size={18} className="text-emerald-300" />
              <h3 className="text-lg font-semibold text-emerald-300">
                Currently working on
              </h3>
            </div>
            <ul className="list-disc pl-5 text-white/80 space-y-1">
              <li>Learning Golang.</li>
              <li>Learning System Design.</li>
            </ul>
          </div>
        </div>

        {/* Right column: Education + Tech + CTAs */}
        <div className="space-y-6">
          {/* Education */}
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              Education
            </h3>
            <h4 className="text-base md:text-lg font-semibold mb-1">
              B.Sc. (Eng.) in Computer Science and Engineering
            </h4>
            <p className="text-purple-300 font-medium mb-2">
              Comilla University
            </p>
            <div className="flex items-center text-white/80 mb-1">
              <Calendar size={16} className="mr-2" />
              January 2020 – July 2025
            </div>
            <div className="flex items-center text-white/80">
              <Award size={16} className="mr-2" />
              CGPA: 3.30 out of 4.00
            </div>
          </div>

          {/* Tech chips with tooltips */}
          <Tooltip.Provider delayDuration={150}>
            <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-white/5">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Core Tech
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <Tooltip.Root key={t}>
                    <Tooltip.Trigger asChild>
                      <span className="px-3 py-1 rounded-lg text-sm ring-1 ring-blue-400/30 bg-gradient-to-r from-blue-500/15 to-purple-500/15 hover:bg-white/10 cursor-default">
                        {t}
                      </span>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      className="rounded-md px-2 py-1 text-xs bg-black/80 ring-1 ring-white/10 text-white shadow"
                    >
                      {`I use ${t} extensively in projects`}
                      <Tooltip.Arrow className="fill-black/80" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                ))}
              </div>
            </div>
          </Tooltip.Provider>

          {/* CTAs */}
          <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setActiveSection("projects")}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition"
              >
                <span className="font-medium">Explore Projects</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setActiveSection("competitive")}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition"
              >
                <span className="font-medium">See Contest History</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setActiveSection("blog")}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition"
              >
                <span className="font-medium">Read Blog</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Resume + Email */}
            <div className="mt-4 flex items-center gap-2">
              <a
                href="/Ahnaf_Hasan_Shifat.pdf"
                className="px-3 py-2 flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-900/30 transition text-sm"
                target="_blank"
              >
                <FileDown size={16} />
                Resume
              </a>
              <a
                href="mailto:sheikhahnafshifat@gmail.com"
                className="px-3 py-2 rounded-lg bg-white/10 text-white inline-flex items-center gap-2 hover:bg-white/15 transition text-sm"
              >
                <Mail size={16} />
                Email Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
