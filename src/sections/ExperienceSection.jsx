import React from "react";
import { Code, Calendar } from "lucide-react";

const ExperienceSection = () => {
  return (
    <section className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <Code className="text-blue-400" />
        Experience
      </h2>
      <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">
              C++ Competitive Programming Checker
            </h3>
            <p className="text-purple-300 font-medium mb-1">
              micro1 • Part-time, Remote
            </p>
            <div className="flex items-center text-white/80">
              <Calendar size={16} className="mr-2" />
              May 2025 – July 2025
            </div>
          </div>
        </div>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3" />
            Analyzed and verified C++ solutions for correctness, performance,
            and edge-case coverage.
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3" />
            Provided clear, actionable feedback to help authors improve code
            quality and algorithmic efficiency.
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3" />
            Developed and maintained robust checker tools capable of validating
            multiple valid outputs per problem.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ExperienceSection;
