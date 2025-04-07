/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        notion: {
          DEFAULT: '#37352f',
          dark: '#191711',
          light: '#ffffff',
          gray: '#9b9a97',
          brown: '#64473a',
          orange: '#d9730d',
          yellow: '#dfab01',
          green: '#4d6461',
          blue: '#0b6e99',
          purple: '#6940a5',
          pink: '#ad1a72',
          red: '#e03e3e',
          bg: '#ffffff',
          sidebar: '#f7f6f3',
          hover: 'rgba(55,53,47,0.08)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      typography: (theme) => ({
        notion: {
          css: {
            '--tw-prose-body': theme('colors.notion.DEFAULT'),
            '--tw-prose-headings': theme('colors.notion.dark'),
            '--tw-prose-lead': theme('colors.notion.gray'),
            '--tw-prose-links': theme('colors.notion.blue'),
            '--tw-prose-bold': theme('colors.notion.dark'),
            '--tw-prose-counters': theme('colors.notion.gray'),
            '--tw-prose-bullets': theme('colors.notion.gray'),
            '--tw-prose-hr': theme('colors.notion.gray'),
            '--tw-prose-quotes': theme('colors.notion.dark'),
            '--tw-prose-quote-borders': theme('colors.notion.gray'),
            '--tw-prose-captions': theme('colors.notion.gray'),
            '--tw-prose-code': theme('colors.notion.dark'),
            '--tw-prose-pre-code': theme('colors.notion.dark'),
            '--tw-prose-pre-bg': theme('colors.notion.sidebar'),
            '--tw-prose-th-borders': theme('colors.notion.gray'),
            '--tw-prose-td-borders': theme('colors.notion.gray'),
            maxWidth: 'none',
            lineHeight: 1.5,
            p: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography({
      className: 'notion',
    }),
  ],
}
