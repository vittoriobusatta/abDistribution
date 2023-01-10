import React, { useEffect, useRef, useState } from "react";
import fs from "fs";
import path from "path";
import Image from "next/image";
import gsap from "gsap";
import {LogoUltraCompact} from "../../utils/icons";

export async function getStaticProps() {
  const data = fs.readFileSync(path.join(process.cwd(), "/public/db.json"));

  const appData = JSON.parse(data);

  let newArray = Object.entries(appData[0].ambiancemist).map(
    ([key, value]) => value
  );

  return {
    props: {
      newArray,
    },
  };
}

function AmbianceMist({ newArray }) {
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
        "-=0.4"
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
        "-=0.4"
      )
      .to(
        ingredientTitle.current[index],
        {
          yPercent: 0,
          opacity: 1,
          ease: "power4.out",
        },
        "-=0.8"
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
    <section className="container_mist">
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
        <div className="overlay_inner_mist" ref={overlayInner}></div>
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
                  <button className="close_btn_mist" onClick={closePreview}>
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#fff"
                    >
                      <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
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

                <div className="preview_item_information_mist">
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
export default AmbianceMist;
