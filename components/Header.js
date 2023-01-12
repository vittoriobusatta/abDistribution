import Link from "next/link";
import React from "react";
import { AbLogo } from "../utils/icons";

function Header({color1 , color2, backgroundColor}) {
  return (
    <header style={{background : backgroundColor}}>
      <Link aria-label="Retourner à l'accueil" href="/">
        <AbLogo color1={color1} color2={color2} />
      </Link>
      <button
          aria-label="menu"
          className={`burger`}
        >
          <div style={{background : color1}} className="bar"></div>
          <div style={{background : color1}} className="bar"></div>
        </button>
    </header>
  );
}

export default Header;
