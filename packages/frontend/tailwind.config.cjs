/** @type {import('tailwindcss').Config} */
import tailwindAnimate from 'tailwindcss-animate'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }
      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }
      md: { max: '862px' },
      // => @media (max-width: 862px) { ... }
      sm: { max: '690px' },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        ring: 'hsl(var(--ring))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
    },
  },
  plugins: [tailwindAnimate],
}
