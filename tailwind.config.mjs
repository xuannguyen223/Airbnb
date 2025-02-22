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
        custom:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)",
      },
      container: {
        center: true,
        screens: {
          sm: "800px",
          lg: "1200px",
        },
      },
      strokeWidth: {
        4: "4px", // Thêm stroke-4 với độ dày là 4px
        6: "6px", // Ví dụ với stroke-6 nếu bạn cần
      },
    },
  },
  plugins: [flowbite.plugin()],
};
