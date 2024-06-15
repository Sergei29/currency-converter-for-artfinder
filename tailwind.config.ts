import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        marine: {
          500: '#32415f',
          600: '#2d3750',
          700: '#232d46',
        },
      },
    },
  },
  plugins: [],
}
export default config
