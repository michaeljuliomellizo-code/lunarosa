import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CartHydration from "@/components/providers/CartHydration";
import AuthListener from "@/components/AuthListener";

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen overflow-x-hidden bg-light">
        <TopBar />

        <AuthListener />

        <AnnouncementBar />

        <Navbar />

        <CartHydration />

        <main className="w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}