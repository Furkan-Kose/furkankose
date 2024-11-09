"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); 
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navbar");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const changeLanguage = (lang: string) => {
    const currentPath = pathname.replace(`/${locale}`, `/${lang}`);
    router.push(currentPath);
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 z-20 h-24 flex items-center justify-between px-8 md:px-16 transition-all duration-500 w-[90%] ${
        isScrolled
          ? "w-full rounded-none top-0 bg-transparent backdrop-blur-lg shadow-lg"
          : "w-[90%] mx-auto top-4 rounded-full bg-gray-400 dark:bg-black bg-opacity-25 dark:bg-opacity-25"
      }`}
    >
      {/* Logo */}
      <div className="text-2xl font-bold text-black dark:text-white">
        <Link href="/">Furkan</Link>
      </div>

      {/* Mobil Menü Butonu */}
      <div className="md:hidden flex items-center z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black dark:text-white focus:outline-none"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Navigasyon Linkleri */}
      <div className={`hidden md:flex space-x-6 items-center`}>
        <Link href="/" className="text-gray-900 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">
          {t("home")}
        </Link>
        <Link href="#skills" className="text-gray-900 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">
          {t("skills")}
        </Link>
        <Link href="#projects" className="text-gray-900 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">
          {t("projects")}
        </Link>
        <Link href="#contact" className="text-gray-900 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">
          {t("contact")}
        </Link>

        {/* Tema Toggle Butonu */}
        <button
          onClick={toggleTheme}
          className="relative w-16 h-8 bg-gray-300 dark:bg-gray-800 rounded-full p-1 flex items-center transition duration-300 ease-in-out shadow-md"
        >
          <div
            className={`absolute left-1 w-6 h-6 rounded-full transition-all duration-300 transform ${
              theme === "light" ? "translate-x-0 bg-blue-400" : "translate-x-8 bg-blue-400"
            }`}
          />
          <span className="text-xs absolute left-2 dark:text-gray-400 text-gray-600">🌞</span>
          <span className="text-xs absolute right-2 dark:text-gray-400 text-gray-600">🌙</span>
        </button>

        {/* Dil Dropdown Menüsü */}
        <div className="relative ml-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-black dark:text-white flex items-center space-x-2 focus:outline-none shadow-md rounded-lg px-3 py-1 bg-gray-300 dark:bg-gray-800 transition duration-300 hover:bg-gray-400 dark:hover:bg-gray-700"
          >
            <Image src={`/${locale}.png`} width={20} height={20} alt={locale} className="rounded-full" />
            <span>{locale === 'tr' ? 'Türkçe' : 'English'}</span>
            <FiChevronDown size={18} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md">
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => changeLanguage("tr")}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors duration-300"
                  >
                    <Image src="/tr.png" width={20} height={20} alt="Türkçe" />
                    <span>Türkçe</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => changeLanguage("en")}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors duration-300"
                  >
                    <Image src="/en.png" width={20} height={20} alt="English" />
                    <span>English</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobil Menü */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-gray-300 to-blue-300 dark:from-gray-800 dark:to-blue-800 md:hidden transition-all duration-300 z-40`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <Link
            href="/"
            className="text-black dark:text-white text-2xl hover:text-blue-400 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {t("home")}
          </Link>
          <Link
            href="#skills"
            className="text-black dark:text-white text-2xl hover:text-blue-400 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {t("skills")}
          </Link>
          <Link
            href="#projects"
            className="text-black dark:text-white text-2xl hover:text-blue-400 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {t("projects")}
          </Link>
          <Link
            href="#contact"
            className="text-black dark:text-white text-2xl hover:text-blue-400 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {t("contact")}
          </Link>

          {/* Mobil Tema Toggle Butonu */}
          <button
            onClick={toggleTheme}
            className="relative w-16 h-8 bg-gray-300 dark:bg-gray-800 rounded-full p-1 flex items-center transition duration-300 ease-in-out shadow-md"
          >
            <div
              className={`absolute left-1 w-6 h-6 rounded-full transition-all duration-300 transform ${
                theme === "light" ? "translate-x-0 bg-blue-400" : "translate-x-8 bg-blue-400"
              }`}
            />
            <span className="text-xs absolute left-2 dark:text-gray-400 text-gray-600">🌞</span>
            <span className="text-xs absolute right-2 dark:text-gray-400 text-gray-600">🌙</span>
          </button>

          {/* Mobil Dil Seçimi */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-black dark:text-white flex items-center space-x-2 focus:outline-none shadow-md rounded-lg px-3 py-1 bg-gray-300 dark:bg-gray-800 transition duration-300 hover:bg-gray-400 dark:hover:bg-gray-700"
            >
              <Image src={`/${locale}.png`} width={20} height={20} alt={locale} className="rounded-full" />
              <span>{locale === 'tr' ? 'Türkçe' : 'English'}</span>
              <FiChevronDown size={18} />
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 w-32 bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => changeLanguage("tr")}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors duration-300"
                    >
                      <Image src="/tr.png" width={20} height={20} alt="Türkçe" />
                      <span>Türkçe</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => changeLanguage("en")}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors duration-300"
                    >
                      <Image src="/en.png" width={20} height={20} alt="English" />
                      <span>English</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
