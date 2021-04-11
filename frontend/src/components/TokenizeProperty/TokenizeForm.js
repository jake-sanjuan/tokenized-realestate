import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ethers, utils } from "ethers";
import Bridge from "../../abi/Bridge.json";
import { getSigner, getContract } from "../../Main";

const TokenizeForm = () => {
  const contractAddress = "0x471db3bA8639Ce1C1F682b023A576746AE23F435";
  // const contractAddress = "0x1f17277D75EDE085b83b26416a13b24abC32DD9d";
  // const contractAddress = "0xD02C513472A7BA8ca4532642f390DdBA4249516E";
  const [walletAddress, setWalletAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState();
  const [price, setPrice] = useState(100);
  const [eth, setEth] = useState();
  const [token, setToken] = useState();

  const history = useHistory();

  let propOwner = "0x6cd26899F49D1bBfbEC3c1bB6B3716C866033147";
  let potentialOwner = walletAddress;
  let ownerName = utils.formatBytes32String(name);
  const addr = utils.formatBytes32String(address);
  const url = "http://9ef75e605f77.ngrok.io/owners";
  const namePath = `owner.${name}`;
  const addrPath = `owner.${name}.${address}`;
  const desiredPrice = price + "00000000000000000000000000";
  // const myAddr = utils.getAddress("0xcB07B63393C3c27bBE33fC9f6F476a8Dc469Dbbb");
  // const agentName = utils.formatBytes32String("william zhang");

  const SubmitToContract = async (walletAddress, addr, postalCode) => {
    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, Bridge.abi, signer);
      // let walletAddress = signer.getAddress().then((add) => {
      //   setWalletAddress(add);
      // });

      console.log("walletAddress", walletAddress);
      console.log("addr", addr);
      console.log("postalCode", postalCode);
      let contract = await getContract(
        contractAddress,
        Bridge.abi,
        await getSigner()
      );
      console.log(contract);

      let transaction = await contract.registerProperty(
        walletAddress,
        addr,
        postalCode
      );

      let receipt = await transaction.wait();
      let events = receipt.events;
      console.log("events", events);
      history.push("/claim");
    } catch (e) {
      console.log(e);
    }
  };

  const ConnectWallet = () => {
    getSigner()
      .then((signer) => {
        signer
          .getAddress()
          .then((add) => {
            setWalletAddress(add);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPriceInEth = async (desiredPrice) => {
    let contract = await getContract(
      contractAddress,
      Bridge.abi,
      await getSigner()
    );
    console.log("price", price);
    console.log("desiredPrice", desiredPrice);
    let transaction = await contract.homeValueInEther(desiredPrice);
    setEth(utils.formatEther(transaction.toString()));
  };

  const submitData = (e) => {
    e.preventDefault();
    SubmitToContract(walletAddress, addr, postalCode);
  };

  return (
    <>
      {token && (
        <>
          <h2>Claim your tokens</h2>
          <h6>1. Copy this address:</h6>
          <p>{contractAddress}</p>
        </>
      )}
      {!token && (
        <Form onSubmit={SubmitToContract}>
          <FormSection>
            <p>
              <label htmlFor="name">Wallet Address</label>
            </p>
            {!walletAddress && (
              <>
                <Address>Please connect your wallet.</Address>{" "}
                <button type="button" onClick={() => ConnectWallet()}>
                  Connect Wallet
                </button>
              </>
            )}

            {walletAddress && (
              <>
                <Address connected>{walletAddress}</Address>
                <button type="button" onClick={() => ConnectWallet()}>
                  Change Account
                </button>
              </>
            )}
          </FormSection>
          <FormSection>
            <p>
              <label htmlFor="price">Desired Sale Price</label>
            </p>
            <input
              type="number"
              id="price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            {eth && (
              <>
                <Address connected>You will earn {eth}ETH.</Address>
                <button
                  type="button"
                  onClick={() => getPriceInEth(desiredPrice)}
                >
                  Check Price
                </button>
              </>
            )}
            {!eth && (
              <>
                <Address>Check your desired price in ETH.</Address>{" "}
                <button
                  type="button"
                  onClick={() => getPriceInEth(desiredPrice)}
                >
                  Check Price
                </button>
              </>
            )}
          </FormSection>
          <FormSection>
            <p>
              <label htmlFor="street-address">Property Address</label>
            </p>
            <input
              id="street-address"
              name="street-address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <p>
              <label htmlFor="postal-code">Postal Code</label>
            </p>
            <input
              type="number"
              id="postal-code"
              name="postal-code"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FormSection>
          <p>
            By clicking TOKENIZE PROPERTY, <br />I agree to the following:{" "}
            <br />
            I) I am the owner of this home. <br />
            II) I will comply with Bridges Terms of Use.
          </p>
          <button onClick={submitData}>Tokenize Property</button>
        </Form>
      )}
    </>
  );
};

