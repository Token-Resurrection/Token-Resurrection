import { http, createConfig } from "@wagmi/core";
import { optimism, optimismSepolia } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [optimism, optimismSepolia],
  transports: {
    [optimism.id]: http(),
    [optimismSepolia.id]: http(),
  },
});
