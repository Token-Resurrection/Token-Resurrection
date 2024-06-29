"use client";
import React from "react";
// import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import "@coinbase/onchainkit/styles.css";
import style from "./navabr.module.css"; // Import your custom styles
import AccountConnect from "./ConnectAccount";
import Image from "next/image";
import logo from "@/Assets/logo.png";
function Navbar() {
  return (
    <div className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-bold">
          <Image src={logo} width={400} alt="alt"/>
        </div>
        <div className={style.walletbtncontainer}>
          <div className={style.walletbtn}>
            {/* <ConnectAccount /> */}
            <AccountConnect/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;