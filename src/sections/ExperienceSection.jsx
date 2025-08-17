import React from "react";
import { Calendar, Building2, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { experienceData } from "../data/experience";

const Dot = ({ active = false }) => (
  <div
    className={`relative z-10 h-3 w-3 rounded-full ${
      active
        ? "bg-blue-400 ring-8 ring-blue-400/20"
        : "bg-white/30 ring-8 ring-white/10"
    }`}
  />
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
    <Star size={14} className="opacity-70" /> {children}
  </span>
);

const TechTag = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300 ring-1 ring-inset ring-blue-300/20">
    {children}
  </span>
);

const LogoBadge = ({ name, logo }) => (
  <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10">
    {logo ? (
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-full w-full object-contain"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white/80">
        {name.slice(0, 1)}
      </div>
    )}
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
  </div>
);

const Header = ({ company }) => (
  <div className="flex items-center gap-4">
    <LogoBadge name={company.name} logo={company.logo} />
    <div>
      <div className="flex items-center gap-2 text-white/70">
        <Building2 size={16} className="text-blue-300" />
        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-blue-400/40 underline-offset-4 hover:text-white"
        >
          {company.name}
        </a>
      </div>
      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
        Experience
      </h2>
    </div>
  </div>
);

const SingleCard = ({ role, company }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-6 md:p-8 ring-1 ring-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
  >
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-white/80">
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            {role.title}
          </h3>
          <span className="text-white/40">•</span>
          <span className="text-purple-300/90 font-medium">{company.name}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/70">
          <span className="inline-flex items-center gap-2">
            <Calendar size={16} className="text-blue-300" />
            {role.start} — {role.end}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-green-300" /> {role.location}
          </span>
          <Pill>{role.type}</Pill>
        </div>
      </div>
    </div>

    <ul className="mt-6 grid gap-3 text-white/80">
      {role.highlights.map((h, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-blue-400" />
          <span>{h}</span>
        </li>
      ))}
    </ul>

    <div className="mt-6 flex flex-wrap gap-2">
      {role.tech.map((t) => (
        <TechTag key={t}>{t}</TechTag>
      ))}
    </div>
  </motion.div>
);

const Stepper = ({ roles }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="relative"
  >
    <div className="absolute left-[5px] top-3 h-full w-px bg-gradient-to-b from-blue-400/40 via-white/10 to-transparent" />
    <div className="space-y-8">
      {roles.map((r, idx) => (
        <div key={`${r.title}-${idx}`} className="relative pl-10">
          <div className="absolute left-0 top-2">
            <Dot active={idx === roles.length - 1} />
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-2 text-white/90 font-semibold">
                {r.title}
              </span>
              <span className="text-white/40">•</span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} className="text-blue-300" /> {r.start} —{" "}
                {r.end}
              </span>
              <span className="text-white/40">•</span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-green-300" /> {r.location}
              </span>
              <span className="text-white/40">•</span>
              <Pill>{r.type}</Pill>
            </div>
            {r.highlights?.length ? (
              <ul className="mt-4 grid gap-2 text-white/80">
                {r.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {r.tech?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {r.tech.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const ExperienceSection = () => {
  return (
    <section className="rounded-3xl bg-[radial-gradient(1200px_500px_at_10%_-10%,rgba(56,189,248,0.08),transparent),radial-gradient(1200px_500px_at_90%_110%,rgba(147,51,234,0.08),transparent)] bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90">
      <div className="flex flex-col gap-12">
        {experienceData.map((exp, idx) => {
          const useStepper = exp.roles.length > 1;
          return (
            <div key={idx} className="flex flex-col gap-6">
              <Header company={exp.company} />

              {useStepper ? (
                <Stepper roles={exp.roles} />
              ) : (
                <SingleCard role={exp.roles[0]} company={exp.company} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceSection;
