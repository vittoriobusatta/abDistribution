import Link from "next/link";
import { useEffect, useCallback, useState, useRef } from "react";
import { AbLogo } from "../utils/icons";
import Menu from "./Menu";

function Header({ logocolor1, logocolor2, color1, color2, backgroundColor }) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuContainer = useRef(null);

  const ClickMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, [setOpenMenu]);

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openMenu]);


  return (
    <>
      <header style={{ background: backgroundColor }}>
        <Link aria-label="Retourner à l'accueil" href="/">
          <AbLogo
            color1={logocolor1}
            color2={logocolor2}
            onClick={handleCloseMenu}
          />
        </Link>
        <button aria-label="menu" className={`burger`} onClick={ClickMenu}>
          <div style={{ background: logocolor1 }} className="bar"></div>
          <div style={{ background: logocolor1 }} className="bar"></div>
        </button>
      </header>
        <Menu
          setOpenMenu={setOpenMenu}
          openMenu={openMenu}
          color2={color2}
          color1={color1}
          backgroundColor={backgroundColor}
          menuContainer={menuContainer}
        />
    </>
  );
}

export default Header;
