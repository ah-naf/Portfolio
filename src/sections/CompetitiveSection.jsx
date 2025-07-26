import React from "react";
import { Trophy, Code, Star, Users, ExternalLink } from "lucide-react";
import { contestHistory, competitiveProfiles } from "../data/portfolioData";

const CompetitiveSection = () => {
  const { codeforces, codechef, stopstalk, totalSolvedAllOJ } =
    competitiveProfiles;

  return (
    <section className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90">
      {/* Header with StopStalk button at the top */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Trophy className="text-blue-400" />
          Competitive Programming
        </h2>
        <a
          href={stopstalk.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-900/30 transition text-sm md:text-base"
        >
          <ExternalLink size={16} />
          StopStalk Profile
        </a>
      </div>

      {/* Profiles summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-3">
        {/* Codeforces */}
        <div className="rounded-2xl p-6 ring-1 ring-orange-400/30 bg-gradient-to-br from-orange-500/15 to-red-500/15">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold flex items-center">
              <Code className="mr-2 text-orange-300" />
              Codeforces
            </h3>
            <a
              href={codeforces.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white inline-flex items-center gap-1 text-sm"
              title={codeforces.handle}
            >
              @{codeforces.handle}
              <ExternalLink size={14} />
            </a>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-300 font-bold text-lg">
                {codeforces.rankTitle}
              </p>
              <p className="text-white/80">
                Max Rating: {codeforces.maxRating}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-300">
                {totalSolvedAllOJ}+
              </div>
              <p className="text-white/80 text-sm">Problems Solved (All OJs)</p>
            </div>
          </div>
        </div>

        {/* CodeChef */}
        <div className="rounded-2xl p-6 ring-1 ring-yellow-400/30 bg-gradient-to-br from-yellow-500/15 to-orange-500/15">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold flex items-center">
              <Star className="mr-2 text-yellow-300" />
              CodeChef
            </h3>
            <a
              href={codechef.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white inline-flex items-center gap-1 text-sm"
              title={codechef.handle}
            >
              @{codechef.handle}
              <ExternalLink size={14} />
            </a>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 font-bold text-lg">
                {codechef.stars} Star
              </p>
              <p className="text-white/80">Max Rating: {codechef.maxRating}</p>
            </div>
            <div className="flex">
              {[...Array(codechef.stars)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-yellow-300 fill-current"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contest History */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Trophy className="mr-2 text-blue-300" />
          Contest History
        </h3>
        <div className="space-y-4">
          {contestHistory.map((contest, i) => (
            <div
              key={`${contest.name}-${i}`}
              className={`rounded-2xl p-4 transition hover:scale-[1.01] ring-1 ${
                contest.highlight
                  ? "bg-gradient-to-r from-yellow-500/15 to-orange-500/15 ring-yellow-400/40"
                  : "bg-white/5 ring-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <h4 className="font-semibold mb-1 truncate">
                    {contest.url ? (
                      <a
                        href={contest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        title={contest.name}
                      >
                        {contest.name}
                      </a>
                    ) : (
                      contest.name
                    )}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm">
                    <span className="flex items-center">
                      <Users size={16} className="mr-2" />
                      Team: {contest.team}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 ring-1 ring-white/10">
                      {contest.type}
                    </span>
                  </div>
                </div>
                <div
                  className={
                    contest.highlight
                      ? "text-yellow-300 text-right"
                      : "text-blue-300 text-right"
                  }
                >
                  <div className="text-2xl font-bold">{contest.position}</div>
                  <p className="text-sm">Position</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitiveSection;
