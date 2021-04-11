import React from "react";
import styled from "styled-components";
import Container from "../components/Container";

const Instructions = () => {
  const copyText = "0x471db3bA8639Ce1C1F682b023A576746AE23F435";
  return (
    <Cont green>
      <h1>Claim your tokens</h1>
      <p>1. Click this button to copy the address:</p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(copyText);
        }}
      >
        Copy Address
      </button>
      <p>2. Go to Metamask, click ADD TOKEN</p>
      <p>3. Click CUSTOM TOKEN</p>
      <p>4. Paste the address in the first input field.</p>
      <p>5. Click Next.</p>
      <p>5. Click add tokens.</p>
      <br />
      <p>You should see your BRDG tokens in your assets.</p>
    </Cont>
  );
};

export default Instructions;

const Cont = styled(Container)`
  height: 100vh;
  justify-content: flex-start;
`;
