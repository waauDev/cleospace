import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "CleoSpace",
  description: "Habla conmigo de lo que quieras",
};

const DIRECTION_CONTRACT = `
THESIS: CleoSpace is a raw, high-contrast console -- bold borders and flat color instead of any illusion of a physical machine.
OWN-WORLD: user-pinned neobrutalism system (typeui.sh) -- primary #FDC800, secondary #432DD7, success #16A34A, warning #D97706, danger #DC2626, on a warm surface #FBFBF9 with #1C293C text/borders. Every panel: 3px solid border, flat fill, 5px hard offset shadow that collapses on press. Inter for display/body, JetBrains Mono for labels and digits.
STORY: you scan bordered session cards at a glance, press the yellow primary key to start one, see status as flat colored chips (red live lamp, green ready), read scores in mono digits on a solid dark chip.
FIRST VIEWPORT: a yellow bordered hero panel with hard shadow, bold black-navy headline, one secondary key, a rotated secondary-color badge circle.
FORM: user-pinned design system (exact tokens + component rules) replaces the prior world outright, no roll; card/key/screen structure kept, every surface rebuilt flat.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(inter.variable, jetBrainsMono.variable)}
    >
      <body className="font-sans antialiased">
        <div
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
