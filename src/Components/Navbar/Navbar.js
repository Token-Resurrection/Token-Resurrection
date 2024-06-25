import React from "react";
import navstyle from "./navabr.module.css";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import '@coinbase/onchainkit/styles.css';
function Navbar() {
  return (
    <div className=" p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-bold">Token Resurrection</div>
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"> */}
        <div className={navstyle.walletbtncontainer}>
          <ConnectAccount  className={navstyle.walletbtn} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
