import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { serverEnv } from "@/lib/config/env";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Methna",
    template: "%s | Methna",
  },
  description:
    "A Muslim matchmaking app built for serious connections, privacy, and meaningful compatibility.",
  metadataBase: new URL(serverEnv.siteUrl),
  icons: {
    icon: [
      { url: "/methna_app_icon.jpg", type: "image/jpeg" },
      { url: "/methna-mark.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/methna_app_icon.jpg", type: "image/jpeg" }],
    shortcut: ["/methna_app_icon.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="relative flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
