import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_providers/auth";
import Footer from "./_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samph",
  description: "Sistema Automatizado de Medição de Potencial Hidrogeniônico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col">
            <div className="min-h-screen">{children}</div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
