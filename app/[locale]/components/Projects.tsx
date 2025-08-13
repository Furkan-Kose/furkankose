"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const projects = [
  {
    title: "PatiMap",
    image: "patimap.png",
    link: "https://patimap.netlify.app",
  },
  {
    title: "Range Media",
    image: "rangemedia.png",
    link: "https://rangemedia.com.tr",
  },
  {
    title: "Ritmika Cimnastik",
    image: "ritmikacimnastik.png",
    link: "https://ritmikacimnastik.com.tr",
  },
  {
    title: "etadilat",
    image: "etadilat.png",
    link: "https://etadilat.vercel.app",
  },
  {
    title: "Depon",
    image: "depon.png",
    link: "https://depon.vercel.app",
  },
  {
    title: "Furkan Köse",
    image: "furkankose.png",
    link: "https://furkankose.vercel.app",
  },
];

const Projects = () => {
  const t = useTranslations("Projects");

  const ref = useRef(null);
  const inView = useInView(ref, {once: true});

  return (
    <section id="projects" className="relative flex flex-col items-center justify-center pt-32 pb-16 bg-gray-200 dark:bg-gray-900 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 ">
      <div className="absolute inset-0 h-20 bg-gray-50 dark:bg-gray-950 clip-path-triangle"></div>
      <div className="text-center mb-12 w-full">
        <motion.h2
          ref={ref}
          className="text-5xl font-extrabold text-black dark:text-white tracking-tight"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 group hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: index * 0.1 }}
          > 
            {/* Görsel veya Placeholder */}
            <div className="relative w-full h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-2xl overflow-hidden group-hover:opacity-80 transition duration-500">
              {project.image ? (
                <img src={project.image} alt={project.title} className="object-cover w-full h-full rounded-t-2xl" />
              ) : (
                <span className="text-gray-500 dark:text-gray-600 text-lg">Görsel Bulunamadı</span>
              )}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-300 rounded-t-2xl"></div>
            </div>

            {/* Proje Başlık ve Link */}
            <div className="p-6 bg-white dark:bg-gray-950 rounded-b-2xl group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-all duration-300">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-4">{project.title}</h3>
              <Link
                href={project.link}
                target="_blank"
                className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold text-sm rounded-full hover:bg-blue-700 transition duration-300"
              >
                {t("viewLive")}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
