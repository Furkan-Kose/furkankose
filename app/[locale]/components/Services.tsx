"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";



const Services = () => {
  const t = useTranslations("Services");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const services = [
    {
      title: t("list.0.title"),
      description: t("list.0.description"), 
      icon: t("list.0.icon"), 
    },
    {
      title: t("list.1.title"), 
      description: t("list.1.description"),
      icon: t("list.1.icon"), 
    },
    {
        title: t("list.2.title"),
        description: t("list.2.description"),
        icon: t("list.2.icon"),
    },
    {
        title: t("list.3.title"),
        description: t("list.3.description"),
        icon: t("list.3.icon"),
    }
  ];

  return (
    <section
      id="services"
      className="relative flex flex-col items-center justify-center pt-32 pb-16 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
    >
        <div className="absolute inset-0 h-20 bg-gray-200 dark:bg-gray-900 clip-path-triangle-reverse"></div>
      {/* Başlık */}
      <div className="text-center mb-12">
        <motion.h2
          ref={ref}
          className="text-5xl font-bold text-black dark:text-white tracking-tighter"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          {t("title")} {/* Hizmetlerimiz için başlık */}
        </motion.h2>
        <motion.p
          className="text-gray-800 dark:text-gray-400 text-lg mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {t("description")} {/* Hizmetler hakkında açıklama */}
        </motion.p>
      </div>

      {/* Hizmet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="flex items-center p-6 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* İkonun arka planı için kapsayıcı div */}
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-gray-100 rounded-full shadow-lg mr-4">
              <img src={service.icon} alt={service.title} className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-black dark:text-gray-100">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
