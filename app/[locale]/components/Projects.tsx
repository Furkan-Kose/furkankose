"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

type Project = {
  slug: string;
  title: string;
  image: string;
  link: string;
  stack: string[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    slug: "rngsport",
    title: "RNG Sport",
    image: "/projects/rngsport.webp",
    link: "https://rngsport.com",
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Prisma", "PostgreSQL", "iyzico", "Cloudflare R2"],
    featured: true,
  },
  {
    slug: "rangemedia",
    title: "Range Media",
    image: "/projects/rangemedia.webp",
    link: "https://rangemedia.com.tr",
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    slug: "ritmikacup",
    title: "Ritmika Cup",
    image: "/projects/ritmikacup.webp",
    link: "https://ritmikacup.com",
    stack: ["React", "Vite", "Tailwind CSS"],
  },
  {
    slug: "patimap",
    title: "PatiMap",
    image: "/projects/patimap.webp",
    link: "https://patimap.netlify.app",
    stack: ["React", "React Native", "Vite", "Tailwind CSS", "Leaflet", "Node.js", "Express.js", "MongoDB"],
    featured: true,
  },
  {
    slug: "adabahce",
    title: "Ada Bahçe",
    image: "/projects/adabahce.webp",
    link: "https://adabahce.com.tr",
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
  },
  {
    slug: "ritmikacimnastik",
    title: "Ritmika Cimnastik",
    image: "/projects/ritmikacimnastik.webp",
    link: "https://ritmikacimnastik.com.tr",
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    slug: "etadilat",
    title: "E-Tadilat",
    image: "/projects/etadilat.webp",
    link: "https://etadilat.vercel.app",
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    slug: "depon",
    title: "Depon",
    image: "/projects/depon.webp",
    link: "https://depon.vercel.app",
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    slug: "furkankose",
    title: "Furkan Köse",
    image: "/projects/furkankose.webp",
    link: "https://furkankose.vercel.app",
    stack: ["Next.js", "Tailwind CSS"],
  },
];

const Projects = () => {
  const t = useTranslations("Projects");

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center justify-center pt-32 pb-20 bg-gray-200 dark:bg-gray-900 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
    >
      <div className="absolute inset-0 h-20 bg-gray-50 dark:bg-gray-950 clip-path-triangle"></div>

      <div className="text-center mb-14 w-full max-w-2xl">
        <motion.h2
          ref={ref}
          className="text-5xl font-extrabold text-black dark:text-white tracking-tight"
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

      <div className="grid w-full max-w-7xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.article
            key={project.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm transition-colors duration-300 hover:border-blue-500 dark:hover:border-blue-500"
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            {/* Ekran görüntüsü - kırpılmadan, kendi oranında */}
            <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-3">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={t("imageAlt", { title: project.title })}
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 30vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
                  {t(`items.${project.slug}.type`)}
                </span>
                {project.featured && (
                  <span className="rounded-full bg-blue-600/10 dark:bg-blue-400/10 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
                    {t("featuredLabel")}
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-lg font-bold text-black dark:text-white">{project.title}</h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                {t(`items.${project.slug}.description`)}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-2 py-1 text-[11px] font-medium text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-black dark:text-white underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
              >
                {t("viewLive")}
                <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
