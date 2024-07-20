import React from 'react';
import { Link } from 'react-router-dom';
import ConnectButton from './ConnectButton';

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
      <ConnectButton />
    </header>
  );
};

export default Header;
