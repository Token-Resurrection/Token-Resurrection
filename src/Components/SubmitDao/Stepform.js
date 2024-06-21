"use client";
import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import {
  SolutionOutlined,
  UserOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { icons } from "antd/es/image/PreviewGroup";
import { Label } from "@headlessui/react";

const firststep = () => {
  return (
    <div>
    {/* <div class="w-6/12 mx-auto relative z-0 w-half mb-5 group">
      <div className="w-6/12 flex">

      <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Wallet Address</label>
      </div>
      <div>

      </div>
      <div>

      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </div>
  </div> */}
  check address
    </div>
  );
};
const steps = [
  {
    title: "Verify Address",
    // content: "first-content",
    content: firststep(),
    icon: <UserOutlined />,
  },
  {
    title: "Check Lock Token",
    content: "Second-content",
    icon:<UnorderedListOutlined />,
  },
  {
    title: "Explore Token",
    content: "Last-content",
    icon: <SolutionOutlined />,
  },
  {
    title: "Submit for review",
    content: "Last-content",
    icon: <CheckCircleOutlined />,
    
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
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  const contentStyle = {
    minHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
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
