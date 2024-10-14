import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { optimism, optimismSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    optimism,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [optimismSepolia]
      : []),
  ],
  ssr: true,
});
