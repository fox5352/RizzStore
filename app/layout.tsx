import type { Metadata } from "next";
import Header from "@/components/Header";

import "./global.css"

import 'bootstrap-icons/font/bootstrap-icons.css'


export const metadata: Metadata = {
  title: "Rizz store",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <Header auth={true} />
        
        {children}
        {/* TODO: add footer */}
      </body>
    </html>
  );
}