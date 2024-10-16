import React from "react";
// Make sure to import the CSS file

const AboutSection = () => {
  return (
    <div className="about-section">
      <div
        style={{ marginTop: "100px" }}
        className="about border-2 border-yellow-300 mx-auto flex text-2xl  relative "
      >
        {/* Content section */}
        <div className="relative z-10 rounded-xl">
          <div className="text-4xl  font-bold aboutheading">About</div>
          <p className="  p-10">
            Its painful when you transfer your tokens to a contract address and
            lose them forever. A small amount like 10,000 tokens may seem
            insignificant to some, but for the user who has lost them, it
            represents a significant value and causes great distress.{" "}
            <span className="hover-effect content">Token Resurrection</span> is
            a platform designed to help users recover their lost tokens by
            providing a comprehensive recovery solution.
            <br />
            <br />
            When tokens are mistakenly sent to the wrong contract address and
            become irrecoverable, issuers might seem reluctant to mint new
            tokens to compensate the users. However, there are compelling
            reasons for issuers to participate.{" "}
            <span className="hover-effect content">
              Pegged tokens like USDC
            </span>
            , which have an audited market supply against reserves held in
            banks, our proposed solution introduces a concept of Gross
            Circulating Supply (total supply of USDC on blockchain) and{" "}
            <span className="hover-effect content">Net Circulating Supply</span>{" "}
            (Gross Circulating Supply - Tokens Locked). This method allows
            proper auditing and ensures transparency. Users receive 70% of their
            locked tokens back, while issuers get 20%, and 10% goes to Token
            Resurrection. The 20% received by issuers can now be used, adding
            value they would otherwise not be able to access.
            <br />
            <br />
            <span className="hover-effect content">
              DAOs like Optimism and Arbitrum
            </span>{" "}
            aim to foster community growth and user engagement by providing
            grants and support. If users mistakenly transfer tokens to contract
            addresses and lock them permanently, DAOs can step in to help. DAOs
            have the authority to issue a certain percentage of their total
            value annually (e.g., 2% per annum for OP and ARB). By aiding users
            in recovering lost tokens, DAOs can{" "}
            <span className="hover-effect content">
              increase trust and loyalty
            </span>{" "}
            within their communities, encouraging more active participation on
            their platforms. Token Resurrection facilitates these recovery
            processes, verifying locked tokens, generating proof, creating a
            Merkle root for beneficiaries to attest using the{" "}
            <span className="hover-effect content">
              Ethereum Attestation Service (EAS)
            </span>
            , and submitting recovery proposals to issuers or contract owners.
            Upon approval, tokens are disbursed according to the agreed-upon
            percentages, making the recovery process efficient and beneficial
            for all parties involved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
