import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        nightGradient: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)", 
        dayGradient: "linear-gradient(to bottom, #a0c4ff, #b9e1ff)",
      },
    },
  },
  plugins: [],
};
export default config;
