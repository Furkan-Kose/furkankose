"use client";

import React, { useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("Contact");

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="contact"
      className="relative text-gray-900 dark:text-gray-300 pt-32 pb-16 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
    >
      <div className="absolute inset-0 h-20 bg-gray-50 dark:bg-gray-950 clip-path-triangle"></div>
      <div className="max-w-6xl mx-auto px-6">
        {/* Başlık */}
        <div className="text-center mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sol Taraf: Sosyal Medya İkonları ve Yazı */}
          <motion.div
            className="flex flex-col justify-center items-center md:items-start p-8 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-transform transform"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className="text-3xl font-semibold mb-4">{t("followMe")}</h3>
            <div className="flex space-x-6 mb-6">
              <a
                href="https://github.com/Furkan-Kose"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-gray-900 dark:text-gray-300 hover:text-blue-500 h-12 w-12 transition duration-200 transform hover:rotate-12" />
              </a>
              <a
                href="https://linkedin.com/in/furkankose5534"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-gray-900 dark:text-gray-300 hover:text-blue-500 h-12 w-12 transition duration-200 transform hover:rotate-12" />
              </a>
              <a
                href="mailto:furkankose2003@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGmail className="text-gray-900 dark:text-gray-300 hover:text-blue-500 h-12 w-12 transition duration-200 transform hover:rotate-12" />
              </a>
            </div>
            <p className="text-gray-800 dark:text-gray-400 text-center md:text-left">
              {t("followMeDescription")}
            </p>
          </motion.div>

          {/* Sağ Taraf: İletişim Formu */}
          <motion.div
            className="p-8 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-transform transform"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <h3 className="text-3xl font-semibold mb-6">{t("sendMessage")}</h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t("namePlaceholder")}
                  className="p-4 rounded-lg bg-white dark:bg-gray-700 bg-opacity-50 text-black dark:text-white placeholder-gray-800 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="p-4 rounded-lg bg-white dark:bg-gray-700 bg-opacity-50 text-black dark:text-white placeholder-gray-800 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <textarea
                placeholder={t("messagePlaceholder")}
                rows={4}
                className="w-full p-4 rounded-lg bg-white dark:bg-gray-700 bg-opacity-50 text-black dark:text-white placeholder-gray-800 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-6 transition duration-200 transform hover:scale-105"
              >
                {t("sendButton")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
