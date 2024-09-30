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
			accent: '#E8490C',
			'accent-light': '#FAB79E',
  			background: {
				'light': '#EFEFF0',
				'dark': '#18191A',
				'card-dark': '#242528',
				'card-light': '#E9E9E9',
				'accent-soft': '#E8490C0D'
			},
			stroke: {
				'dark-light': '#FFFFFF0D', // 0D = 5% opacity
				'light-light': '#0000000D',
				'dark-gray': '#61646B',
				'light-gray': '#a3a3a3',
			},
  			foreground: 'var(--foreground)',
			divider: {
				'light': '#d4d4d4', // neutral-300
				'dark': '#404040', // neutral-700
			},
			button: {
				'soft-dark': '#FDBA741A', // 1A = 10% opacity
				'soft-dark-hover': '#FB82041A', // 1A = 10% opacity
				'soft-light': '#FDBA7466', // 66 = 40% opacity
				'soft-light-hover': '#FB820466', // 66 = 40% opacity
				'solid': '#E8490C',
				'solid-hover': '#C23D0A',
				'soft-red': '#E80C0C1A',
				'soft-red-hover': '#E80C0C33'
			},
			text: {
				'primary-dark': '#e5e5e5', // neutral-200
				'secondary-dark': '#a3a3a3', // neutral-400
				'primary-light': '#171717', // neutral-900
				'secondary-light': '#737373', // neutral-500
				'red': '#E80C0C'
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
