/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html", // Scan all HTML files
    "./src/**/*.js", // Scan JS files (if using dynamic classes)
    // Add paths to GrapesJS templates if stored separately
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}