"use client";
import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import {
  SolutionOutlined,
  UserOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import formstyle from "./stepfrom.module.css";
import { icons } from "antd/es/image/PreviewGroup";
import { Label } from "@headlessui/react";

const firststep = () => {
  return (
    <div className={formstyle.maindivcontent1}>
      <div className={formstyle.titledivfor1}>
        {/* <h1>Token Discovery</h1> */}
        <h3>Enter Your Contract Address to Discover Hidden Tokens!</h3>
      </div>
      <div className={formstyle.divbtninput}>
        <div className={formstyle.inputbuttondiv}>

        <input placeholder="Enter Address" />
        </div>
        <div>
          <button className={formstyle.buttonin1step}>Submit</button>
          <button className={formstyle.buttonin11step}>Back</button>
        </div>
      </div>
    </div>
  );
};

const jsonData = [
  { tokenName: "Token A", tokenAddress: "0xEd154b193FabDb2ef502Edb98284005CcF148516", amount: 100 },
  { tokenName: "Token B", tokenAddress: "0xEd154b193FabDb2ef502Edb98284005CcF148516", amount: 200 },
  { tokenName: "Token C", tokenAddress: "0xEd154b193FabDb2ef502Edb98284005CcF148516", amount: 300 },
];

const secondstep = () => {
  return (
    <div className={formstyle.maindivcontent2}>
      <div className={formstyle.titlediv2}>
        <h1>Discover Your Holdings</h1>
        <h3>All Your Locked Tokens in One Place!</h3>
      </div>
      <div className={formstyle.tablediv}>
        <table>
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Token Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {jsonData.map((token, index) => (
              <tr className={formstyle.trtagbody} key={index}>
                <td>{token.tokenName}</td>
                <td>{token.tokenAddress}</td>
                <td>{token.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thirdstep = () => {
  return (
    <div className={formstyle.main}>
      <div className={formstyle.titlediv2}>
        {/* <h1>Discover Your Holdings</h1>
        <h3>All Your Locked Tokens in One Place!</h3> */}
        <h1>Explore Token</h1>
      </div>
      <div className={formstyle.tablediv}>
        <table>
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Token Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {jsonData.map((token, index) => (
              <tr className={formstyle.trtagbody} key={index}>
                <td>{token.tokenName}</td>
                <td>{token.tokenAddress}</td>
                <td>{token.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const fourthstep = () => {
  return (
    <div>
      <div className={formstyle.maindivof4}>
        <div className={formstyle.headingdiv}>
        <div className={formstyle.headingdiv1}><span>Review & Submit.</span></div>
        <div className={formstyle.headingdiv11}>Verify the details thoroughly and submit to DAO for review.</div>
        </div>
        <div className={formstyle.buttondiv}>
        <button className={formstyle.buttonin1step}>Submit</button>
        <button className={formstyle.buttonin11step}>Back</button>
        </div>
      </div>
    </div>
  )}

const steps = [
  {
    title: <div className={formstyle.steptitles}>Verify Address</div>,
    content: firststep(),
    icon: <UserOutlined className={formstyle.customIcon} />,
  },
  {
    title: <div className={formstyle.steptitles}>Check Lock Token</div>,
    content: secondstep(),
    icon: <UnorderedListOutlined className={formstyle.customIcon} />,
  },
  {
     title: <div className={formstyle.steptitles}>Explore Token</div>,
    content: thirdstep(),
    icon: <SolutionOutlined className={formstyle.customIcon} />,
  },
  {
     title: <div className={formstyle.steptitles}>Submit for review</div>,
    content: fourthstep(),
    icon: <CheckCircleOutlined className={formstyle.customIcon} />,
  },
];

const Stepform = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item, index) => ({
    key: item.title,
    title: (<span className={formstyle.titleinsteps}>
      {item.title}
    </span>),
    icon: (
      <span className={index === current ? formstyle.currentIcon : ""}>
        {item.icon}
      </span>
    ),
    status: index === current ? "process" : index < current ? "finish" : "wait",
  }));

  const contentStyle = {
    minHeight: "360px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: "white",
    borderRadius: "46px",
    border: "none",
    marginTop: 36,
    boxShadow:"rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  };

  return (
    <div className="p-20">
      <Steps current={current} items={items} />
      <div className=" text-black" style={contentStyle}>
        {steps[current].content}
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};
export default Stepform;
