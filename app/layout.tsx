import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({ 
  display: 'swap', 
  subsets: ["latin"],
  weight: ['500', '600', '700'], 
});

// export const metadata: Metadata = {
//   title: "Corner Store Locator",
//   description: "Find the nearest convenient stores and shops",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.className} bg-gradient-to-r from-teal-400 via-Emerald-400 to-green-400`}>{children}</body>
    </html>
  );
}
