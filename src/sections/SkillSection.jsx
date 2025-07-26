import React from "react";
import { Star } from "lucide-react";
import { skills } from "../data/portfolioData";

const SkillsSection = () => {
  return (
    <section className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <Star className="text-blue-400" />
        Technical Skills
      </h2>
      <div className="space-y-5">
        {Object.entries(skills).map(([category, list], idx) => (
          <div
            key={idx}
            className="rounded-2xl p-5 ring-1 ring-white/10 bg-white/5"
          >
            <h3 className="text-blue-300 font-semibold mb-3">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {list.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-sm ring-1 ring-blue-400/30 bg-gradient-to-r from-blue-500/15 to-purple-500/15 hover:scale-105 transition"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
