// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../application/views/**/*.php", // 👈 IMPORTANT for CodeIgniter
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
};
