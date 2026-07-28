import type { Metadata } from "next";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Sellzy - Multipurpose eCommerce",
  description:
    "Everything you need for wellness in one place. Discover your favorite brands, latest trends, and exclusive discounts.",
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full antialiased", "font-sans", geist.variable)}
            suppressHydrationWarning
        >
        <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
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
    )
}