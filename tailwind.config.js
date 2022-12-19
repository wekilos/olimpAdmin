/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'contactUs': "url('/src/img/contactBack.png')", 
      },
      boxShadow: {
        'about': '0 4px 4px rgba(0, 0, 0, 0.25)',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'background': '#DEDEDE', 
      'footerBack':'rgba(13, 51, 136, 0.02)',
      'black':'#10181F',
      // 'blue': '#2058D5',
      // 'blue':"#0019a8",
      // 'blue':"#090c1d",
      'blue':'#19345F',//new cblue color
      "blueHover":"rgba(243, 243, 242, 0.2)",
      'aboutBack':'rgba(255, 255, 255, 0.5)',
    },
    fontWeight: {
      hairline: 100,
      'extra-light': 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      'extra-bold': 800,
      black: 900,
    },
    fontFamily: {
      'sans': ["segoeui"], 
    },
    screens: {
      'sm': '320px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
    
  },
  plugins: [],
}