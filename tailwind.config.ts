//tailwind.config.ts
module.exports = {
  content: [
    //'./pages/**/*.{js,ts,jsx,tsx,mdx}', // if using pages directory
    './components/**/*.{js,ts,jsx,tsx,mdx}', // all components directory
    './app/**/*.{js,ts,jsx,tsx,mdx}', // if using app directory
    //'./styles/**/*.{css,scss}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
