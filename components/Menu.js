import gsap from "gsap";
import React, { useEffect } from "react";

function Menu({ color1, color2, backgroundColor, setOpenMenu, menuContainer, openMenu }) {
  const Close = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuContainer.current && !menuContainer.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuContainer, setOpenMenu]);

  useEffect(() => {
    let tl = gsap.timeline();
    gsap.set(menuContainer.current, { width: "0%" });
    tl.to(menuContainer.current, {
      duration: 0.5,
      width: 320,
      ease: "power3.inOut",
    });
    return () => {
      tl.kill();
    };
  }, [menuContainer]);

  const menuArray = [
    {
      name: "Soins",
      id: 1,
    },
    {
      name: "Hygiène",
      id: 2,
    },
    {
      name: "Brumes",
      id: 3,
      pages: {
        title1: "Brume d'Ambiance",
        title2: "Brume Corporelle",
      },
    },
    {
      name: "Alimentation",
      id: 4,
    },
  ];

  return (
    <section
      style={{ background: color1 }}
      ref={menuContainer}
      className="menu"
    >
      <nav className="menu_container">
        <div className="menu_head">
          <button aria-label="menu" className={`burger active`} onClick={Close}>
            <div style={{ background: color2 }} className="bar"></div>
            <div style={{ background: color2 }} className="bar"></div>
          </button>
        </div>
        <ul className="menu_list" style={{ color: color2 }}>
          <li className="menu_item">Accueil</li>
          <li className="menu_item">Categories</li>
          <ul className="menu_sublist" style={{ color: backgroundColor }}>
            {menuArray.map((item) => {
              return (
                <li className="menu_subitem" key={item.id}>
                  <p>{item.name}</p>
                  <svg
                    width="6"
                    height="9"
                    viewBox="0 0 6 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.791344 1.09303C0.724782 1.19389 0.739888 1.32792 0.827228 1.41143L4.23153 4.6665L0.827437 7.91384C0.74047 7.99681 0.724848 8.12991 0.790243 8.23076L0.944992 8.4694C0.98548 8.53183 1.05168 8.57299 1.12558 8.58167C1.19949 8.59035 1.27342 8.56566 1.32728 8.5143L5.17252 4.84764C5.22201 4.80045 5.25001 4.73505 5.25 4.66667C5.24999 4.59829 5.22197 4.5329 5.17247 4.48572L1.32472 0.819057C1.27111 0.767974 1.19762 0.743283 1.12404 0.751637C1.05047 0.759992 0.984382 0.800533 0.943594 0.862335L0.791344 1.09303Z"
                      fill="#FFEEFA"
                      stroke="#FFEEFA"
                      strokeWidth="0.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
              );
            })}
          </ul>
          <li className="menu_item">Contact</li>
        </ul>
      </nav>
    </section>
  );
}

export default Menu;
