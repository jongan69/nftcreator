import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import {
  Preloader,
  Mouse,
  PopUp,
  Footer,
  Header,
  Promotion,
  Featured,
  Hero,
  Information,
  Popular,
  Collections,
  Action,
  Discover,
} from "../Components/index";


const NETWORK = process.env.NEXT_PUBLIC_NETWORK;
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;

const index = () => {
  const {
    connect,
    disconnect,
    connecting,
    publicKey,
    wallet,
    wallets,
    select,
  } = useWallet();
  const connection = new Connection(HELIUS_RPC_URL);

  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const storedArray = localStorage.getItem("SOLANA_NFTS");
    if (storedArray) {
      const nftsArray = JSON.parse(storedArray);

      setNfts(nftsArray.reverse());
    }
  }, []);

  function removeLastItemFromLocalStorage() {
    // Step 1: Retrieve the array from local storage
    const storedArray = localStorage.getItem("SOLANA_NFTS");

    // Step 2: Parse the JSON string into a JavaScript array
    if (storedArray) {
      const array = JSON.parse(storedArray);

      // Step 3: Remove the last element from the array
      array.pop(); // Removes the last element

      // Step 4: Convert the modified array back to a JSON string
      const updatedArray = JSON.stringify(array);

      // Step 5: Store the updated array back in local storage
      localStorage.setItem("SOLANA_NFTS", updatedArray);
    } else {
      console.log("No array found in local storage with the given key.");
    }
  }

  return (
    <>
      <Preloader />

      <div id="wrapper">
        <div id="page" className="pt-40">
          <Header />
          <Hero
            removeLastItemFromLocalStorage={removeLastItemFromLocalStorage}
            publicKey={publicKey}
          />
          <Promotion />
          {nfts?.length ? <Featured nfts={nfts} publicKey={publicKey} /> : ""}

          <Information />
          <Popular nfts={nfts} publicKey={publicKey} />
          <Collections />
          <Action publicKey={publicKey} />
          <Discover nfts={nfts} publicKey={publicKey} />

          <Footer />
        </div>

        <PopUp />
      </div>
      <Mouse />
    </>
  );
};

export default index;
