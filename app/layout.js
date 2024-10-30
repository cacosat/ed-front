import { Inter } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/themeProvider";
import Nav from './components/nav';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  varaible: '--font-inter',
})

export const metadata = {
  title: "Ed",
  description: "Prototype",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased dark:text-background-light flex justify-center bg-background-light dark:bg-background-dark`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
