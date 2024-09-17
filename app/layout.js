import { Inter } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/themeProvider";

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
        className={`${inter.className}  antialiased`}
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
