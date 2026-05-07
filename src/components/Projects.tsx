"use client";

import React from "react";
import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    company: "Mavlers",
    role: "Frontend Developer",
    duration: "Aug 2024 - Present",
    description: "Built a responsive platform for social causes with donation tracking and event calendar.",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    color: "from-blue-500/20",
  },
  {
    company: "Codoxy Solution (OLA Cabs / OLA Electric)",
    role: "Frontend Developer",
    duration: "Nov 2022 - Present",
    description: "Developed scratch-and-win game with probability logic. Built purchasing app with React.js & payment integration. Redesigned and optimized onboarding flow from 24 to 10 steps.",
    technologies: ["Next.js", "React.js", "Redux", "Vue.js"],
    color: "from-purple-500/20",
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Assistant System Engineer",
    duration: "Jul 2021 - Oct 2022",
    description: "Migrated banking application from Symfony PHP to React.js. Developed a secure chatbot system for the banking platform.",
    technologies: ["React.js", "TypeScript", "Redux", "Laravel"],
    color: "from-emerald-500/20",
  },
  {
    company: "DevYug Solutions",
    role: "Frontend Developer (Freelance)",
    duration: "2022 - Present",
    description: "Built responsive websites and dashboards for clients. Delivered high-performance websites with fast turnaround times.",
    technologies: ["React.js", "Next.js", "JavaScript"],
    color: "from-rose-500/20",
  },
];

const SKILLS = {
  Frontend: ["React.js", "Next.js", "Vue.js", "TypeScript", "Three.js"],
  Styling: ["Tailwind CSS", "SCSS", "Less"],
  Tools: ["AWS", "GitHub", "Jenkins", "Figma", "Redux"],
};

const ExperienceCard = ({ item, index }: { item: typeof EXPERIENCE[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10`}
    >
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${item.color} to-transparent blur-3xl transition-transform group-hover:scale-125`} />
      
      <span className="text-xs uppercase tracking-widest text-white/40">
        {item.duration}
      </span>
      <h3 className="mt-2 text-3xl font-bold text-white">{item.company}</h3>
      <h4 className="mt-1 text-xl font-medium text-white/80">{item.role}</h4>
      <p className="mt-4 text-white/50 leading-relaxed">
        {item.description}
      </p>
      
      <div className="mt-6 flex flex-wrap gap-2">
        {item.technologies.map(tech => (
          <span key={tech} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="bg-[#121212] py-24 px-10 md:px-24">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl text-white">EXPERIENCE</h2>
        <div className="mt-4 h-1 w-24 bg-white/20" />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {EXPERIENCE.map((item, index) => (
          <ExperienceCard key={item.company} item={item} index={index} />
        ))}
      </div>

      <div className="mt-32 mb-16">
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl text-white">SKILLS</h2>
        <div className="mt-4 h-1 w-24 bg-white/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(SKILLS).map(([category, skills]) => (
          <div key={category} className="border border-white/10 p-8 rounded-2xl bg-white/5">
            <h3 className="text-2xl font-semibold mb-6 text-white/80">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                 <span key={skill} className="bg-white/10 px-4 py-2 rounded text-sm text-white/70">
                   {skill}
                 </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/40">
        <p>© {new Date().getFullYear()} Rishabh Dapkara.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://github.com/RISHABHPORWAL027" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/rishabhdapkara" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:porwal027@gmail.com" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </section>
  );
};

export default Projects;
