"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { FiMonitor, FiSmartphone, FiCpu, FiTool } from "react-icons/fi";

const serviceIcons = [FiMonitor, FiSmartphone, FiCpu, FiTool];

const Services = () => {
  const t = useTranslations("Services");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  const services = serviceIcons.map((Icon, i) => ({
    Icon,
    title: t(`list.${i}.title`),
    description: t(`list.${i}.description`),
  }));

  return (
    <section
      id="services"
      className="relative flex flex-col items-center justify-center pt-32 pb-20 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
    >
      <div className="absolute inset-0 h-20 bg-gray-200 dark:bg-gray-900 clip-path-triangle-reverse"></div>

      {/* Başlık */}
      <div className="text-center mb-14 max-w-2xl">
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

      {/* Hizmet Kartları */}
      <div className="grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map(({ Icon, title, description }, index) => (
          <motion.div
            key={title}
            className="group relative flex flex-col rounded-2xl border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-7 transition-colors duration-300 hover:border-blue-500 dark:hover:border-blue-500"
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
          >
            <span className="absolute right-6 top-6 text-4xl font-bold leading-none text-gray-300 dark:text-gray-800 select-none">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:border-blue-500">
              <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-black dark:text-gray-100">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-400">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
