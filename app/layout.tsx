import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { CommandMenu } from '@/components/layout/CommandMenu'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/features/auth/AuthProvider'
import { AuthGate } from '@/components/features/auth/AuthGate'
import { AccessKeyModal } from '@/components/features/auth/AccessKeyModal'

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MOVIE UTOPIA - AI Video Platform",
  description: "Premium AI-powered video platform with cutting-edge features",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        <AuthProvider>
          {/* Login Modal - Always rendered first, shown when not authenticated */}
          <AccessKeyModal />

          {/* Main content - Only rendered when authenticated */}
          <AuthGate>
            <SiteHeader />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <SiteFooter />
            <CommandMenu />
            <Toaster theme="dark" position="top-center" />
            {modal}
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}
