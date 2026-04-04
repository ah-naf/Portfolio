import { Mail, Linkedin, Github, BookOpen, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "../data/portfolioData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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

const contactLinks = (p) => [
  {
    icon: Mail,
    label: "Email",
    value: p.email,
    href: `mailto:${p.email}`,
    iconColor: "#2d6be4",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ahnafhasan144",
    href: p.links.linkedin,
    iconColor: "#0a66c2",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ah-naf",
    href: p.links.github,
    iconColor: "#1c293c",
  },
  {
    icon: BookOpen,
    label: "Blog",
    value: "@sheikhahnafshifat",
    href: p.links.blog,
    iconColor: "#059669",
  },
];

const ContactSection = () => {
  const links = contactLinks(profile);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div variants={cardVariants} className="mb-3">
        <h2 className="neo-section-heading text-2xl md:text-3xl">Get In Touch</h2>
      </motion.div>
      <motion.p
        variants={cardVariants}
        className="text-base mb-8 mt-3"
        style={{ color: "var(--color-text-secondary)" }}
      >
        I'm open to interesting roles and collaborations. Drop me a line.
      </motion.p>

      {/* Contact cards grid */}
      <motion.div
        variants={containerVariants}
        className="grid sm:grid-cols-2 gap-5 mb-6"
      >
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              variants={cardVariants}
              className="neo-card-interactive p-6 block group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="neo-btn-icon p-3" style={{ cursor: "default" }}>
                  <Icon size={20} style={{ color: link.iconColor }} />
                </div>
                <div className="transition-opacity group-hover:opacity-60">
                  <ArrowUpRight size={18} style={{ color: "var(--color-text-secondary)" }} />
                </div>
              </div>

              <h3
                className="font-bold text-base mb-1"
                style={{ color: "var(--color-text-primary)" }}
              >
                {link.label}
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {link.value}
              </p>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Email CTA */}
      <motion.div variants={cardVariants} className="neo-card p-7 text-center">
        <p
          className="font-semibold mb-5 text-base"
          style={{ color: "var(--color-text-primary)" }}
        >
          Prefer email? I respond within 24 hours.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="neo-btn-primary px-8 py-3.5 gap-2.5 text-sm"
        >
          <Mail size={16} />
          Send an Email
        </a>
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;
