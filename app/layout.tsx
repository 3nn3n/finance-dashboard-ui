import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/themeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zorvyn - Personal Finance Dashboard",
  description: "A sleek and intuitive personal finance dashboard built with Next.js, TypeScript, and Tailwind CSS. Track your income, expenses, and financial insights all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <SidebarTrigger />
          {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
