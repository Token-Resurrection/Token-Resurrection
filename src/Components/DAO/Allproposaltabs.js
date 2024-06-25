"use client";
import React, { useState } from "react";
import { Tabs } from "antd";
import Activeproposal from "./Activeproposal";
import Rejectedproposal from "./Rejectedproposals";
import Pendingproposal from "./Pendingproposals";
import Completedproposal from "./Completedproposal";
import 'tailwindcss/tailwind.css';
import tabstyle from "./alltabs.module.css";

const Alltabs = () => {
  const [activeKey, setActiveKey] = useState("1");

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        type="card"
        tabBarStyle={{ backgroundColor: 'white' }}
        className="w-3/4 border"
        items={[
          {
            label: <div className={tabstyle.tabbutton}>Active Proposals</div>,
            key: "1",
            children: <div className={tabstyle.tabcontent}><Activeproposal /></div>,
          },
          {
            label: <div className={tabstyle.tabbutton}>Submitted Proposals</div>,
            key: "2",
            children: <div className={tabstyle.tabcontent}><Completedproposal /></div>,
          },
          {
            label: <div className={tabstyle.tabbutton}>Pending Proposals</div>,
            key: "3",
            children: <div className={tabstyle.tabcontent}><Pendingproposal /></div>,
          },
          {
            label: <div className={tabstyle.tabbutton}>Rejected Proposals</div>,
            key: "4",
            children: <div className={tabstyle.tabcontent}><Rejectedproposal /></div>,
          },
        ]}
      />
    </div>
  );
};

export default Alltabs;
