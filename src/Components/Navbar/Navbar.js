import React from "react";

import logo from '../../Assets/logo.png';
import Image from "next/image";

function Navbar() {
  return (
    <div className="p-4">
      <div className="container mx-auto relative">
        <div className="absolute logo-container">
          <Image src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="flex justify-between items-center">
          {/* Other Navbar content */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
