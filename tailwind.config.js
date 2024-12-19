/** @type {import('tailwindcss').Config} */
export default {
  // 使用 "class" 模式时，Tailwind 会将 "dark" 类添加到根元素（通常是 <body> 元素）上，以指示页面当前处于深色模式
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px'
    },
    extend: {
      transitionProperty: {
        height: 'height'
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.mbe-0': {
          'margin-block-end': '0 !important'
        }
      })
    }
  ]
}
