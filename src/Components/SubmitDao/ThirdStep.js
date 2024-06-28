import React from "react";
import formstyle from "./stepform.module.css";
import propstyle from "../DAO/proposals.module.css";

const ThirdStep = ({ storedAddress, selectedToken, Totalamount, handleSubmit, submitting }) => {
  return (
    <div>
      <div className={formstyle.maindivof4}>
        <div className={formstyle.headingdiv}>
          <div className={formstyle.headingdiv1}>
            <span>Review & Submit.</span>
          </div>
          <div className={formstyle.headingdiv11}>
            Verify the details thoroughly and submit to DAO for review.
          </div>
        </div>
        <div className={formstyle.tkdetailsdiv}>
          <div className={propstyle.divdetail}>
            <div className={propstyle.titledetail}>Contract Address</div>
            <div className={propstyle.titlecontent}>{storedAddress}</div>
          </div>

          <div className="flex">
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Token Name</div>
              <div className={propstyle.titlecontent}>
                {selectedToken.tokenName}
              </div>
            </div>
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Token Amount</div>
              <div className={propstyle.titlecontent}>{Totalamount}</div>
            </div>
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Token Holders</div>
              <div className={propstyle.titlecontent}>200</div>
            </div>
          </div>
          <div className={propstyle.divdetail}>
            <div className={propstyle.titledetail}>Token Address</div>
            <div className={propstyle.titlecontent}>
              {selectedToken.tokenAddress}
            </div>
          </div>
        </div>

        <div className={formstyle.buttondiv}>
          <button className={formstyle.buttonin1step} onClick={handleSubmit} loading={submitting} disabled={!selectedToken || submitting}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;
