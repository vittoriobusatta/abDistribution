import React, { useEffect, useRef, useState } from "react";
import fs from "fs";
import path from "path";
import Image from "next/image";
import gsap from "gsap";
import LogoUltraCompact from "../../utils/icons";

export async function getStaticProps() {
  const data = fs.readFileSync(path.join(process.cwd(), "/public/db.json"));

  const appData = JSON.parse(data);

  let newArray = Object.entries(appData[0].bodymist).map(
    ([key, value]) => value
  );

  return {
    props: {
      newArray,
    },
  };
}

function BodyMist({ newArray }) {
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const cards = useRef([]);
  const previewItem = useRef([]);
  const imageRef = useRef([]);
  const titleRef = useRef([]);
  const imagePreview = useRef([]);

  const descriptionTitle = useRef([]);
  const descriptionParagraph = useRef([]);
  const ingredientTitle = useRef([]);
  const ingredientParagraph = useRef([]);

  const overlayInner = useRef(null);

  useEffect(() => {
    gsap.set(overlayInner.current, {
      xPercent: -100,
    });
  }, []);

  const openPreview = (index) => {
    setPreviewIsOpen(true);
    gsap
      .timeline({
        defaults: {
          duration: 1.1,
          ease: "expo",
        },
        onStart: () => {
          gsap.set(titleRef.current, { yPercent: 150, skewY: 10 });
          gsap.set(imagePreview.current[index], { xPercent: 10 });
          gsap.set(descriptionTitle.current[index], { yPercent: 100 });
          gsap.set(ingredientTitle.current[index], { yPercent: 100 });
          gsap.set(descriptionParagraph.current[index], {
            yPercent: 10,
            skewY: 2,
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          });
          gsap.set(ingredientParagraph.current[index], {
            yPercent: 10,
            skewY: 2,
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          });
        },
      })
      .to(overlayInner.current, {
        xPercent: 0,
        duration: 2,
      })
      .to(
        previewItem.current[index],
        {
          xPercent: 0,
          opacity: 1,
        },
        "-=0.8"
      )
      .to(
        titleRef.current[index],
        {
          yPercent: 0,
          duration: 0.8,
          opacity: 1,
          skewY: 0,
          ease: "power4.out",
        },
        "-=0.4"
      )
      .to(
        descriptionTitle.current[index],
        {
          yPercent: 0,
          opacity: 1,
          ease: "power4.out",
        },
        "-=0.6"
      )
      .to(
        descriptionParagraph.current[index],
        {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.out",
        },
        "-=0.8"
      )
      .to(
        ingredientTitle.current[index],
        {
          yPercent: 0,
          opacity: 1,
          ease: "power4.out",
        },
        "-=0.6"
      )
      .to(
        ingredientParagraph.current[index],
        {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.out",
        },
        "-=0.8"
      )
      .to(
        imagePreview.current[index],
        {
          duration: 0.4,
          xPercent: 0,
          opacity: 1,
          ease: "ease",
        },
        "-=0.8"
      );
  };

  const closePreview = () => {
    gsap
      .timeline({
        defaults: {
          duration: 1,
          ease: "power4",
        },
        onComplete: () => {
          setPreviewIsOpen(false);
        },
      })
      .to(imagePreview.current, {
        opacity: 0,
        ease: "power4.out",
        duration: 1.4,
      })
      .to(
        titleRef.current,
        {
          yPercent: 150,
          duration: 1.4,
          opacity: 1,
          skewY: 10,
          ease: "power4.out",
        },
        "-=0.8"
      )
      .to(
        previewItem.current,
        {
          opacity: 0,
        },
        "-=0.8"
      )
      .to(
        overlayInner.current,
        {
          xPercent: -100,
          ease: "power2",
        },
        "-=0.8"
      );
  };

  return (
    <section className="container">
      <div className="card_container">
        {newArray.map((item, index) => {
          return (
            <div
              className={"card " + item.name}
              key={item.id}
              ref={(el) => (cards.current[index] = el)}
              style={{ background: item.background }}
              onClick={() => openPreview(index)}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                ref={(el) => (imageRef.current[index] = el)}
                priority
                as="image"
              />
            </div>
          );
        })}
      </div>

      <div className="content_overlay">
        <div className="overlay_inner" ref={overlayInner}></div>
      </div>
      <div className="preview">
        {newArray.map((item, index) => {
          return (
            <div
              className={
                previewIsOpen
                  ? "preview_item active " + item.name
                  : "preview_item " + item.name
              }
              key={item.id}
              ref={(el) => (previewItem.current[index] = el)}
            >
              <div className="preview_item_content">
                <div className="preview_item_head">
                  <button className="close_btn" onClick={closePreview}>
                    <svg
                      height="20"
                      viewBox="0 0 68 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.4823 40.604C28.654 40.4001 28.7372 40.136 28.7133 39.8705C28.6895 39.605 28.5606 39.36 28.3553 39.1899L10.4202 24.3333H66C66.5523 24.3333 67 23.8856 67 23.3333V20.6667C67 20.1144 66.5523 19.6667 66 19.6667H10.4177L28.3579 4.80747C28.5634 4.63726 28.6923 4.39196 28.716 4.12617C28.7398 3.86038 28.6562 3.59614 28.4841 3.39224L26.7641 1.35491C26.4098 0.935226 25.7833 0.879859 25.3609 1.2309L1.36088 21.1749C1.13262 21.3646 1.00041 21.6458 1 21.9426C0.999592 22.2394 1.13103 22.521 1.35876 22.7113L25.3588 42.7673C25.7815 43.1206 26.4102 43.0654 26.765 42.644L28.4823 40.604Z"
                        fill={item.color}
                        stroke={item.color}
                        stroke-width="1"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>Retour</span>
                  </button>
                  <LogoUltraCompact color={item.color} />
                </div>
                <div className="preview_item_product">
                  <div className="hidden preview_item_title">
                    <h1
                      style={{
                        background: item.background,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                      ref={(el) => (titleRef.current[index] = el)}
                    >
                      {item.name}
                    </h1>
                  </div>
                  <div className="hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      ref={(el) => (imagePreview.current[index] = el)}
                      priority
                      as="image"
                    />
                  </div>
                </div>

                <div className="preview_item_information">
                  <div className="preview_item_description">
                    <div className="hidden">
                      <h2
                        ref={(el) => (descriptionTitle.current[index] = el)}
                        style={{ color: item.secondarycolor }}
                      >
                        Description
                      </h2>
                    </div>
                    <p ref={(el) => (descriptionParagraph.current[index] = el)}>
                      {item.description}
                    </p>
                  </div>
                  <div className="preview_item_ingredient">
                    <div className="hidden">
                      <h2
                        ref={(el) => (ingredientTitle.current[index] = el)}
                        style={{ color: item.color }}
                      >
                        Ingrédients
                      </h2>
                    </div>
                    <p ref={(el) => (ingredientParagraph.current[index] = el)}>
                      {item.ingredient}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default BodyMist;
