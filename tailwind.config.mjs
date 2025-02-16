/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      container: {
        center: true,
        screens: {
          sm: "800px",
          lg: "1200px",
        },
      },
      boxShadow: {
        custom:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)",
      },
      strokeWidth: {
        4: "4px", // Thêm stroke-4 với độ dày là 4px
        6: "6px", // Ví dụ với stroke-6 nếu bạn cần
      },
    },
  },
  plugins: [],
};
