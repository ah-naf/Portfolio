import { Calendar, Building2, MapPin, Briefcase, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { experienceData } from "../data/experience";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const LogoBadge = ({ name, logo }) => (
  <div
    className="h-14 w-14 shrink-0 overflow-hidden rounded-lg flex items-center justify-center"
    style={{
      background: "var(--color-bg-subtle)",
      border: "2px solid var(--color-border)",
      borderRadius: "8px",
    }}
  >
    {logo ? (
      <img src={logo} alt={`${name} logo`} className="h-full w-full object-contain p-1.5" />
    ) : (
      <span className="text-xl font-black" style={{ color: "var(--color-accent)" }}>
        {name.slice(0, 1)}
      </span>
    )}
  </div>
);

const TimelineDot = ({ active = false }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="relative z-10 h-4 w-4 rounded-full"
    style={{
      background: active ? "var(--color-accent)" : "var(--color-border)",
      border: "2px solid var(--color-border)",
      boxShadow: active ? "2px 2px 0px var(--color-shadow)" : "none",
    }}
  >
    {active && (
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-40"
        style={{ background: "var(--color-accent)" }}
      />
    )}
  </motion.div>
);

const ExperienceCard = ({ role, company }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={cardVariants}
      className="neo-card p-6"
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <LogoBadge name={company.name} logo={company.logo} />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
              {role.title}
            </h3>
            <span style={{ color: "var(--color-text-secondary)" }}>•</span>
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--color-accent)" }}
            >
              {company.name}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} />
              {role.start} — {role.end}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} />
              {role.location}
            </span>
            <span className="neo-badge">{role.type}</span>
          </div>

          {role.highlights?.length > 0 && (
            <ul className="space-y-2 mb-4">
              {role.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <ChevronRight
                    size={15}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          {role.tech?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {role.tech.map((t) => (
                <span key={t} className="neo-chip">{t}</span>
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
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div variants={cardVariants} className="flex items-center gap-3 mb-8">
        <h2 className="neo-section-heading text-2xl md:text-3xl flex items-center gap-3">
          <Briefcase size={22} style={{ color: "var(--color-accent)" }} />
          Experience
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[7px] top-6 bottom-6 w-0.5 hidden md:block"
          style={{ background: "var(--color-border)" }}
        />

        <div className="space-y-5">
          {experienceData.map((exp, companyIdx) => (
            <div key={companyIdx} className="space-y-4">
              {exp.roles.map((role, roleIdx) => (
                <div
                  key={`${exp.company.name}-${roleIdx}`}
                  className="relative md:pl-10"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 hidden md:block">
                    <TimelineDot active={companyIdx === 0 && roleIdx === 0} />
                  </div>

                  <ExperienceCard role={role} company={exp.company} />
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
