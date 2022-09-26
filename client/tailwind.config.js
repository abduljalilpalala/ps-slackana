/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      container: {
        center: true
      },
      fontFamily: {
        inter: 'Inter, sans-serif'
      },
      colors: {
        primary: '#1164a3',
        'dark-purple': '#350d36',
        'light-purple': '#3f0e40',
        'purple-hover': '#350d36',
        'purple-border': '#522653',
        'purple-primary': '#726ab9',
        'light-purple-border': '#dcdcdc',
        'purple-primary-hover': '#575089'
      },
      boxShadow: {
        primary: '0px 18px 36px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
