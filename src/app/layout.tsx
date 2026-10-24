
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/navigation/Navbar";
import AquaSpaceCanvas from "@/components/AquaSpaceCanvas";

export const metadata = {
  title: "Rupam Kumar – Data & AI Engineer",
  description: "Personal portfolio showcasing software, data, and AI projects, experience, and leadership.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {/* Aqua-Space interactive background — single canvas replaces StarField + MorphingBlobs */}
          <AquaSpaceCanvas />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
