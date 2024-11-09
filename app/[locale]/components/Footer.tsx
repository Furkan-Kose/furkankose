import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { useTranslations } from 'next-intl';

const Footer = () => {

  const t = useTranslations("Footer");

  return (
    <footer className="text-black dark:text-white py-10 bg-gray-200 dark:bg-gray-800 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* İletişim Bilgileri */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">{t("name")}</h3>
          <p className="text-gray-800 dark:text-gray-400">
            {t("email")} <a href="mailto:furkankose2003@gmail.com" className="text-blue-400 hover:underline">furkankose2003@gmail.com</a>
          </p>
          <p className="text-gray-800 dark:text-gray-400">
            {t("phone")} <span className="text-blue-400">+90 538 647 9598</span>
          </p>
        </div>

        {/* Sosyal Medya İkonları */}
        <div className="flex space-x-6">
          <a href="https://github.com/Furkan-Kose" target="_blank" rel="noopener noreferrer">
            <FaGithub className="h-8 w-8 text-gray-900 dark:text-gray-300 hover:text-blue-400 transition duration-200 transform hover:scale-110" />
          </a>
          <a href="https://linkedin.com/in/furkankose5534" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="h-8 w-8 text-gray-900 dark:text-gray-300 hover:text-blue-400 transition duration-200 transform hover:scale-110" />
          </a>
          <a href="mailto:furkankose2003@gmail.com" target="_blank" rel="noopener noreferrer">
            <SiGmail className="h-8 w-8 text-gray-900 dark:text-gray-300 hover:text-blue-400 transition duration-200 transform hover:scale-110" />
          </a>
        </div>
      </div>

      {/* Telif Hakkı */}
      <div className="text-center mt-8 border-t border-gray-400 dark:border-gray-700 pt-4">
        <p className="text-gray-800 dark:text-gray-400">
          &copy; {new Date().getFullYear()} {t("name")}. {t("rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
