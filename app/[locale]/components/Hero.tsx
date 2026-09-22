"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { ReactTyped } from "react-typed";
import { useTranslations } from "next-intl";

type CtaButton = { key: "projects" | "downloadCV" | "contact"; href: string; download?: boolean };

const ctaButtons: CtaButton[] = [
  { key: "projects", href: "#projects" },
  { key: "downloadCV", href: "/cv.pdf", download: true },
  { key: "contact", href: "#contact" },
];

const Hero = () => {

  const t = useTranslations("Hero");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-200 via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
      {/* Hafif Parçacık Efekti */}
      <div className="absolute inset-0 flex justify-center items-center">
        <motion.div
          className="w-96 h-96 bg-blue-300 dark:bg-blue-900 opacity-20 rounded-full filter blur-3xl"
          animate={reduceMotion ? { opacity: 0.4 } : {
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 text-black dark:text-white px-6">
        {/* Başlık ve Tanıtım */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 to-gray-900 dark:from-white dark:to-gray-400 text-transparent bg-clip-text w-fit"
          initial={reduceMotion ? false : { opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Sunucudan gelen HTML'de h1 boş kalmasın: sabit metin ekran okuyucu ve
              arama motorları için, animasyonlu kısım ise yalnızca görsel. */}
          <span className="sr-only">{t("srHeading")}</span>
          <span aria-hidden="true">
            {reduceMotion ? (
              t("greeting")
            ) : (
              <ReactTyped
                strings={[t("greeting"), t("role"), t("passion"), t("technology")]}
                typeSpeed={50}
                backSpeed={25}
                backDelay={2000}
                loop
                showCursor={false}
              />
            )}
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-900 dark:text-gray-300"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.75 }}
        >
          {t("description")}
        </motion.p>

        {/* CTA Butonları */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {ctaButtons.map(({ key, href, download }, index) => (
            <motion.a
              key={key}
              href={href}
              {...(download ? { download: "" } : {})}
              className="px-6 py-2 bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded-lg dark:hover:bg-gray-700 shadow-lg shadow-gray-300/30 dark:shadow-gray-800/30 transform transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.2, duration: 0.5 }}
            >
              {t(key)}
            </motion.a>
          ))}
        </div>

        {/* Sosyal Medya İkonları */}
        <div className="flex space-x-6 mt-6">
        {[{ Icon: FaGithub, url: "https://github.com/Furkan-Kose", label: "GitHub" },
          { Icon: FaLinkedin, url: "https://linkedin.com/in/furkankose5534", label: "LinkedIn" },
          { Icon: SiGmail, url: "mailto:furkankose2003@gmail.com", label: "E-posta" }]
          .map(({ Icon, url, label }, index) => (
            <motion.a
              key={label}
              href={url}
              aria-label={label}
              {...(url.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="text-2xl md:text-3xl text-black dark:text-white hover:text-gray-400 transition-transform transform hover:scale-125"
              initial={reduceMotion ? false : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + index * 0.3, duration: 0.5 }}
            >
              <Icon />
            </motion.a>
        ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;