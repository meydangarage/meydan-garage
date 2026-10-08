
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meydangarage.shop"),

  title: {
    default: "Meydan Garage | Premium EVA Paspas",
    template: "%s | Meydan Garage",
  },

  description:
    "Antalya Meydan Garage'da aracınıza özel premium EVA paspas üretimi, CNC kesim, kişiye özel tasarım, oto aksesuar, far temizleme ve araç bakım hizmetleri.",

  keywords: [
    "Meydan Garage",
    "Meydan Garage Antalya",
    "Antalya EVA Paspas",
    "EVA Paspas",
    "Araca Özel Paspas",
    "Kişiye Özel Paspas",
    "Premium EVA Paspas",
    "CNC Paspas Kesimi",
    "Antalya Oto Aksesuar",
    "Aksu Oto Aksesuar",
    "Altıntaş EVA Paspas",
    "Far Temizleme Antalya",
    "Araç İçi Aksesuar",
  ],

  applicationName: "Meydan Garage",

  openGraph: {
    title: "Meydan Garage | Premium EVA Paspas",
    description:
      "Aracınıza özel yeni nesil EVA paspas üretimi, kişiye özel renk seçenekleri ve premium otomobil aksesuarları. Antalya Meydan Garage.",
    url: "https://meydangarage.shop",
    siteName: "Meydan Garage",
    locale: "tr_TR",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Meydan Garage | Premium EVA Paspas",
    description:
      "Aracınıza özel EVA paspas ve premium oto aksesuar çözümleri. Antalya Meydan Garage.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
