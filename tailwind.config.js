/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: {
				'light': '#EFEFF0',
				'dark': '#18191A',
				'card-dark': '#242528',
			},
  			foreground: 'var(--foreground)',
			divider: {
				'light': '#d4d4d4', // neutral-300
				'dark': '#404040', // neutral-700
			},
			button: {
				'soft-dark': '#FDBA741A', // 1A = 10% opacity
				'soft-light': '#FDBA7440' // 40 = 25% opacity
			},
			text: {
				'primary-dark': '#e5e5e5', // neutral-200
				'secondary-dark': '#a3a3a3', // neutral-400
				'primary-light': '#171717', // neutral-900
				'secondary-light': '#737373', // neutral-500
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
