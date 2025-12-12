import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./lib/auth-context";
import { QueryProvider } from "./lib/query-client";
import MuiProvider from "./lib/mui-provider";
import "./globals.css";

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kumbh-sans",
});

export const metadata: Metadata = {
  title: "Fintech App",
  description: "Case Study Nodelabs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kumbhSans.variable} font-sans antialiased`}
      >
        <MuiProvider>
          <AuthProvider>
            <QueryProvider>
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--color-toast-bg)',
                    color: 'var(--color-text-inverted)',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: 'var(--color-success)',
                      secondary: 'var(--color-text-inverted)',
                    },
                  },
                  error: {
                    duration: 4000,
                    iconTheme: {
                      primary: 'var(--color-danger)',
                      secondary: 'var(--color-text-inverted)',
                    },
                  },
                }}
              />
            </QueryProvider>
          </AuthProvider>
        </MuiProvider>
      </body>
    </html>
  );
}

{/* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght,YOPQ@100..900,300&display=swap" rel="stylesheet"></link> */}
