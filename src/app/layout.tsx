import type { Metadata } from "next";
import "@/styles/globals.css";
import "lenis/dist/lenis.css";
import "@/styles/header.css";
import "@/styles/hero.css";
import "@/styles/projects.css";
import "@/styles/services.css";
import "@/styles/contact.css";
import "@/styles/skills.css";
import "@/styles/aegis-case.css";
import "@/styles/kasvin-case.css";
import "@/styles/grains-case.css";
import "@/styles/accessibility.css";

const description =
  "Kelvin Kyere, a frontend-focused developer based in Tema, Ghana. Websites, web applications, WordPress, branding, and digital products.";
export const metadata: Metadata = {
  title: "Kelvin Kyere | Portfolio",
  description,
  openGraph: {
    title: "Kelvin Kyere | Portfolio",
    description,
    type: "website",
  },
  twitter: { card: "summary", title: "Kelvin Kyere | Portfolio", description },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=monument-extended@400,500,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
