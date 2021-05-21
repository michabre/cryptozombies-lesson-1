import React, { Component } from "react";
import CryptoZombiesContract from "./contracts/ZombieFactory.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import Header from "./components/Header/Header";
import ZombieFactory from "./components/ZombieBuilder/ZombieFactory";
import Loading from "./components/Loading/Loading";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    zombie: null,
    name: "test",
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CryptoZombiesContract.networks[networkId];
      const instance = new web3.eth.Contract(
        CryptoZombiesContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  onClickHandler = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(15).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  createZombie = async () => {
    const { accounts, contract, name } = this.state;
    const zombie = this.generateZombie;
    await contract.methods
      .createRandomZombie(name)
      .send({ from: accounts[0] })
      .then(function (data) {
        zombie(
          data.events.NewZombie.returnValues.zombieId,
          data.events.NewZombie.returnValues.name,
          data.events.NewZombie.returnValues.dna
        );
      });
  };

  generateZombie = (id, name, dna) => {
    console.log("generating zombie");
    let dnaStr = String(dna);
    // pad DNA with leading zeroes if it's less than 16 characters
    while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

    let zombieDetails = {
      // first 2 digits make up the head. We have 7 possible heads, so % 7
      // to get a number 0 - 6, then add 1 to make it 1 - 7. Then we have 7
      // image files named "head1.png" through "head7.png" we load based on
      // this number:
      headChoice: (dnaStr.substring(0, 2) % 7) + 1,
      // 2nd 2 digits make up the eyes, 11 variations:
      eyeChoice: (dnaStr.substring(2, 4) % 11) + 1,
      // 6 variations of shirts:
      shirtChoice: (dnaStr.substring(4, 6) % 6) + 1,
      // last 6 digits control color. Updated using CSS filter: hue-rotate
      // which has 360 degrees:
      skinColorChoice: parseInt((dnaStr.substring(6, 8) / 100) * 360),
      eyeColorChoice: parseInt((dnaStr.substring(8, 10) / 100) * 360),
      clothesColorChoice: parseInt((dnaStr.substring(10, 12) / 100) * 360),
      zombieName: name,
      zombieDescription: "A Level 1 CryptoZombie",
    };

    this.setState({ zombie: zombieDetails });
  };

  testText = (event) => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  render() {
    if (!this.state.web3) {
      return <Loading />;
    }
    return (
      <div className="App">
        <div className="topbar"></div>
        <section className="section">
          <div className="container mb-6">
            <Header
              title="CryptoZombies Lesson 1 Example"
              subtitle="Merging CryptoZombie Lesson 1 code into a Truffle, React and Ganache app."
            />
          </div>
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <div className="message is-info">
                  <div className="message-header">
                    <p>Zombie Status</p>
                  </div>
                  <div className="message-body">
                    {this.state.zombie
                      ? "Zombie Has Been Created"
                      : "No zombie has been created."}
                  </div>
                </div>

                <ZombieFactory details={this.state.zombie} />

                <div className="box has-text-left">
                  <p>
                    Based on the Solidity tutorials in Lesson 1 of the{" "}
                    <a href="https://cryptozombies.io/">
                      CryptoZombies Learning website
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="column has-text-left">
                <h3 className="title">Build a Zombie</h3>
                <div className="field">
                  <label className="label">Name of Zombie</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Verdugo"
                      onChange={this.testText}
                    />
                  </div>
                  <p className="help">Give the zombie a name.</p>
                </div>
                <div className="buttons">
                  <button
                    className="button is-dark"
                    onClick={this.createZombie}
                  >
                    Create Zombie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
