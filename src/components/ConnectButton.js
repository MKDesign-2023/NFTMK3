import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Web3Button } from '@web3modal/react';

const ConnectButton = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        <Web3Button />
      )}
    </div>
  );
};

export default ConnectButton;
