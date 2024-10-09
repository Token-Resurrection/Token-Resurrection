// FailureResult.js
import { Result, Button } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import formstyle from "./stepfrom.module.css";
const FailureResult = ({ onReset, message }) => (
  <Result
    status="error"
    title="Submission Failed"
    subTitle={message}
    extra={<button  className={formstyle.buttonin11step} type="primary" onClick={onReset}>Try Again</button>}
  />
);

export default FailureResult;