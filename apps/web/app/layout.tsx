import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Rentiva | P2P Araç Paylaşımı",
  description: "Araç sahipleri ve kiracıları güvenli şekilde buluşturan platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}