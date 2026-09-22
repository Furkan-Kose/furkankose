"use client";

import { useState, useEffect } from "react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import Logo from "./Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navbar");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    // Tema zaten <head>'deki script tarafından uygulandı; burada sadece
    // düğmenin doğru konumda görünmesi için gerçek durumu okuyoruz.
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menü açıkken Escape ile kapansın ve arka plan kaymasın
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const changeLanguage = (lang: "tr" | "en") => {
    router.replace(pathname, { locale: lang });
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
      <Link href="/" className="flex items-center gap-2.5">
        <Logo className="h-9 w-9 shrink-0" />
        <span className="text-2xl font-bold text-black dark:text-white">Furkan</span>
      </Link>

      {/* Mobil Menü Butonu */}
      <div className="md:hidden flex items-center z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="text-black dark:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200 dark:focus-visible:ring-offset-gray-900"
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
        <Link href="#services" className="text-gray-900 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">
          {t("services")}
        </Link>
        <Link href="#contact" className="text-gray-900 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">
          {t("contact")}
        </Link>

        {/* Tema Toggle Butonu */}
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
          className="relative w-16 h-8 bg-gray-300 dark:bg-gray-800 rounded-full p-1 flex items-center transition duration-300 ease-in-out shadow-md"
        >
          <div
            className={`absolute left-1 w-6 h-6 rounded-full transition-all duration-300 transform ${
              theme === "light" ? "translate-x-0 bg-blue-400" : "translate-x-8 bg-blue-400"
            }`}
          />
          <span aria-hidden="true" className="text-xs absolute left-2 dark:text-gray-400 text-gray-600">🌞</span>
          <span aria-hidden="true" className="text-xs absolute right-2 dark:text-gray-400 text-gray-600">🌙</span>
        </button>

        {/* Dil Dropdown Menüsü */}
        <div className="relative ml-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="menu"
            className="text-black dark:text-white flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200 dark:focus-visible:ring-offset-gray-900 shadow-md rounded-lg px-3 py-1 bg-gray-300 dark:bg-gray-800 transition duration-300 hover:bg-gray-400 dark:hover:bg-gray-700"
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
        id="mobile-menu"
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
            href="#services"
            className="text-black dark:text-white text-2xl hover:text-blue-400 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {t("services")}
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
            aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
            className="relative w-16 h-8 bg-gray-300 dark:bg-gray-800 rounded-full p-1 flex items-center transition duration-300 ease-in-out shadow-md"
          >
            <div
              className={`absolute left-1 w-6 h-6 rounded-full transition-all duration-300 transform ${
                theme === "light" ? "translate-x-0 bg-blue-400" : "translate-x-8 bg-blue-400"
              }`}
            />
            <span aria-hidden="true" className="text-xs absolute left-2 dark:text-gray-400 text-gray-600">🌞</span>
            <span aria-hidden="true" className="text-xs absolute right-2 dark:text-gray-400 text-gray-600">🌙</span>
          </button>

          {/* Mobil Dil Seçimi */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="menu"
              className="text-black dark:text-white flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200 dark:focus-visible:ring-offset-gray-900 shadow-md rounded-lg px-3 py-1 bg-gray-300 dark:bg-gray-800 transition duration-300 hover:bg-gray-400 dark:hover:bg-gray-700"
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
