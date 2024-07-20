import React from 'react';
import { useReadContract } from 'wagmi';
import DeFiClubABI from '../components/DeFiClubABI.json';

const USDTAddress = '0x...';

const HomePage = () => {
  const { data, isError, isLoading } = useReadContract({
    abi: DeFiClubABI,
    address: USDTAddress,
    functionName: 'totalSupply'
  });

  return (
    <div className="page-container">
      <h1>Welcome to Konyankov Foundation NFT Project</h1>
      <p>Discover the unique process of our NFT project...</p>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading total supply</p>}
      {data && <p>Total Supply of USDT: {data.toString()}</p>}
    </div>
  );
};

export default HomePage;
