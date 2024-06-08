import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange": {
          "dark": "#FC6C2E"
        },
        "background": {
          "dark": "#131313",
        },
        "placeholder": {
          "dark": "#373737",
        },
        "text": {
          "dark": "#F6F6F6",
        },
        "component-background": {
          "dark": "#262626",
        },
        "hover": {
          "dark": "#1C1C1C",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
