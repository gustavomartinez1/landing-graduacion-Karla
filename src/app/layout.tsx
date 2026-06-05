import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Generacion 2026 — Galeria de Graduacion",
  description: "Comparte tu foto de graduacion y se parte de la galeria.",
  openGraph: {
    title: "Generacion 2026 — Galeria de Graduacion",
    description: "Comparte tu foto de graduacion y se parte de la galeria.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "Ceremonia de Graduacion 2026",
              "description": "Galeria de fotos de graduacion",
              "eventStatus": "https://schema.org/EventScheduled",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