export default TokenizeForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1rem;
  }

  label {
    padding: 2rem 0;
    margin-top: 2rem;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input,
  textarea {
    border: none;
    background-color: ${(props) => props.theme.green};
    border-bottom: thin solid ${(props) => props.theme.white};
    padding: 0.5rem 0;
    color: ${(props) => props.theme.white};
    font-family: termina, sans-serif;
    text-transform: capitalize;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
    width: 100%;
    resize: none;
    ::placeholder {
      justify-self: flex-end;
    }

    ::focus {
      outline: none;
      border: none;
      background-color: ${(props) => props.theme.green};
      border-bottom: thin solid ${(props) => props.theme.neon};
    }

    ::autofill {
      outline: none;
      border: none;
      background-color: ${(props) => props.theme.green};
      border-bottom: thin solid ${(props) => props.theme.neon};
    }

    :hover {
      outline: none;
      border: none;
      background-color: ${(props) => props.theme.green};
      border-bottom: thin solid ${(props) => props.theme.neon};
    }
    ::active {
      outline: none;
      border: none;
      background-color: ${(props) => props.theme.green};
      border-bottom: thin solid ${(props) => props.theme.neon};
    }
  }

  input[type="file"]::-webkit-file-upload-button {
    border: thin solid ${(props) => props.theme.white};
    padding: 0.5em 1em;
    background-color: ${(props) => props.theme.green};
    transition: all 0.3s ease;
    text-transform: uppercase;
    color: ${(props) => props.theme.white};
    font-weight: 600;
    font-family: termina, sans-serif;
    letter-spacing: 0.05em;
    border-radius: 0;
    margin-right: 1rem;
    cursor: pointer;
  }

  input[type="file"]::file-selector-button {
    border: thin solid ${(props) => props.theme.white};
    padding: 0.5em 1em;
    text-transform: uppercase;
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.green};
    transition: all 0.3s ease;
    font-family: termina, sans-serif;
    letter-spacing: 0.05em;
    border-radius: 0;
    margin-right: 1rem;
    cursor: pointer;
  }

  input[type="file" i] {
    font-family: termina, sans-serif;
    letter-spacing: 0.05em;
    border-radius: 0;
  }

  input[type="file"]::-webkit-file-upload-button:hover,
  ::-webkit-file-upload-button::active,
  ::-webkit-file-upload-button::focus {
    outline: none;
    border: thin solid ${(props) => props.theme.neon};
    background-color: ${(props) => props.theme.lilac};
    color: ${(props) => props.theme.green};
    border-radius: 0;
  }

  input[type="file"]::file-selector-button:hover,
  ::file-selector-button:active,
  ::file-selector-button:focus {
    outline: none;
    border: thin solid ${(props) => props.theme.neon};
    background-color: ${(props) => props.theme.lilac};
    color: ${(props) => props.theme.green};
    border-radius: 0;
  }
`;

const FormSection = styled.section`
  padding: 2rem;
  border: thin solid ${(props) => props.theme.white};
  width: 100%;
  margin: 2rem 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  button {
    margin: 0;
    margin-bottom: 2rem;
    border: thin solid ${(props) => props.theme.white};
    padding: 0.5em 1em;
    background-color: ${(props) => props.theme.green};
    transition: all 0.3s ease;
    text-transform: uppercase;
    color: ${(props) => props.theme.white};
    font-weight: 600;
    font-family: termina, sans-serif;
    letter-spacing: 0.05em;
    border-radius: 0;
    margin-left: 1rem;
    cursor: pointer;
    :hover {
      outline: none;
      border: thin solid ${(props) => props.theme.neon};
      background-color: ${(props) => props.theme.lilac};
      color: ${(props) => props.theme.green};
      border-radius: 0;
    }
  }
  div {
    width: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    :first-of-type {
      margin-right: 1rem;
    }
  }
`;

const Address = styled.p`
  font-size: 1.2rem;
  color: ${(props) =>
    props.connected ? props.theme.lilac : props.theme.white};
  margin-bottom: ${(props) => (props.connected ? "1rem" : 0)};
`;
