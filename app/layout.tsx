import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carrera 5K Ciudad | Regístrate Gratis",
  description:
    "Únete a la carrera urbana 5K más emocionante. Registro gratuito abierto para todas las categorías.",
  openGraph: {
    title: "Carrera 5K Ciudad",
    description: "Registro gratuito para la carrera 5K",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-brand-dark text-brand-light antialiased">
        {children}
      </body>
    </html>
  );
}
