import { Inter } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./contexts/themeProvider";
import { AuthProvider } from './contexts/AuthContext';
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
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
