import React, { useEffect, useRef, useState } from "react";
import fs from "fs";
import path from "path";
import Image from "next/image";
import gsap from "gsap";

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const cards = useRef([]);
  const previewItem = useRef([]);
  const imageRef = useRef([]);
  const titleRef = useRef([]);
  const imagePreview = useRef([]);
  const overlayInner = useRef(null);

  const handleMouseEnter = (index) => {
    gsap.to(imageRef.current[index], {
      filter: "brightness(150%)",
      duration: 0.5,
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(imageRef.current[index], {
      filter: "brightness(100%)",
      duration: 0.5,
    });
  };

  useEffect(() => {
    gsap.set(overlayInner.current, {
      xPercent: -100,
    });
    cards.current.forEach((card, index) => {
      card.addEventListener("mouseenter", () => handleMouseEnter(index));
      card.addEventListener("mouseleave", () => handleMouseLeave(index));
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
          setIsAnimating(true);
          gsap.set(titleRef.current, { yPercent: 150, skewY: 10 });
          // gsap.set(previewItem.current, { opacity: 0 });
        },
        onComplete: () => setIsAnimating(false),
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
      .to(imagePreview.current[index], {
        duration: 0.8,
        opacity: 1,
        ease: "power4.out",
      });
  };

  const closePreview = () => {
    gsap
      .timeline({
        defaults: {
          duration: 1,
          ease: "power4",
        },
        onStart: () => {
          setIsAnimating(true);
        },
        onComplete: () => {
          setIsAnimating(false);
          setPreviewIsOpen(false);
        },
      })
      .to(titleRef.current, {
        yPercent: 150,
        duration: 0.8,
        opacity: 1,
        ease: "power4.out",
      })
      .to(
        previewItem.current,
        {
          opacity: 0,
        },
        "-=0.4"
      )
      .to(
        imagePreview.current,
        {
          opacity: 0,
          ease: "power4.out",
        },

        "-=0.4"
      )
      .to(
        overlayInner.current,
        {
          xPercent: -100,
          ease: "power2",
        },
        "-=0.6"
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
                <div className="hidden preview_item_title">
                  <h1 ref={(el) => (titleRef.current[index] = el)}>
                    {item.name}
                  </h1>
                </div>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  ref={(el) => (imagePreview.current[index] = el)}
                />
                <button className="close_btn" onClick={closePreview}>
                  Close
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default BodyMist;
