import React from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { mediumPosts } from "../data/portfolioData";

const BlogSection = () => {
  return (
    <section
      id="blog"
      className="rounded-3xl bg-black/25 backdrop-blur-2xl ring-1 ring-white/10 p-6 md:p-8 text-white/90"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <BookOpen className="text-blue-400" />
        Blog & Writing
      </h2>
      <div className="grid sm:grid-cols-1 gap-6">
        {mediumPosts.map((post) => (
          <a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl p-5 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {post.title}
            </h3>
            <div className="mt-3 inline-flex items-center gap-2 text-blue-300">
              <ExternalLink size={16} />
              <span className="text-sm">Read on Medium</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
