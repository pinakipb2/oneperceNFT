import React, { useState, useEffect } from "react";
import BuyNFTContract from "./contracts/BuyNFT.json";
import getWeb3 from "./getWeb3";

import "./App.css";

const App = () => {
  
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState(null)
  const [balance, setBalance] = useState(0)
  const [web3, setWeb3] = useState(null)
  const [myItems, setMyItems] = useState([])
  
  useEffect(() => {
    initial();
  }, [])
  
  const initial = async() => {
    try {
      const web3 = await getWeb3();
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BuyNFTContract.networks[networkId];
      const instance = new web3.eth.Contract(BuyNFTContract.abi, deployedNetwork && deployedNetwork.address);
      setContract(instance);
      const acc_balance = await web3.eth.getBalance(accounts[0]);
      const curr_balance = parseFloat(web3.utils.fromWei(acc_balance, 'ether'));
      setBalance(curr_balance);
      const myarr = await instance.methods.getItems().call();
      setMyItems(myarr);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }
  
  const buyItem = async(item, price) => {
    console.log(myItems[item]);
    console.log(item + " " + price);
    const response = await contract.methods.buyItem(item)
    .send({
      from: account,
      value: web3.utils.toWei(web3.utils.toBN(price), 'ether')
    });
    console.log(response);
    window.location.reload(false);
  }
  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="!">One perceNFT</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
      
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="!">Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!">About</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-sm-2" type="text" placeholder="Search"></input>
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      
      <div className="alert alert-success" style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>
        <strong>Account : </strong> {account} &nbsp;&nbsp; <strong>Balance : </strong> {balance.toPrecision(7)} ETH
      </div>
      
    <div className="container-fluid d-flex justify-content-center">
        <div className="row mt-5">
            <div className="col-sm-4">
                <div className="card"> <img src="https://cdn-icons-png.flaticon.com/512/4529/4529975.png" className="card-img-top" width="100%"  alt=""></img>
                    <div className="card-body pt-0 px-0">
                        <div className="d-flex flex-row justify-content-between mb-0 px-3"> <small className="text-muted mt-1">CURRENT PRICE</small>
                            <h6>52 ETH</h6>
                        </div>
                        <hr className="mt-2 mx-3"></hr>
                        <div className="d-flex flex-row justify-content-between px-3 pb-4">
                            <div className="d-flex flex-column"><span className="text-muted">Rarity</span><small className="text-muted">L/100KM</small></div>
                            <div className="d-flex flex-column">
                                <h5 className="mb-0">{Math.floor(Math.random() * (50 - 10) + 10)}/{Math.floor(Math.random() * (9000 - 4000) + 4000)}</h5><small className="text-muted text-right">(city/Hwy)</small>
                            </div>
                        </div>
                        {myItems[1] === "0x0000000000000000000000000000000000000000" ? <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} onClick={() => {buyItem(1,52)}}><small>BUY</small></button></div> : <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} disabled><small>BOUGHT</small></button></div>}
                        
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card"> <img src="https://img-premium.flaticon.com/png/512/3227/premium/3227017.png?token=exp=1632196600~hmac=ad54c40a2f4f1dd3f3560f2cafb7a946" className="card-img-top" width="100%"  alt=""></img>
                    <div className="card-body pt-0 px-0">
                        <div className="d-flex flex-row justify-content-between mb-0 px-3"> <small className="text-muted mt-1">CURRENT PRICE</small>
                            <h6>41 ETH</h6>
                        </div>
                        <hr className="mt-2 mx-3"></hr>
                        <div className="d-flex flex-row justify-content-between px-3 pb-4">
                            <div className="d-flex flex-column"><span className="text-muted">Rarity</span><small className="text-muted">L/100KM</small></div>
                            <div className="d-flex flex-column">
                                <h5 className="mb-0">{Math.floor(Math.random() * (100 - 10) + 10)}/{Math.floor(Math.random() * (2000 - 200) + 200)}</h5><small className="text-muted text-right">(city/Hwy)</small>
                            </div>
                        </div>
                        {myItems[2] === "0x0000000000000000000000000000000000000000" ? <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} onClick={() => {buyItem(2,41)}}><small>BUY</small></button></div> : <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} disabled><small>BOUGHT</small></button></div>}
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card"> <img src="https://cdn-icons-png.flaticon.com/512/1507/1507115.png" className="card-img-top" width="100%"  alt=""></img>
                    <div className="card-body pt-0 px-0">
                        <div className="d-flex flex-row justify-content-between mb-0 px-3"> <small className="text-muted mt-1">CURRENT PRICE</small>
                            <h6>34 ETH</h6>
                        </div>
                        <hr className="mt-2 mx-3"></hr>
                        <div className="d-flex flex-row justify-content-between px-3 pb-4">
                            <div className="d-flex flex-column"><span className="text-muted">Rarity</span><small className="text-muted">L/100KM</small></div>
                            <div className="d-flex flex-column">
                                <h5 className="mb-0">{Math.floor(Math.random() * (100 - 10) + 10)}/{Math.floor(Math.random() * (7000 - 200) + 200)}</h5><small className="text-muted text-right">(city/Hwy)</small>
                            </div>
                        </div>
                        {myItems[3] === "0x0000000000000000000000000000000000000000" ? <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} onClick={() => {buyItem(3,34)}}><small>BUY</small></button></div> : <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} disabled><small>BOUGHT</small></button></div>}
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card"> <img src="https://img-premium.flaticon.com/png/512/3049/premium/3049617.png?token=exp=1632196600~hmac=7efa98d25066ad1627f736d7ce0d2a4b" className="card-img-top" width="100%"  alt=""></img>
                    <div className="card-body pt-0 px-0">
                        <div className="d-flex flex-row justify-content-between mb-0 px-3"> <small className="text-muted mt-1">CURRENT PRICE</small>
                            <h6>2 ETH</h6>
                        </div>
                        <hr className="mt-2 mx-3"></hr>
                        <div className="d-flex flex-row justify-content-between px-3 pb-4">
                            <div className="d-flex flex-column"><span className="text-muted">Rarity</span><small className="text-muted">L/100KM</small></div>
                            <div className="d-flex flex-column">
                                <h5 className="mb-0">{Math.floor(Math.random() * (100 - 10) + 10)}/{Math.floor(Math.random() * (7000 - 200) + 200)}</h5><small className="text-muted text-right">(city/Hwy)</small>
                            </div>
                        </div>
                        {myItems[4] === "0x0000000000000000000000000000000000000000" ? <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} onClick={() => {buyItem(4,2)}}><small>BUY</small></button></div> : <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} disabled><small>BOUGHT</small></button></div>}
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card"> <img src="https://cdn-icons-png.flaticon.com/512/704/704027.png" className="card-img-top" width="100%"  alt=""></img>
                    <div className="card-body pt-0 px-0">
                        <div className="d-flex flex-row justify-content-between mb-0 px-3"> <small className="text-muted mt-1">CURRENT PRICE</small>
                            <h6>15 ETH</h6>
                        </div>
                        <hr className="mt-2 mx-3"></hr>
                        <div className="d-flex flex-row justify-content-between px-3 pb-4">
                            <div className="d-flex flex-column"><span className="text-muted">Rarity</span><small className="text-muted">L/100KM</small></div>
                            <div className="d-flex flex-column">
                                <h5 className="mb-0">{Math.floor(Math.random() * (100 - 10) + 10)}/{Math.floor(Math.random() * (7000 - 200) + 200)}</h5><small className="text-muted text-right">(city/Hwy)</small>
                            </div>
                        </div>
                        {myItems[5] === "0x0000000000000000000000000000000000000000" ? <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} onClick={() => {buyItem(5,15)}}><small>BUY</small></button></div> : <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} disabled><small>BOUGHT</small></button></div>}
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card"> <img src="https://cdn-icons-png.flaticon.com/512/704/704026.png" className="card-img-top" width="100%"  alt=""></img>
                    <div className="card-body pt-0 px-0">
                        <div className="d-flex flex-row justify-content-between mb-0 px-3"> <small className="text-muted mt-1">CURRENT PRICE</small>
                            <h6>18 ETH</h6>
                        </div>
                        <hr className="mt-2 mx-3"></hr>
                        <div className="d-flex flex-row justify-content-between px-3 pb-4">
                            <div className="d-flex flex-column"><span className="text-muted">Rarity</span><small className="text-muted">L/100KM</small></div>
                            <div className="d-flex flex-column">
                                <h5 className="mb-0">{Math.floor(Math.random() * (100 - 10) + 10)}/{Math.floor(Math.random() * (7000 - 200) + 200)}</h5><small className="text-muted text-right">(city/Hwy)</small>
                            </div>
                        </div>
                        {myItems[6] === "0x0000000000000000000000000000000000000000" ? <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} onClick={() => {buyItem(6,18)}}><small>BUY</small></button></div> : <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} disabled><small>BOUGHT</small></button></div>}
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card"> <img src="https://cdn-icons-png.flaticon.com/512/1507/1507187.png" className="card-img-top" width="100%" alt=""></img>
                    <div className="card-body pt-0 px-0">
                        <div className="d-flex flex-row justify-content-between mb-0 px-3"> <small className="text-muted mt-1">CURRENT PRICE</small>
                            <h6>73 ETH</h6>
                        </div>
                        <hr className="mt-2 mx-3"></hr>
                        <div className="d-flex flex-row justify-content-between px-3 pb-4">
                            <div className="d-flex flex-column"><span className="text-muted">Rarity</span><small className="text-muted">L/100KM</small></div>
                            <div className="d-flex flex-column">
                                <h5 className="mb-0">{Math.floor(Math.random() * (100 - 10) + 10)}/{Math.floor(Math.random() * (7000 - 200) + 200)}</h5><small className="text-muted text-right">(city/Hwy)</small>
                            </div>
                        </div>
                        {myItems[7] === "0x0000000000000000000000000000000000000000" ? <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} onClick={() => {buyItem(7,73)}}><small>BUY</small></button></div> : <div className="mx-3 mt-3 mb-2"><button type="button" className="btn btn-danger btn-block" style={{fontSize: "18px"}} disabled><small>BOUGHT</small></button></div>}
                    </div>
                </div>
            </div>
            </div>
            </div>
    </>
  )
}

export default App
