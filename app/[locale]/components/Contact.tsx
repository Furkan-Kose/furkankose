"use client";

import React, { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiArrowUpRight } from "react-icons/fi";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EMAIL = "furkankose2003@gmail.com";
const WHATSAPP = "905386479598";
const WHATSAPP_DISPLAY = "+90 538 647 9598";

const TOPICS = ["web", "mobile", "ai", "support", "other"] as const;

const Contact = () => {
  const t = useTranslations("Contact");

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const canSend = message.trim().length > 0;

  // Form içeriğini düz metne çeviriyoruz; e-posta ve WhatsApp aynı metni kullanıyor
  const buildMessage = () => {
    const lines: string[] = [];
    if (name.trim()) lines.push(`${t("fieldName")}: ${name.trim()}`);
    if (email.trim()) lines.push(`${t("fieldEmail")}: ${email.trim()}`);
    if (topic) lines.push(`${t("fieldTopic")}: ${t(`topics.${topic}`)}`);
    if (lines.length) lines.push("");
    lines.push(message.trim());
    return lines.join("\n");
  };

  const subject = topic ? `${t("mailSubject")} - ${t(`topics.${topic}`)}` : t("mailSubject");
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage())}`;

  const guard = (e: React.MouseEvent) => {
    if (!canSend) e.preventDefault();
  };

  const fieldClass =
    "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-gray-600 dark:text-gray-400";

  // mailto yeni sekmede açılırsa arkada boş bir sekme kalıyor, sadece WhatsApp için _blank
  const channels = [
    { key: "email", Icon: FiMail, value: EMAIL, href: `mailto:${EMAIL}`, external: false },
    { key: "whatsapp", Icon: FaWhatsapp, value: WHATSAPP_DISPLAY, href: `https://wa.me/${WHATSAPP}`, external: true },
  ];

  const socials = [
    { Icon: FaGithub, href: "https://github.com/Furkan-Kose", label: "GitHub" },
    { Icon: FaLinkedin, href: "https://linkedin.com/in/furkankose5534", label: "LinkedIn" },
  ];

  return (
    <section
      id="contact"
      className="relative text-gray-900 dark:text-gray-300 pt-32 pb-20 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
    >
      <div className="absolute inset-0 h-20 bg-gray-50 dark:bg-gray-950 clip-path-triangle"></div>

      <div className="mx-auto max-w-6xl">
        {/* Başlık */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
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
            className="mt-4 text-lg text-gray-800 dark:text-gray-400"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Sol: doğrudan iletişim kanalları */}
          <motion.div
            className="flex flex-col rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-7 lg:col-span-2"
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-black dark:text-white">{t("directTitle")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              {t("directDescription")}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {channels.map(({ key, Icon, value, href, external }) => (
                <a
                  key={key}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-3 transition-colors hover:border-blue-500 dark:hover:border-blue-500"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 text-blue-600 dark:text-blue-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-500">
                      {t(`${key}Label`)}
                    </span>
                    <span className="block truncate text-sm font-medium text-black dark:text-white">
                      {value}
                    </span>
                  </span>
                  <FiArrowUpRight className="ml-auto shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-5 lg:mt-auto">
              <span className={labelClass}>{t("socialLabel")}</span>
              <div className="flex gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sağ: mesajı hazırlayıp e-posta ya da WhatsApp'ta açan form */}
          <motion.div
            className="rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-7 lg:col-span-3"
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-black dark:text-white">{t("formTitle")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              {t("formHint")}
            </p>

            <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="contact-name">
                    {t("fieldName")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="contact-email">
                    {t("fieldEmail")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelClass} htmlFor="contact-topic">
                  {t("fieldTopic")}
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={fieldClass}
                >
                  <option value="">{t("topicPlaceholder")}</option>
                  {TOPICS.map((topicKey) => (
                    <option key={topicKey} value={topicKey}>
                      {t(`topics.${topicKey}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className={labelClass} htmlFor="contact-message">
                  {t("messageLabel")}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("messagePlaceholder")}
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={mailHref}
                  onClick={guard}
                  aria-disabled={!canSend}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                    canSend
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                  }`}
                >
                  <FiMail className="h-4 w-4" />
                  {t("sendMail")}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={guard}
                  aria-disabled={!canSend}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors ${
                    canSend
                      ? "border-gray-300 dark:border-gray-700 text-black dark:text-white hover:border-[#25D366] hover:text-[#1da851] dark:hover:text-[#25D366]"
                      : "cursor-not-allowed border-gray-200 text-gray-400 dark:border-gray-800 dark:text-gray-600"
                  }`}
                >
                  <FaWhatsapp className={`h-4 w-4 ${canSend ? "text-[#25D366]" : ""}`} />
                  {t("sendWhatsapp")}
                </a>
              </div>

              {!canSend && (
                <p className="mt-3 text-xs text-gray-600 dark:text-gray-500">{t("emptyHint")}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
