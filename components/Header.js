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

  const [scrollTop, setScrollTop] = useState(0);
  const navBar = useRef(null);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset;
      if (currentPosition > scrollTop) {
        navBar.current.style.top = "-100px";
      } else {
        navBar.current.style.top = "0";
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <>
      <header ref={navBar} style={{ background: backgroundColor }}>
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
