import { Web3Modal } from '@web3modal/react';
import { WagmiConfig, createClient, chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains } from '@wagmi/core';

// Настройка цепей
const { chains, provider } = configureChains(
  [chain.mainnet, chain.sepolia],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: () => {
    const connectors = [
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ];
    return connectors;
  },
  provider,
});

const projectId = 'YOUR_PROJECT_ID';

export function Web3ModalProvider({ children }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Web3Modal projectId={projectId} />
      {children}
    </WagmiConfig>
  );
}
