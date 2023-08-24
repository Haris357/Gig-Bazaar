import React, { useState } from 'react';
import Web3 from 'web3';

const Web3Wallet = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [web3, setWeb3] = useState(null);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(Web3.givenProvider || 'http://localhost:8545');
      setWeb3(web3Instance);

      try {
        // Request access to accounts
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  const getAccountBalance = async () => {
    if (web3 && account) {
      try {
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceEther);
      } catch (error) {
        console.error('Error getting account balance:', error);
      }
    }
  };

  return (
    <div className="meta-mask-container">
      <h2>MetaMask</h2>
      <button className="meta-mask-button" onClick={connectToMetaMask}>
        Connect to MetaMask
      </button>
      {account ? (
        <div className="meta-mask-info">
          <p>
            {account} <span className="status-indicator">&#10003;</span>
          </p>
          <button className="meta-mask-button" onClick={getAccountBalance}>
            Get Balance
          </button>
          {balance !== '' && <p>Balance: {balance} Ether</p>}
        </div>
      ) : (
        <p>Connect your MetaMask wallet</p>
      )}
    </div>
  );
};

export default Web3Wallet;
