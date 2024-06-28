import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import formstyle from "./stepfrom.module.css";

const SuccessResult = ({ onReset }) => (
  <Result
    icon={<SmileOutlined />}
    title="Successfully Submitted"
    subTitle="Your Proposal has been successfully submitted."
    extra={
      <button className={formstyle.buttonin11step} type="primary" onClick={onReset}>
        Submit Another
      </button>
    }
  />
);

export default SuccessResult;
