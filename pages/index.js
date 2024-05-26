import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;  
          background: rgb(2,0,36);
          background: -moz-linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(107,9,121,1) 35%, rgba(0,212,255,1) 100%);
          background: -webkit-linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(107,9,121,1) 35%, rgba(0,212,255,1) 100%);
          background: linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(107,9,121,1) 35%, rgba(0,212,255,1) 100%);
          filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024",endColorstr="#00d4ff",GradientType=1);      
          font-family: "Michroma", Gadget, sans-serif;
          font-size: 25px;
          letter-spacing: -2px;
          word-spacing: 2 px;
          color: #ffffff;
          font-weight: 700;
          text-decoration: none solid rgb(68, 68, 68);
          font-style: italic;
          font-variant: small-caps;
          text-transform: capitalize; 
          padding: 20px;
        }
        header {
          margin-bottom: 1px;
          text-align: center;
        }
        h1 {
          font-size: 4rem;
          color: rgb(255, 178, 0);
          text-shadow: rgb(179, 0, 0) 2px 2px 2px;
}
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        p {
          font-size: 1.5rem;
          margin: 10px 0;
        }
        .account, .balance {
          font-weight: bold;
          color: #4a90e2;
        }
        .error {
          color: red;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .button {
          background-color: #04AA6D;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
        }  
      `}</style>
    </main>
  )
}
