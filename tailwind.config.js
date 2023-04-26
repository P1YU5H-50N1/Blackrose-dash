/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'public-bg': "url('/src/assets/background.png')",
        'g-login': "url('/src/assets/oAuthLogo.svg')",
        'logo': "url('/src/assets/Logo.svg')",
        'user': "url('/src/assets/user.svg')",
        'home': "url('/src/assets/home.svg')",
        'neon-logout': "url('/src/assets/neon-logout.svg')",
        'neon-user': "url('/src/assets/neon-user.svg')",
        'neon-home': "url('/src/assets/neon-home.svg')",
        'logout': "url('/src/assets/logout.svg')",
        'green-overlay':'linear-gradient(303.08deg, #2DFF8E -198.89%, #F5F5F5 48.6%)',
        'gray-card':'linear-gradient(225.67deg, #7C7C7C -280%, rgba(0, 0, 0, 0) 100%)',
        'primary-button':'#1d2023',
      },
      backgroundColor:{
        'neon-green':'#2DFF8E',
        'button-gray':'rgba(255, 255, 255, 0.1)',
        'dashboard':'#1A1B20',
        'menu':'#17181D',
        'miniboards':'#131419'
        
      },
      borderColor:{
        'menu-stroke': '#393737',
        'neon':'#2DFF8E',
      

      },
      colors:{
        'neon':'#2DFF8E',
      },
      animation: {
        shake: 'shake 1s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 90%': { transform: 'translateX(-0.25rem)' },
          '20%, 80%': { transform: 'translateX(0.25rem)' },
          '30%, 50%, 70%': { transform: 'translateX(-0.25rem)' },
          '40%, 60%': { transform: 'translateX(0.25rem)' },
        },
      },  
      boxShadow:{
        'gray-card':'0px 0px 4px 7px rgba(123, 123, 123, 0.25)',
        'neon-green':'#2DFF8E'
      }
    },
  },
  plugins: [],
}
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
