import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        navBlue:'#207C9F',
        orange:'#CD4E35',
        logoBlue:'#004b84',
        popBlue:'#04d8f8',
        bgBlue:'#012b64',
        resultBlue: '#2C4E8F',
        featureBlue: '#315b87'
        


      },
    },
  },
  plugins: [],
};
export default config;
