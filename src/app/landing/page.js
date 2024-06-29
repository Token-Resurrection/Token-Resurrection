"use client";
import { useEffect, useState } from 'react';
import formstyle from '../../Components/SubmitDao/stepfrom.module.css';

import image2 from '../../Assets/img2.png';
import image3 from '../../Assets/img3.png';
import Image from 'next/image';
import  About from "@/Components/Check/about"

export default function Home() {
  const [proposalCount, setProposalCount] = useState(0);
  const [claimCount, setClaimCount] = useState(0);

  useEffect(() => {
    let startProposal = 0;
    const endProposal = 15;
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
    const endClaim = 30;
    const durationClaim = 1500;
    const stepTimeClaim = Math.abs(Math.floor(durationClaim / endClaim));
    const timerClaim = setInterval(() => {
      startClaim += 1;
      setClaimCount(startClaim);
      if (startClaim === endClaim) clearInterval(timerClaim);
    }, stepTimeClaim);
  }, []);

  return (
    <div className="min-h-screen relative ">
      <div className="image-container">

        <Image src={image2} alt="Random 2" className="image-2 rounded-3xl" />
        <Image src={image3} alt="Random 3" className="image-3 rounded-3xl" />
      </div>

      <div className="w-full p-12  mt-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-center">Join<span className="text-violet-400 text-4xl"> Token Resurrection</span>  to Approve,</h1> <h1 className="text-3xl font-bold  text-center "> Claim, and Unlock the Value of Locked Tokens</h1>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className={`${formstyle.buttonin1step} button`}>Button 1</button>
          <button className={`${formstyle.buttonin1step} button`}>Button 2</button>
          <button className={`${formstyle.buttonin1step} button`}>Button 3</button>
        </div>
      </div>

      

      <div className={`w-full ${formstyle.info}`}>
       <About/>
      </div>
    </div>
  );
}
