import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://creative-dev-design-portfolio.kelvinkwasikyere5.chatgpt.site"),
  title: "Kelvin Kyere — Web Developer & Graphic Designer",
  description: "Kelvin Kyere is a web developer and graphic designer in Tema, Ghana, creating websites, custom digital products, brand identities and mobile app experiences.",
  openGraph: {
    title: "Kelvin Kyere — Web Developer & Graphic Designer",
    description: "Websites, custom digital products, graphic design and mobile app experiences from Tema, Ghana.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1731, height: 909, alt: "Kelvin Kyere, Web Developer and Graphic Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelvin Kyere — Web Developer & Graphic Designer",
    description: "Websites, custom digital products, graphic design and mobile app experiences from Tema, Ghana.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
