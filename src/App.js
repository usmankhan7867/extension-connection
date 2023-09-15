/*global chrome*/
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import Minter from "./components/Minter";
import Navbar from "./components/Navbar";

function App() {
  const [wallet, setWallet] = useState({});
  // Connect Wallet
  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.enable();
        const accounts = await window.ethereum.send("eth_requestAccounts");
        const _signer = new ethers.providers.Web3Provider(window.ethereum);
        setWallet({
          ...wallet,
          address: accounts?.result[0],
          signer: _signer.getSigner(),
          network: await _signer.getNetwork(),
        });
      } catch (error) {
        console.log("Error:", error.message);
      }
    } else alert("Please install MetaMask");
  };
  // Switch Network
  const handleSwitchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }],
        });
      } catch (error) {
        if (error.code === 4902) {
          alert("Please add this network to metamask!");
        }
      }
    }
  };
  // Disconnect Wallet
  const handleDisconnectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("to be coded...");
      } catch (error) {
        console.log("Error:", error.message);
      }
    } else alert("Please install MetaMask");
  };
  // Detect change in Metamask accounts
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => handleConnectWallet());
      window.ethereum.on("accountsChanged", () => handleSwitchNetwork());
    }
  });
  // Connect wallet on Refresh Page
  useEffect(() => {
   
    window.addEventListener("message", handleMessage);
  }, []);

  const handleMessage = (event) => {
    if (event.data && event.data.SoccorWallet) {
      console.log("object",event.data.SoccorWallet)
      const soccorWalletData = event.data.SoccorWallet;
      console.log("soccorWalletData", soccorWalletData)
      chrome.runtime.sendMessage(soccorWalletData.extensionID,{ action: "connected",data:{contract:"0x0000",params:"12345"} });
      
    } else {
      console.log("Could not find extension. Dowload from XYZ")

    }
  };
  return (
    <>
      <Navbar
        wallet={wallet}
        connectWallet={handleConnectWallet}
        disconnectWallet={handleDisconnectWallet}
      />
      <button>Open Extenion</button>
<button id="open-popup-button">Open Extension Popup</button>

    </>
  );
}

export default App;
