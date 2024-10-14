"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "./providers";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.mainbody}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
