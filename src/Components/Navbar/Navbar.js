"use client";
import React, { useEffect } from "react";
import "@coinbase/onchainkit/styles.css";
import AccountConnect from "./ConnectAccount";
import Image from "next/image";
import logo from "@/Assets/logo.png";
import Link from "next/link";
import { Tooltip, Dropdown, Button, Menu } from "antd";
import { getChainId } from "@/Helpers/getChainId";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  const chainId = useChainId();
  const { address } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  useEffect(() => {
    console.log(chainId);
  }, [chainId]);

  const menu = (
    <Menu>
      {chains.map((chain) => (
        <Menu.Item key={chain.id}>
          <Button
            type="link"
            onClick={() => switchChain({ chainId: chain.id })}
          >
            {chain.name}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-bold">
          <Link href="/">
            <Image src={logo} width={400} alt="alt" />
          </Link>
        </div>
        <div className="walletbtncontainer">
          <div className="walletbtn">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
