import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import prisma from "@/lib/prisma";
import ThemeProvider from "@/app/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mujeeb's Dashboard",
  description: "Personal dashboard for Mujeeb ur Rehman",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let theme = "dark";
  try {
    const themeSetting = await prisma.setting.findUnique({
      where: { key: "theme" },
    });
    theme = themeSetting?.value ?? "dark";
  } catch {
    // DB not connected yet — default to dark
  }

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <body className={`${inter.className} bg-dashboard-bg min-h-screen`}>
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
