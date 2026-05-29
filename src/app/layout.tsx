import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnX Student Dashboard",
  description:
    "A professional portal to manage courses, tracking metrics, and focus settings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-[#09090b] text-zinc-400 font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-400">
        {children}
      </body>
    </html>
  );
}
