"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

type Skill = { name: string; logo: string; mono?: boolean };

const skills: Skill[] = [
  { name: "HTML", logo: "/skills/html5.svg" },
  { name: "CSS", logo: "/skills/css3.svg" },
  { name: "Tailwind CSS", logo: "/skills/tailwindcss.svg" },
  { name: "JavaScript", logo: "/skills/javascript.svg" },
  { name: "TypeScript", logo: "/skills/typescript.svg" },
  { name: "React", logo: "/skills/react.svg" },
  // Next.js logosu tek renk; currentColor kullandığı için temaya uyum sağlıyor
  { name: "Next.js", logo: "/skills/nextjs.svg", mono: true },
  { name: "Node.js", logo: "/skills/nodejs.svg" },
  { name: "MongoDB", logo: "/skills/mongodb.svg" },
  // React Native'in ayrı bir logosu yok, React ile aynı atomu kullanıyor
  { name: "React Native", logo: "/skills/react.svg" },
  { name: "C#", logo: "/skills/csharp.svg" },
  { name: ".NET Core", logo: "/skills/dotnetcore.svg" },
  { name: "PostgreSQL", logo: "/skills/postgresql.svg" },
  { name: "Python", logo: "/skills/python.svg" },
  { name: "VS Code", logo: "/skills/vscode.svg" },
  { name: "Git", logo: "/skills/git.svg" },
];

const Skills = () => {
  const t = useTranslations("Skills");

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-white via-white bg-gray-50 dark:from-black dark:via-black dark:to-gray-950 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
    >
      {/* Başlık */}
      <div className="text-center mb-8">
        <motion.h2
          ref={ref}
          className="text-5xl font-bold text-black dark:text-white tracking-tighter"
          initial={reduceMotion ? false : { opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="text-gray-800 dark:text-gray-400 text-lg mt-4"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
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
            initial={reduceMotion ? false : { opacity: 0, y: 50 }}
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
                {skill.mono ? (
                  // Tek renk logo: maske olarak kullanıp metin rengiyle boyuyoruz,
                  // böylece açık temada siyah, koyu temada beyaz görünüyor.
                  <span
                    role="img"
                    aria-label={skill.name}
                    className="block w-10 h-10 md:w-16 md:h-16 bg-black dark:bg-white"
                    style={{
                      WebkitMaskImage: `url(${skill.logo})`,
                      maskImage: `url(${skill.logo})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                  />
                ) : (
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 md:w-16 md:h-16 object-contain"
                  />
                )}
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
