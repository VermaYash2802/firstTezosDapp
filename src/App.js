import React from 'react';
import conseiljs , { TezosNodeWriter, TezosParameterFormat } from 'conseiljs';
import './App.css';

const tezosNode = 'https://carthagenet.smartpy.io';

async function VotingFunction(candidate) {
	console.log(candidate);
  const keystore = {
      publicKey: 'edpktfyA6eVgMSmoTgdm5ojjTdXCdF86N78JrZCuRR5wKyXup5jVFQ',
      privateKey: 'edskS6n7PUmKNTdbhQW7NdJvpLoSPvqTy3ocuACAMxwRxd4yK4w4CNsPcB1pgtmnyUH4eWUJmWvQ4dQHgkMq4n3HRMWvkH8X38',
      publicKeyHash: 'tz1awWmVReqEZFKho6ZaFLDe7jy8Tpexn4iV',
      seed: '',
      storeType: 1
  };
  const contractAddress = 'KT1PVWVCtKm326kKkXoPyLRx1bZRAo4QuExy';
  const result = await TezosNodeWriter.sendContractInvocationOperation(tezosNode, keystore, contractAddress,  0, 100000, '', 1000, 750000, undefined, `"${candidate}"`, TezosParameterFormat.Michelson);
  console.log(`Injected operation group id ${result.operationGroupID}`);
  //finishit("Data inserted successfully in blockchain. Reference id:"+result.operationGroupID);
  return result.operationGroupID;
}

function httpGet() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", 'https://carthagenet.smartpy.io/chains/main/blocks/head/context/contracts/KT1PVWVCtKm326kKkXoPyLRx1bZRAo4QuExy/storage', false ); // false for synchronous request
  xmlHttp.send( null );
  console.log(JSON.parse(xmlHttp.responseText));
}

function App() {
  httpGet()
  return (
    <div className="App">
      <header className="App-header">
        <h4 className="headerName">Voting Application</h4>
      </header>

      <div className="container">
        <h1>Welcome, you can vote for your favourite candidate here.</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <button className="col" onClick={() => VotingFunction("Modi")}>
                Vote for N Modi
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <button className="col" onClick={() => VotingFunction("Kejriwal")}>
                Vote for A Kejriwal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
