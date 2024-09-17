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
        className={`${inter.className} antialiased flex justify-center`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className='sm:mx-[10%] md:mx-[15%] mx-[8px] max-w-[1200px] w-full'>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
