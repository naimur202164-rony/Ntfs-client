import React, { useEffect, useState } from "react";
import Web3 from "web3";
import SimpleNft from "./contracts/SimpleNFT.json";
import Navbar from "./Navbar";

const App = () => {
  const [refresh, setrefresh] = useState(0);

  let content;
  const [loading2, setloading2] = useState(false);
  
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [Hello, setHello] = useState({});
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [buffer,setBuffer] = useState([]);
  let [id,setId] = useState(9);
//enable window.ethereum object
  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
//To load the blockchain data
  const loadBlockchainData = async () => {
    setLoading(true);
    if (
      typeof window.ethereum == "undefined" 
    ) {
      return;
    }
    const web3 = new Web3(window.ethereum);

    let url = window.location.href;
    console.log(url);

    const accounts = await web3.eth.getAccounts();
    console.log(accounts) 
    if (accounts.length == 0) {
      return;
    }
    
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    console.log("the network id is",networkId)
  
    
      
      setLoading(false);
    
    
  };
  
  
//to interact with smart contract and call the smart contract functions 
  const mintNft = async () => {
    if (
      typeof window.ethereum == "undefined" 
    ) {
      return;
    }
    const web3 = new Web3(window.ethereum);

    let url = window.location.href;
    console.log(url);

    const accounts = await web3.eth.getAccounts();
    console.log(accounts) 
    if (accounts.length == 0) {
      return;
    }
    
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    console.log("the network id is",networkId)

    //To create an object to interact with smart contracts
    const contract_simplenft = new web3.eth.Contract(SimpleNft.abi, "0x3cC5b80762466a0d7583a9ffb88feBCf8662Cc0e");                
      
    //To call smart contract function to display the name  
    const name = await contract_simplenft.methods.name().call();
     
    console.log(name);
    setName(name);
    //To call smart contract function to display the symbol
    const symbol = await contract_simplenft.methods.symbol().call();  
    console.log(symbol);
    setSymbol(symbol);
      
    alert("minting Nft started ")  
    //To call mint funtion of the smart contract
    contract_simplenft.methods.mintNFT("mockURI",150,accounts[0]).send({from:accounts[0]})
     
    // const owner = await contract_simplenft.methods.ownerOf(11).call();  
    // console.log(`owner of 11 is `,owner);
  
  };
    
    


  const onclick = async (a) => {
    const web3 = new Web3(window.web3);
    await Hello.methods
      .setCompleted(a.toString())
      .send({ from: account })
      .once("recepient", (recepient) => {
        console.log("success");
      })
      .on("error", () => {
        console.log("error");
      });
  };
  const capFile = async(event)=>{
    console.log("capture file");
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    
    reader.onloadend = () =>{
    
    setBuffer(Buffer(reader.result))
    
     }
   
    }
  
  const onSubmit = async(event)=>{
    event.preventDefault(); 
    console.log("on submit");
    
  }
  const walletAddress = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    window.location.reload();
  };

  useEffect(() => {
    loadWeb3();
    setrefresh(0);
    loadBlockchainData();
        if (refresh == 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    //esl
  }, [refresh]);
  
    content = (
      <div className="container">
        <main role="main" class="container">
          <div className="jumbotron">
            <h1>Connected to metamask </h1>
            <div className="row" style={{ paddingTop: "30px" }}>
              {" "}
  
              
  
              <div className="row" style={{ paddingLeft: "40px" }}>
              <input type = 'file' onChange={capFile}></input>
              <button onClick = {onSubmit}className="btn btn-primary">SUBMIT</button>
                
                
              </div>
              <div className="row" style={{ paddingLeft: "150px" }}>
                <br></br><br></br>
              <button onClick = {mintNft}className="btn btn-primary">MINT NFT</button>
              </div>
              
            
          </div>
          </div>
        </main>
      </div>
    );
  

  return (
    <div>
      <Navbar account={account} />

      {account == "" ? (
        <div className="container">
          {" "}
          Connect your wallet to application{"   "}{" "}
          <button onClick={walletAddress}>metamask</button>
        </div>
      ) : (
        content
      )}
      {/* {content} */}
    </div>
  );
};

export default App;
