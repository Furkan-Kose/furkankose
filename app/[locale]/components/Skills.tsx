"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const skills = [
  { name: "HTML", logo: "https://img.icons8.com/?size=100&id=20909&format=png&color=000000" },
  { name: "CSS", logo: "https://img.icons8.com/?size=100&id=21278&format=png&color=000000" },
  { name: "Tailwind CSS", logo: "https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000" },
  { name: "JavaScript", logo: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000" },
  { name: "TypeScript", logo: "https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000" },
  { name: "React", logo: "https://img.icons8.com/?size=100&id=123603&format=png&color=000000" },
  { name: "Next.js", logo: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000" },
  { name: "Node.js", logo: "https://img.icons8.com/?size=100&id=54087&format=png&color=000000" },
  { name: "MongoDB", logo: "https://img.icons8.com/?size=100&id=74402&format=png&color=000000" },
  { name: "Flutter", logo: "https://img.icons8.com/?size=100&id=7I3BjCqe9rjG&format=png&color=000000" },
  { name: "C#", logo: "https://img.icons8.com/?size=100&id=55251&format=png&color=000000" },
  { name: ".NET Core", logo: "https://img.icons8.com/?size=100&id=1BC75jFEBED6&format=png&color=000000" },
  { name: "MS SQL", logo: "https://img.icons8.com/?size=100&id=laYYF3dV0Iew&format=png&color=000000" },
  { name: "Python", logo: "https://img.icons8.com/?size=100&id=13441&format=png&color=000000" },
  { name: "VS Code", logo: "https://img.icons8.com/?size=100&id=9OGIyU8hrxW5&format=png&color=000000" },
  { name: "Git", logo: "https://img.icons8.com/?size=100&id=20906&format=png&color=000000" },
];

const Skills = () => {
  const t = useTranslations("Skills");

  const ref = useRef(null);
  const inView = useInView(ref, {once: true});

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-white via-white to-gray-50 dark:from-black dark:via-black dark:to-gray-950 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
    >
      {/* Başlık */}
      <div className="text-center mb-8">
        <motion.h2
          ref={ref}
          className="text-5xl font-bold text-black dark:text-white tracking-tighter"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="text-gray-800 dark:text-gray-400 text-lg mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {t("description")}
        </motion.p>
      </div>

      {/* Yetenekler İçin Kartlar */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-8 p-2 md:p-8 rounded-lg">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center gap-2"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white py-4 px-2 md:p-6 flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-500 to-transparent opacity-10 pointer-events-none z-10"></div>
              <div className="flex items-center justify-center h-full z-20">
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-10 h-10 md:w-16 md:h-16 object-contain"
                />
              </div>
            </div>
            <p className="text-black dark:text-white mt-2">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
