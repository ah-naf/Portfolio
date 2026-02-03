import React from "react";
import { Calendar, Building2, MapPin, Star, Briefcase, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { experienceData } from "../data/experience";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Pill = ({ children, color = "white" }) => (
  <span className={`inline-flex items-center gap-1 rounded-full bg-${color}/10 px-3 py-1 text-xs text-${color}/80 ring-1 ring-${color}/20`}>
    <Star size={12} className="opacity-70" /> {children}
  </span>
);

const TechTag = ({ children }) => (
  <motion.span
    className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300 ring-1 ring-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-default"
    whileHover={{ scale: 1.05 }}
  >
    {children}
  </motion.span>
);

const LogoBadge = ({ name, logo }) => (
  <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 ring-1 ring-white/10">
    {logo ? (
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-full w-full object-contain p-1"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-xl font-bold gradient-text">
        {name.slice(0, 1)}
      </div>
    )}
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
  </div>
);

const TimelineDot = ({ active = false }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className={`relative z-10 h-4 w-4 rounded-full ${
      active
        ? "bg-gradient-to-r from-purple-500 to-blue-500"
        : "bg-white/20"
    }`}
    style={active ? { boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)" } : {}}
  >
    {active && (
      <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-50" />
    )}
  </motion.div>
);

const ExperienceCard = ({ role, company, isLast }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={cardVariants}
      className="relative rounded-2xl p-6 bg-white/5 ring-1 ring-white/10 hover:ring-purple-500/30 transition-all duration-300 card-hover"
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <LogoBadge name={company.name} logo={company.logo} />
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-white">{role.title}</h3>
            <span className="text-white/30">•</span>
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="text-purple-300 hover:text-purple-200 font-medium transition-colors"
            >
              {company.name}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} className="text-blue-400" />
              {role.start} — {role.end}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-green-400" />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-xs">
              {role.type}
            </span>
          </div>

          {role.highlights?.length > 0 && (
            <ul className="space-y-2 mb-4">
              {role.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70">
                  <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          {role.tech?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {role.tech.map((t) => (
                <TechTag key={t}>{t}</TechTag>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="rounded-3xl glass p-6 md:p-8 text-white/90"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="flex items-center gap-3 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full" />
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10">
            <Briefcase className="text-blue-400" size={24} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">Experience</h2>
          <p className="text-sm text-white/50">My professional journey</p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent hidden md:block" />

        <div className="space-y-6">
          {experienceData.map((exp, companyIdx) => (
            <div key={companyIdx} className="space-y-4">
              {exp.roles.map((role, roleIdx) => (
                <div key={`${exp.company.name}-${roleIdx}`} className="relative md:pl-10">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 hidden md:block">
                    <TimelineDot active={companyIdx === 0 && roleIdx === 0} />
                  </div>

                  <ExperienceCard
                    role={role}
                    company={exp.company}
                    isLast={companyIdx === experienceData.length - 1 && roleIdx === exp.roles.length - 1}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;
