/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
import { Container } from "postcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        customPink: "#FE6B6E",
        customGray: "#C6C6C6",
        customDark: "#01152B",
      },
      boxShadow: {
        "custom-blue": "0 0 0 2px rgba(5,145,255,0.1)",
        "custom-red": "0 0 0 2px rgba(255, 0, 0, 0.1)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
