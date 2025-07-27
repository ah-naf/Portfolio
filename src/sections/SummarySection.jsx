import React from "react";
import { BookOpen, Award, Calendar } from "lucide-react";

const SummarySection = () => {
  return (
    <section className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <BookOpen className="text-blue-400" />
        Summary
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-3">About Me</h3>
          <p className="text-white/80 leading-relaxed mb-4">
            I'm a passionate Computer Science Engineer specializing in
            competitive programming and full-stack development. With a strong
            foundation in algorithms and data structures, I've solved over 2500
            problems across various online judges and achieved notable rankings
            in programming contests.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            Education
          </h3>
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
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
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
