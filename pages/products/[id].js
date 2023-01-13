import Head from "next/head";
import fs from "fs";
import path from "path";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  ArrowBack,
  LogoTukas,
  LogoUltraCompact,
  LogoNescafe,
} from "../../utils/icons";
import Header from "../../components/Header";
import { useRouter } from "next/router";

export default function Product({ product }) {
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

  const overlayInner = useRef([]);

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
          duration: 0.8,
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
      .to(overlayInner.current[index], {
        xPercent: 0,
        duration: 1.6,
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
          duration: 1,
          xPercent: 0,
          opacity: 1,
          ease: "power4",
        },
        "-=0.9"
      );
  };

  const closePreview = () => {
    gsap
      .timeline({
        defaults: {
          duration: 0.6,
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

  let newArray = Object.values(product.products);

  const Logo = ({ color1, color2 }) => {
    const router = useRouter();
    let path = router.asPath;
    if (path === "/products/1") {
      return <LogoNescafe color1={color1} color2={color2} />;
    } else if (path === "/products/2") {
      return <LogoTukas color1={color1} />;
    } else {
      return <LogoUltraCompact color={color1} />;
    }
  };

  return (
    <>
      <Head>
        <title>{product.name} | Ab Distribution</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        className="container"
        style={{ backgroundColor: product.background }}
      >
        <Header
          color1={product.color1}
          color2={product.color1}
          backgroundColor={product.background}
        />

        <div className="landing">
          <div className="landing_inner">
            <h1 style={{ color: product.color1 }}>{product.name}</h1>
            <div className="landing_content">
              <div className="landing_informations">
                <h3 style={{ color: product.color1 }}>Catégorie</h3>
                <p style={{ color: product.color1 }}>{product.category}</p>
              </div>
              <div className="landing_informations">
                <h3 style={{ color: product.color1 }}>Origine</h3>
                <p style={{ color: product.color1 }}>{product.origine}</p>
              </div>
              <div className="landing_informations">
                <h3 style={{ color: product.color1 }}>Marque</h3>
                <p style={{ color: product.color1 }}>{product.brand}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card_container">
          {newArray.map((item, index) => {
            return (
              <div className="card_content" key={item.id}>
                <div
                  className={"card " + item.name}
                  ref={(el) => (cards.current[index] = el)}
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
              </div>
            );
          })}
        </div>

        <div className="content_overlay">
          {newArray.map((item, index) => {
            return (
              <div
                key={item.id}
                className="overlay_inner"
                style={{ background: item.background }}
                ref={(el) => (overlayInner.current[index] = el)}
              ></div>
            );
          })}
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
                      <ArrowBack color={item.color2} />
                    </button>
                    <Logo color1={item.color1} color2={item.color2} />
                  </div>
                  <div className="preview_item_product">
                    <div className="hidden preview_item_title">
                      <h1
                        style={{
                          background: item.gradient,
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
                          style={{ color: item.color1 }}
                        >
                          Description
                        </h2>
                      </div>
                      <p
                        ref={(el) => (descriptionParagraph.current[index] = el)}
                      >
                        {item.description}
                      </p>
                    </div>
                    <div className="preview_item_ingredient">
                      <div className="hidden">
                        <h2
                          ref={(el) => (ingredientTitle.current[index] = el)}
                          style={{ color: item.color2 }}
                        >
                          Ingrédients
                        </h2>
                      </div>
                      <p
                        ref={(el) => (ingredientParagraph.current[index] = el)}
                      >
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
    </>
  );
}

export async function getStaticProps({ params }) {
  const data = await fs.promises.readFile(
    path.join(process.cwd(), "/public/db.json")
  );
  const appData = JSON.parse(data);
  let productsData = Object.entries(appData[0]).map(([key, value]) => value);
  const product = productsData.find((item) => item.id === params.id);

  return {
    props: {
      productsData,
      product,
    },
  };
}

export async function getStaticPaths() {
  const data = await fs.promises.readFile(
    path.join(process.cwd(), "/public/db.json")
  );
  const appData = JSON.parse(data);
  let productsData = Object.entries(appData[0]).map(([key, value]) => value);

  return {
    paths: productsData.map((item) => ({
      params: { id: item.id.toString() },
    })),
    fallback: false,
  };
}
