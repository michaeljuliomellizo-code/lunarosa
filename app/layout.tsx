import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CartHydration from "@/components/providers/CartHydration";
import AuthListener from "@/components/AuthListener";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="es">

      <body>

        <TopBar />
        <AuthListener />
        <AnnouncementBar />

        <Navbar />
        <CartHydration />
        {children}

        <Footer />

      </body>
    </html>
  );
}