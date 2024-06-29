"use client";
import { useEffect, useState } from 'react';
import formstyle from '../../Components/SubmitDao/stepfrom.module.css'; // Assuming you have formstyle module for button styles
import image1 from '../../Assets/img1.png';
import image2 from '../../Assets/img2.png';
import image3 from '../../Assets/img3.png'; // Ensure this matches your folder structure

export default function Home() {
  const [proposalCount, setProposalCount] = useState(0);
  const [claimCount, setClaimCount] = useState(0);

  useEffect(() => {
    let startProposal = 0;
    const endProposal = 1500;
    const durationProposal = 1500;
    const stepTimeProposal = Math.abs(Math.floor(durationProposal / endProposal));
    const timerProposal = setInterval(() => {
      startProposal += 1;
      setProposalCount(startProposal);
      if (startProposal === endProposal) clearInterval(timerProposal);
    }, stepTimeProposal);
  }, []);

  useEffect(() => {
    let startClaim = 0;
    const endClaim = 300;
    const durationClaim = 1500;
    const stepTimeClaim = Math.abs(Math.floor(durationClaim / endClaim));
    const timerClaim = setInterval(() => {
      startClaim += 1;
      setClaimCount(startClaim);
      if (startClaim === endClaim) clearInterval(timerClaim);
    }, stepTimeClaim);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full py-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-5 text-center">Welcome to My Project</h1>
        <div className="flex flex-wrap justify-center space-x-4 space-y-4 sm:space-y-0">
          <button className={`${formstyle.buttonin1step} ${formstyle.btncheck}`}>Button 1</button>
          <button className={`${formstyle.buttonin1step} ${formstyle.btncheck}`}>Button 2</button>
          <button className={`${formstyle.buttonin1step} ${formstyle.btncheck}`}>Button 3</button>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mt-10">
          <div className="relative">
            <img src={image1} alt="Random 1" className="random-image img1" />
          </div>
          <div className="relative">
            <img src={image2} alt="Random 2" className="random-image img2" />
          </div>
          <div className="relative">
            <img src={image3} alt="Random 3" className="random-image img3" />
          </div>
        </div>
      </div>
      <div className="w-full bg-black py-10 flex flex-col sm:flex-row justify-center items-center">
        <h2 className="text-3xl text-white mx-5 my-2 sm:my-0">
          Active Proposals: <span>{proposalCount}</span>
        </h2>
        <h2 className="text-3xl text-white mx-5 my-2 sm:my-0">
          Total Claims: <span>{claimCount}</span>
        </h2>
      </div>
    </div>
  );
}
