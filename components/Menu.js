import gsap from "gsap";
// import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function Menu({ color1, color2, backgroundColor, setOpenMenu, menuContainer }) {
  const [changeMenu, setChangeMenu] = useState(false);
  const menuHidden = useRef([]);

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
      name: "Hygiène",
      id: 1,
      pages: {
        airfreshener: {
          title: "Désodorisant",
          path: "5",
        },
        handwash: {
          title: "Lave-Mains",
          path: "6",
        },
        antibacterial: {
          title: "Anti-Bactérien",
          path: "7",
        },
        antibacterial: {
          title: "Anti-Bactérien",
          path: "8",
        },
      },
    },
    {
      name: "Brumes",
      id: 2,
      pages: {
        ambiancemist: {
          title: "Brume Corporelle",
          path: "3",
        },
        bodymist: {
          title: "Brume d'Ambiance",
          path: "4",
        },
      },
    },
    {
      name: "Alimentation",
      id: 3,
      pages: {
        coffee: {
          title: "Cafés",
          path: "1",
        },
        grocery: {
          title: "Épicerie",
          path: "2",
        },
      },
    },
  ];

  const ChangeMenuHandler = (index) => {
    setChangeMenu(true);
    const tl = gsap.timeline();
    gsap.set(menuHidden.current[index], { x: 320 });
    tl.to(menuHidden.current[index], {
      x: 0,
      ease: "power3.inOut",
    });
  };

  const BackOldMenu = () => {
    setChangeMenu(false);
    const tl = gsap.timeline();
    tl.to(menuHidden.current, {
      x: 320,
      ease: "power3.inOut",
    });
  };

  return (
    <section
      style={{ background: color1 }}
      ref={menuContainer}
      className="menu"
    >
      <nav className="menu_container">
        <div className="menu_inner">
          <div className="menu_head">
            <button
              aria-label="menu"
              className={`burger active`}
              onClick={Close}
            >
              <div style={{ background: color2 }} className="bar"></div>
              <div style={{ background: color2 }} className="bar"></div>
            </button>
          </div>
          <ul className="menu_list" style={{ color: color2 }}>
            <li className="menu_item">Accueil</li>
            <li className="menu_item">Categories</li>
            <ul className="menu_sublist" style={{ color: backgroundColor }}>
              {menuArray.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    className="menu_subitem"
                    onClick={() => ChangeMenuHandler(index)}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
            <li className="menu_item">Contact</li>
          </ul>
        </div>
        {menuArray.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{ backgroundColor: color1 }}
              className={changeMenu ? "menu_hidden active" : "menu_hidden"}
              ref={(el) => (menuHidden.current[index] = el)}
            >
              <h2 onClick={BackOldMenu}>
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
                    stroke-width="0.5"
                    stroke-linejoin="round"
                  />
                </svg>
                <span style={{ color: backgroundColor }}>Retour</span>
              </h2>
              <h1
                style={{
                  color: color2,
                }}
              >
                {item.name}
              </h1>
              <ul className="menu_hidden_list">
                {item &&
                  item.pages &&
                  Object.keys(item.pages).map((page, index) => {
                    return (
                      <li key={index} 
                      style={{ color: backgroundColor }}
                      className="menu_hidden_item">
                        {/* <Link
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          style={{
                            color: backgroundColor,
                            opacity: 0.9,
                          }}
                          href={`/products/${item.pages[page].path}`}
                        > */}
                        {item.pages[page].title}
                        {/* </Link> */}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </nav>
    </section>
  );
}

export default Menu;
