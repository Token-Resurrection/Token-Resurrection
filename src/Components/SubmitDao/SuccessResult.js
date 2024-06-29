import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import formstyle from "./stepfrom.module.css";

const SuccessResult = ({ onReset }) => (
  <Result
    icon={<SmileOutlined />}
    title="Successfully Submitted"
    subTitle="Your Proposal has been successfully submitted."
    extra={
      <div>

      <button className={formstyle.buttonin11step} type="primary" onClick={onReset}>
        Submit Another
      </button>
      <a href="/dao"  target="_blank" rel="noopener noreferrer" >

         <button className={formstyle.buttonin1step} type="primary">
        View Proposal
       </button>
      </a>
      </div>
    }
  />
);

export default SuccessResult;
