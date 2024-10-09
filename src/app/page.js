import Section1 from "@/Components/Homepagesections/section1";
import Navbar from "@/Components/Navbar/Navbar";
import Image from "next/image";

export const metadata = {
  title: "Token Resurrection",
  description: "Join Token Resurrection to Approve, Claim, and Unlock the Value of Locked Tokens",
};

export default function Home() {
  return (
    <div >
     <Section1/>
    </div>
  );
}
