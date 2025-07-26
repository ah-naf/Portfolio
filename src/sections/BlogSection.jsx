import React from "react";
import { BookOpen, ExternalLink } from "lucide-react";

const BlogSection = () => {
  return (
    <section className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <BookOpen className="text-blue-400" />
        Blog & Writing
      </h2>
      <div className="text-center py-10">
        <BookOpen size={56} className="mx-auto text-blue-300 mb-4" />
        <h3 className="text-xl font-semibold mb-3">Medium Blog</h3>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto">
          I regularly share insights about competitive programming, software
          development, and technology trends on Medium. My articles cover
          algorithmic problem-solving techniques, programming best practices,
          and project development experiences.
        </p>
        <a
          href="https://medium.com/@sheikhahnafshifat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:shadow-lg hover:shadow-emerald-900/30 transition text-base font-medium"
        >
          <ExternalLink size={18} />
          Visit My Medium Blog
        </a>
        <p className="text-white/60 mt-3">@sheikhahnafshifat</p>
      </div>
    </section>
  );
};

export default BlogSection;
