import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import DeFiClubABI from '../components/DeFiClubABI.json';

const defiClubAddress = "0xDD5c66b7FB16eC939BD5A84C044DEA3Bd9804062";

const MintPage = () => {
    const [mintAmount, setMintAmount] = useState(1);
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (web3 && account) {
            const instance = new web3.eth.Contract(DeFiClubABI, defiClubAddress);
            setContract(instance);
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

    const handleMint = async () => {
        if (!contract) return;
        try {
            const price = await contract.methods.currentPrice().call();
            const totalPrice = price * mintAmount;
            await contract.methods.mint(mintAmount).send({ from: account, value: totalPrice });
            alert("Minting successful!");
        } catch (error) {
            console.error(error);
            alert("Minting failed!");
        }
    };

    return (
        <div className="page-container">
            <h1>Mint Your NFT</h1>
            <button onClick={connectWallet}>Connect Wallet</button>
            <input
                type="number"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                min="1"
                max="9"
            />
            <button onClick={handleMint}>Mint</button>
        </div>
    );
};

export default MintPage;
