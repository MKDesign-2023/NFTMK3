import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import DeFiClubABI from '../components/DeFiClubABI.json';
import NFTStakingABI from '../components/NFTStakingABI.json';

const defiClubAddress = "0xDD5c66b7FB16eC939BD5A84C044DEA3Bd9804062";
const stakingContractAddress = "0xf10A675900CE05Fe7A9DB356B149e2778C385A79";

const NFTPage = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [stakingContract, setStakingContract] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    if (web3 && account) {
      const nftInstance = new web3.eth.Contract(DeFiClubABI, defiClubAddress);
      const stakingInstance = new web3.eth.Contract(NFTStakingABI, stakingContractAddress);
      setNftContract(nftInstance);
      setStakingContract(stakingInstance);
      loadNFTs(nftInstance, account);
      loadStakedNFTs(stakingInstance, account);
      setReferralLink(`${window.location.origin}/${account}`);
    }
  }, [web3, account]);

  const connectWallet = async () => {
    const provider = new WalletConnectProvider({
      infuraId: "YOUR_INFURA_ID"
    });
    await provider.enable();
    const web3Instance = new Web3(provider);
    const accounts = await web3Instance.eth.getAccounts();
    setWeb3(web3Instance);
    setAccount(accounts[0]);
  };

  const loadNFTs = async (nftInstance, account) => {
    const balance = await nftInstance.methods.balanceOf(account).call();
    const nftIds = [];
    for (let i = 0; i < balance; i++) {
      const id = await nftInstance.methods.tokenOfOwnerByIndex(account, i).call();
      nftIds.push(id);
    }
    setNfts(nftIds);
  };

  const loadStakedNFTs = async (stakingInstance, account) => {
    const stakes = await stakingInstance.methods.getUserStakes(account).call();
    setStakedNfts(stakes);
  };

  const handleStake = async (tokenId, days) => {
    if (!stakingContract) return;
    try {
      await stakingContract.methods.stake([tokenId], days).send({ from: account });
      alert(`NFT staked for ${days} days!`);
      loadNFTs(nftContract, account);
      loadStakedNFTs(stakingContract, account);
    } catch (error) {
      console.error(error);
      alert(`Failed to stake NFT`);
    }
  };

  const handleUnstake = async (index) => {
    if (!stakingContract) return;
    try {
      await stakingContract.methods.unstake(index).send({ from: account });
      alert("NFT unstaked!");
      loadStakedNFTs(stakingContract, account);
    } catch (error) {
      console.error(error);
      alert("Failed to unstake NFT");
    }
  };

  const handleRestake = async (index, days) => {
    if (!stakingContract) return;
    try {
      await stakingContract.methods.restake(index, days).send({ from: account });
      alert(`NFT restaked for ${days} days!`);
      loadStakedNFTs(stakingContract, account);
    } catch (error) {
      console.error(error);
      alert(`Failed to restake NFT`);
    }
  };

  return (
    <div className="page-container">
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>
        <h2>Your NFTs</h2>
        {nfts.map((nft) => (
          <div key={nft}>
            <p>NFT ID: {nft}</p>
            <button onClick={() => handleStake(nft, 90)}>Stake for 90 days</button>
            <button onClick={() => handleStake(nft, 180)}>Stake for 180 days</button>
            <button onClick={() => handleStake(nft, 360)}>Stake for 360 days</button>
            <button onClick={() => handleStake(nft, 720)}>Stake for 720 days</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Staked NFTs</h2>
        {stakedNfts.map((stake, index) => (
          <div key={index}>
            <p>Stake Index: {index}</p>
            <p>Token IDs: {stake.tokenIds.join(', ')}</p>
            <button onClick={() => handleUnstake(index)}>Unstake</button>
            <button onClick={() => handleRestake(index, 90)}>Restake for 90 days</button>
            <button onClick={() => handleRestake(index, 180)}>Restake for 180 days</button>
            <button onClick={() => handleRestake(index, 360)}>Restake for 360 days</button>
            <button onClick={() => handleRestake(index, 720)}>Restake for 720 days</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Your Referral Link</h2>
        <p>{referralLink}</p>
      </div>
    </div>
  );
};

export default NFTPage;