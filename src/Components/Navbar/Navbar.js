import React from "react";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import '@coinbase/onchainkit/styles.css';
import style from './navabr.module.css'; // Import your custom styles
import AccountConnect from "./ConnectAccount";
// import ConnectAccountWrapper from "./Connectwrapperaccount";

function Navbar() {
  return (
    <div className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-bold">Token Resurrection</div>
        <div className={style.walletbtncontainer}>
          <div className={style.walletbtn}>
            {/* <ConnectAccount /> */}
              <AccountConnect/>
            {/* <ConnectAccountWrapper/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
