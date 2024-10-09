"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi";
import "@coinbase/onchainkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// type Props = { children: ReactNode };
const inter = Inter({ subsets: ["latin"] });

// const wagmiConfig = createConfig({
//   chains: [baseSepolia],
//   connectors: [
//     coinbaseWallet({
//       appChainIds: [baseSepolia.id],
//       appName: 'onchainkit',
//     }),
//   ],
//   ssr: true,
//   transports: {
//     [baseSepolia.id]: http(),
//   },
// });



const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey="9It7S0Ce4bWu98ASBoTmn6PwPN11CaiX"
            chain={base}
          >
            <body className={inter.mainbody}>
              <Navbar />
              {children}
            </body>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </html>
  );
}