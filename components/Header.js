import Link from "next/link";
import React from "react";
import { AbLogo } from "../utils/icons";

function Header({logocolor1 , logocolor2, backgroundColor}) {
  return (
    <header style={{background : backgroundColor}}>
      <Link aria-label="Retourner à l'accueil" href="/">
        <AbLogo color1={logocolor1} color2={logocolor2} />
      </Link>
      <button
          aria-label="menu"
          className={`burger`}
        >
          <div style={{background : logocolor1}} className="bar"></div>
          <div style={{background : logocolor1}} className="bar"></div>
        </button>
    </header>
  );
}

export default Header;
