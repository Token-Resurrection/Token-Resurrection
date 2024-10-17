import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Zap } from 'lucide-react';

const AboutSection = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const Section = ({ title, content, icon: Icon }) => (
    <motion.div
      className="mb-6 bg-gray-100 rounded-lg overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
        onClick={() => toggleSection(title)}
      >
        <div className="flex items-center">
          <Icon className="mr-3 text-yellow-600" size={24} />
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        {expandedSection === title ? <ArrowDown size={20} /> : <ArrowRight size={20} />}
      </button>
      {expandedSection === title && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-4 bg-white"
        >
          {content}
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="about-section py-40 ">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-8 text-yellow-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {"Token Resurrection: Your Lost Tokens, Recovered"}
        </motion.h2>
        
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-lg text-gray-700">
          {"Ever mistakenly sent your tokens to a black hole contract address, never to see them again? You’re not alone. It’s like watching a ship sail off into the horizon, carrying a part of your hard-earned value. But what if you could bring that ship back?"}
          </p>
        </motion.div>

        <Section
          title="Token Resurrection"
          icon={Zap}
          content={
            <p>
              {"Token Resurrection is here to do just that—turn the tide and recover your lost tokens. Whether it’s 10, 100, or 10,000 tokens, the loss is real, and it hurts. We believe no token should be lost to the void, and no user should be left behind."}
            </p>
          }
        />

        <Section
          title="The Problem: Tokens Lost, Trust Shaken"
          icon={Zap}
          content={
            <p>
              {"When tokens are accidentally sent to contract addresses, they often vanish into the blockchain abyss, beyond reach. Issuers may be hesitant to mint new tokens to cover the loss, but why let these assets remain locked forever? At Token Resurrection, we see a win-win opportunity for both users and issuers to reclaim what's been lost and rebuild trust."}
            </p>
          }
        />

        <Section
          title="Our Innovative Solution: Unlocking Value for All"
          icon={Zap}
          content={
            <>
              <p className="mb-4">
              {"We’ve developed a novel way to bring your tokens back home. For pegged tokens like USDC, backed by reserves held in real-world banks, we’ve introduced two key concepts:"}
              </p>
              <ul className="list-disc list-inside ml-4 mb-4">
                <li><strong>Gross Circulating Supply</strong>{": The total number of USDC tokens floating on the blockchain."}</li>
                <li><strong>Net Circulating Supply</strong>{": Gross Circulating Supply, minus those tokens that are locked away and inaccessible."}</li>
              </ul>
              <p>{"This lets us balance the books and audit things properly, ensuring transparency at every step. Here's the exciting part: through Token Resurrection, users get "}<strong>{"70% of their lost tokens"}</strong>{", issuers reclaim"} <strong>{"20%"}</strong>{", and "}<strong>{"10%"}</strong> {"goes to keep Token Resurrection running and evolving. It’s a system where everyone wins."}</p>
            </>
          }
        />

        <Section
          title="Empowering DAOs to Lead the Way"
          icon={Zap}
          content={
            <p>
              {"Decentralized Autonomous Organizations (DAOs) like"} <strong>Optimism</strong> and <strong>Arbitrum</strong> {"are built to drive community growth and engagement. But what happens when their users accidentally lock tokens in contracts? Tokens are lost, frustration builds, and trust erodes. That’s where Token Resurrection steps in."}<br/><br/>
              {"We believe DAOs have a golden opportunity to step up as community heroes. With the ability to issue a small portion of their total value annually (like 2% of OP or ARB), they can help their users recover lost tokens and win back their loyalty."}
            </p>
          }
        />

        <Section
          title="How the Magic Happens"
          icon={Zap}
          content={
            <>
            <p className='mb-4'>{"Token Resurrection isn’t just about getting back lost tokens—it’s about creating a secure, transparent recovery process that everyone can trust:"}</p>
            <ol className="list-decimal list-inside">
              <li><strong>We Verify</strong>{":  Our system scans and verifies which tokens are locked and unrecoverable."}</li>
              <li><strong>We Prove It</strong>{": Using verifiable cryptographic proofs, like Merkle roots, we create proof of the locked tokens."}</li>
              <li><strong>We Propose</strong>{": We submit recovery proposals to issuers, DAOs, and contract owners."}</li>
              <li><strong>You Recover</strong>{": Once approved, the tokens are distributed—70% to users, 20% to issuers, and 10% to keep the platform alive and thriving."}</li>
            </ol>
            </>
          }
        />

<Section
          title="Why Token Resurrection?"
          icon={Zap}
          content={
            <p>
             {" Think of us as your guide through the blockchain wilderness, helping you retrieve what was once thought lost. By using our platform, you not only get your tokens back, but you also help build a safer, more reliable blockchain ecosystem. It’s about trust, recovery, and a new beginning."}
            </p>
          }
        />

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-yellow-600 mb-4">{"Let’s Bring Your Tokens Home"}</h3>
          <p>{"No one should lose value forever just because of a small mistake. With Token Resurrection, recovery is within reach, and together, we can make the blockchain a safer, more user-friendly space."}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;

