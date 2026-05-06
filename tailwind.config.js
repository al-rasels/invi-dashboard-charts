// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../application/views/**/*.php", // 👈 IMPORTANT for CodeIgniter
  ],
  prefix: "tw-",
  theme: {
    extend: {},
  },
  plugins: [],
};
