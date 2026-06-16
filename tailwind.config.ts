import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kdm: {
          green: {
            50: '#f0f9f7',
            100: '#d4f0eb',
            600: '#17a697',
            700: '#0d7d73',
            800: '#0a6557',
            900: '#073d37',
          },
          orange: {
            50: '#fff8f0',
            500: '#e8622d',
            600: '#d94821',
            700: '#b83d1a',
          },
          neutral: {
            50: '#fafaf9',
            100: '#f5f5f4',
            200: '#e7e5e4',
            300: '#d6d3d1',
            400: '#a8a29e',
            500: '#78716b',
            600: '#57534e',
            700: '#44403c',
            800: '#292524',
            900: '#1c1917',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist-display)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
