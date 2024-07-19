import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/mint">Mint</Link></li>
                    <li><Link to="/nft">Your NFTs</Link></li>
                </ul>
            </nav>
            <button onClick={connectWallet}>Connect Wallet</button>
        </header>
    );
};

const connectWallet = async () => {
    // Логика подключения кошелька
};

export default Header;
