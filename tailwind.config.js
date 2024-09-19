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
			accent: '#E8490C',
			button: {
				'soft-dark': '#FDBA741A', // 1A = 10% opacity
				'soft-light': '#FDBA7440' // 40 = 25% opacity
			},
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
