import localFont from "next/font/local";
import "./globals.css";
import { CSPostHogProvider } from './providers';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "LinkedIn #OpenToWork Banner Creator",
  description: "Create your custom LinkedIn #OpenToWork banner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className="bg-gray-100 min-h-screen">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
