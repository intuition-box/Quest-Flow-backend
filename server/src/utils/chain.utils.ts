import { defineChain } from "viem"

export const intuitionMainnet = defineChain({
  id: 1155,
  name: "Intuition Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "TRUST",
    symbol: "TRUST",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.intuition.systems"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.intuition.systems" },
  },
});

export const intuitionTestnet = defineChain({
	id: 1155,
	name: "Intuition Mainnet",
	nativeCurrency: {
		decimals: 18,
		name: "TRUST",
		symbol: "TRUST",
	},
	rpcUrls: {
		default: {
			http: ["https://rpc.intuition.systems"],
		},
	},
	blockExplorers: {
		default: { name: "Explorer", url: "https://explorer.intuition.systems" },
	},
});