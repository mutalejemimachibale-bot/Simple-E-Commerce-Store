/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        background: '#FAFAFA',
        'text-primary': '#2D3436',
        'text-secondary': '#636E72',
        success: '#00B894',
        warning: '#FDCB6E',
        error: '#E17055',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
