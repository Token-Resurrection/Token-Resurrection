"use client";
import React, { useEffect, useState } from "react";
import "@coinbase/onchainkit/styles.css";
import style from "./navabr.module.css"; // Import your custom styles
import AccountConnect from "./ConnectAccount";
import Image from "next/image";
import logo from "@/Assets/logo.png";
import Link from "next/link";
import { Tooltip } from "antd";
import { getChainId } from "@/Helpers/getChainId";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccount, useChainId } from "wagmi";

function Navbar() {
  // const [chainId, setChainId] = useState(null);
  const   chainId = useChainId();
  const { address } = useAccount();
  console.log(chainId);

  return (
    <div className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-bold">
          <Link href="/">
            <Image src={logo} width={400} alt="alt" />
          </Link>
        </div>
        <div className={style.walletbtncontainer}>
          {address &&
            address.length > 0 && ( // Check if address is valid
              <div className={style.networkdiv}>
                {chainId === 8453 ? (
                  <Tooltip title="Connected to Base">
                    <img
                      width={30}
                      src="https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.webp"
                      alt="Base Network"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Wrong Network">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                  </Tooltip>
                )}
              </div>
            )}
          <div className={style.walletbtn}>
            <AccountConnect />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
