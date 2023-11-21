import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const AadharForm = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);

  const handleAadharChange = (e) => {
    setAadharNumber(e.target.value);
  };

  const handleSaveAadhar = () => {
    if (aadharNumber.length === 12) {
      if (aadharNumber && account) {
        const storedData = JSON.parse(localStorage.getItem('walletData')) || {};
        storedData[aadharNumber] = account;
        localStorage.setItem('walletData', JSON.stringify(storedData));
        console.log(storedData);
        alert("Successfully registered you")
      }
    } else {
      alert('Enter the 12 digit Aadhar Number');
    }
  };

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          const weiBalance = await web3.eth.getBalance(accounts[0]);
          const ethBalance = web3.utils.fromWei(weiBalance, 'ether');
          setBalance(parseFloat(ethBalance));
        } catch (error) {
          console.error('Error connecting to Metamask:', error);
        }
      } else {
        console.error('Metamask not detected');
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div className="bg-gray-800 h-full p-4 md:p-8 rounded-md shadow-md text-white">
      <h2 className="text-2xl mb-4">Metamask Wallet</h2>
      {account && (
        <>
          <div className="mt-4">
            <label className="block text-lg mb-2">Aadhar Number:</label>
            <input
              type="text"
              value={aadharNumber}
              onChange={handleAadharChange}
              className="w-full p-2 border rounded-md text-black"
            />
            <button
              onClick={handleSaveAadhar}
              className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Save Aadhar Number
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AadharForm;
