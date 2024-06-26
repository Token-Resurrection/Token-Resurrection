"use client";
import React, { useState } from "react";
import Activeproposal from "./Activeproposal";
import Rejectedproposal from "./Rejectedproposals";
import Pendingproposal from "./Pendingproposals";
import Completedproposal from "./Completedproposal";
import tabstyle from "./alltabs.module.css";

const Alltabs = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className={tabstyle.container}>
      <div className={tabstyle.tabHeaders}>
        <button
          className={`${tabstyle.tabButton1} ${activeTab === "1" ? tabstyle.active : ""}`}
          onClick={() => setActiveTab("1")}
        >
          Active Proposals
        </button>
        <button
          className={`${tabstyle.tabButton2} ${activeTab === "2" ? tabstyle.active : ""}`}
          onClick={() => setActiveTab("2")}
        >
          Submitted Proposals
        </button>
        <button
          className={`${tabstyle.tabButton3} ${activeTab === "3" ? tabstyle.active : ""}`}
          onClick={() => setActiveTab("3")}
        >
          Pending Proposals
        </button>
        <button
          className={`${tabstyle.tabButton4} ${activeTab === "4" ? tabstyle.active : ""}`}
          onClick={() => setActiveTab("4")}
        >
          Rejected Proposals
        </button>
      </div>
      <div className={tabstyle.tabContent}>
        {activeTab === "1" && <Activeproposal />}
        {activeTab === "2" && <Completedproposal />}
        {activeTab === "3" && <Pendingproposal />}
        {activeTab === "4" && <Rejectedproposal />}
      </div>
    </div>
  );
};

export default Alltabs;
