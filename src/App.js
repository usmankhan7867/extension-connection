/*global chrome*/
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Contract, ethers } from "ethers";
import Minter from "./components/Minter";
import Navbar from "./components/Navbar";
import { address } from "./contract/contractAddress";
import { abi } from "./contract/contractAbi";

function App() {
  const [wallet, setWallet] = useState({});
  // Connect Wallet
  // const handleConnectWallet = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     try {
  //       await window.ethereum.enable();
  //       const accounts = await window.ethereum.send("eth_requestAccounts");
  //       const _signer = new ethers.providers.Web3Provider(window.ethereum);
  //       setWallet({
  //         ...wallet,
  //         address: accounts?.result[0],
  //         signer: _signer.getSigner(),
  //         network: await _signer.getNetwork(),
  //       });
  //     } catch (error) {
  //       console.log("Error:", error.message);
  //     }
  //   } else alert("Please install MetaMask");
  // };
  // Switch Network
  // const handleSwitchNetwork = async () => {
  //   if (window.ethereum) {
  //     try {
  //       await window.ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: "0x4" }],
  //       });
  //     } catch (error) {
  //       if (error.code === 4902) {
  //         alert("Please add this network to metamask!");
  //       }
  //     }
  //   }
  // };
  // Disconnect Wallet
  // const handleDisconnectWallet = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     try {
  //       console.log("to be coded...");
  //     } catch (error) {
  //       console.log("Error:", error.message);
  //     }
  //   } else alert("Please install MetaMask");
  // };
  // Detect change in Metamask accounts
  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.on("chainChanged", () => handleConnectWallet());
  //     window.ethereum.on("accountsChanged", () => handleSwitchNetwork());
  //   }
  // });
  // Connect wallet on Refresh Page
  useEffect(() => {
   
    window.addEventListener("message", handleMessage);
  }, []);

  const handleMessage =async (event) => {
    if (event.data && event.data.SoccorWallet) {
      console.log("object",event.data.SoccorWallet)
      const soccorWalletData = event.data.SoccorWallet;
      console.log("soccorWalletData", soccorWalletData)
      let params={
        _to: address,
        amount: 1000
      }
      // chrome.runtime.sendMessage(soccorWalletData.extensionID,{ action: "isConnected" },(data)=>{console.log("hellooo",data)})
      chrome.runtime.sendMessage(soccorWalletData.extensionID,{ action: "connect" },(data)=>{console.log("hellooo",data)})
      // chrome.runtime.sendMessage(soccorWalletData.extensionID,{ action: "disconnect" },(data)=>{console.log("hellooo",data)})
     
      // chrome.runtime.sendMessage(soccorWalletData.extensionID,{ action: "connect"},(data)=>{console.log("hellooo",data)})
      // chrome.runtime.sendMessage(soccorWalletData.extensionID,{ action: "sendTransaction",data:{contract:address,functionName:"transfer",abi:abi,params:params}},(data)=>{console.log("hellooo",data)})
    } else 
    {
      console.log("Could not find extension. Dowload from XYZ")
    }
  };
  return (
    <>
      <Navbar
        wallet={wallet}
      />
      <button>Open Extenion</button>
<button id="open-popup-button">Open Extension Popup</button>

    </>
  );
}

export default App;
