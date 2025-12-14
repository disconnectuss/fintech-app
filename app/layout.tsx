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
                    background: 'var(--toast-bg)',
                    color: 'var(--text-inverted)',
                    zIndex: 99999,
                  },
                  success: {
                    duration: 3000,
                    style: {
                      background: '#10b981',
                      color: '#ffffff',
                    },
                    iconTheme: {
                      primary: 'var(--success-500)',
                      secondary: 'var(--text-inverted)',
                    },
                  },
                  error: {
                    duration: 4000,
                    style: {
                      background: '#ef4444',
                      color: '#ffffff',
                    },
                    iconTheme: {
                      primary: 'var(--danger-500)',
                      secondary: 'var(--text-inverted)',
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
