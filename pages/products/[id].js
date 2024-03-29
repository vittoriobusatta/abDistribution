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
import { easeOut, motion } from "framer-motion";

export default function Product({ product }) {
  let newArray = Object.values(product.products);

  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const animatedStatus = useRef([]);

  const previewItem = useRef([]);
  const imageRef = useRef([]);
  const imagePreview = useRef([]);

  const productTitle = useRef([]);
  const descriptionTitle = useRef([]);
  const descriptionParagraph = useRef([]);
  const ingredientTitle = useRef([]);
  const ingredientParagraph = useRef([]);

  const overlayInner = useRef([]);

  const openPreview = (index) => {
    setPreviewIsOpen(true);
    gsap
      .timeline({
        defaults: {
          duration: 0.8,
          ease: "expo",
        },
        onStart: () => {
          gsap.set(productTitle.current, { yPercent: 150, skewY: 10 });
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
        x: 0,
        duration: 1.6,
      })
      .to(
        previewItem.current[index],
        {
          x: 0,
          opacity: 1,
        },
        "-=0.8"
      )
      .to(
        productTitle.current[index],
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
        productTitle.current,
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
          x: "-100%",
          ease: "power2",
        },
        "-=0.8"
      );
  };

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

  let landingInfo = [
    {
      category: {
        id: 1,
        title: "Catégorie",
        paragraph: product.category,
      },
    },
    {
      brand: {
        id: 2,
        title: "Marque",
        paragraph: product.brand,
      },
    },
    {
      origine: {
        id: 3,
        title: "Origine",
        paragraph: product.origine,
      },
    },
  ];

  let landingdata = landingInfo.map((item) => {
    const key = Object.keys(item)[0];
    return {
      id: item[key].id,
      title: item[key].title,
      paragraph: item[key].paragraph,
    };
  });

  useEffect(() => {
    gsap.set(imageRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      opacity: 0,
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = imageRef.current.indexOf(entry.target);
        if (entry.isIntersecting && !animatedStatus.current[index]) {
          animatedStatus.current[index] = true;

          gsap.to(entry.target, {
            delay: 0.3,
            y: 0,
            opacity: 1,
            ease: "power4.out",
            duration: 1.4,
            clipPath: "polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)",
          });
          observer.unobserve(entry.target);
        }
      });
    });
    imageRef.current.forEach((ref) => {
      observer.observe(ref);
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>{product.name} | AB Distribution</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        onAnimationComplete={() => setAnimating(true)}
        className="container"
        style={{ backgroundColor: product.background }}
      >
        <Header
          logocolor1={product.logocolor1}
          logocolor2={product.logocolor2}
          color2={product.color2}
          color1={product.color1}
          backgroundColor={product.background}
        />

        <div className="landing">
          <div className="landing_inner">
            <div className="hidden">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: "100%",
                  skewY: 10,
                }}
                animate={
                  animating
                    ? {
                        opacity: 1,
                        y: 0,
                        skewY: 0,

                        transition: {
                          duration: 0.35,
                          ease: "easeOut",
                        },

                        exit: {
                          opacity: 0,
                          y: "100%",
                        },

                        onAnimationComplete: () => setAnimating(false),
                      }
                    : {
                        opacity: 0,
                        y: "100%",
                        skewY: 10,
                      }
                }
                style={{ color: product.color1 }}
              >
                {product.name}
              </motion.h1>
            </div>
            <ul className="landing_content">
              {landingdata.map((item, index) => {
                return (
                  <li key={item.id} className="landing_informations">
                    <div className="hidden">
                      <motion.h3
                        initial={{
                          opacity: 0,
                          y: "100%",
                        }}
                        animate={
                          animating
                            ? {
                                opacity: 1,
                                y: 0,

                                transition: {
                                  duration: 0.45,
                                  ease: [0, 0.87, 0.58, 1],
                                  delay: 0.4 * (index + 1),
                                },

                                onAnimationComplete: () => setAnimating(false),
                              }
                            : {
                                opacity: 0,
                                y: "100%",
                              }
                        }
                        style={{ color: product.landingcolor1 }}
                      >
                        {item.title}
                      </motion.h3>
                    </div>
                    <div className="hidden">
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: "100%",
                        }}
                        animate={
                          animating
                            ? {
                                opacity: 1,
                                y: 0,

                                transition: {
                                  duration: 0.45,
                                  ease: easeOut,
                                  delay: 0.5 * (index + 1),
                                },

                                onAnimationComplete: () => setAnimating(false),
                              }
                            : {
                                opacity: 0,
                                y: "100%",
                              }
                        }
                        style={{ color: product.landingcolor2 }}
                      >
                        {item.paragraph}
                      </motion.p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="details">
          <div className="details_content">
            <motion.h2
              initial={{
                opacity: 0,
                y: "100%",
                skewY: 10,
              }}
              animate={
                animating
                  ? {
                      opacity: 1,
                      y: 0,
                      skewY: 0,

                      transition: {
                        duration: 0.35,
                        ease: "easeOut",
                        delay: 0.5,
                      },

                      exit: {
                        opacity: 0,
                        y: "100%",
                      },
                    }
                  : {
                      opacity: 0,
                      y: "100%",
                      skewY: 10,
                    }
              }
              style={{ color: product.color1 }}
            >
              <span>Nos</span>
              <span>Produits</span>
            </motion.h2>
            <motion.p
              initial={{
                opacity: 0,
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              animate={
                animating
                  ? {
                      opacity: 1,
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",

                      transition: {
                        duration: 0.35,
                        ease: "easeOut",
                        delay: 0.7,
                      },

                      exit: {
                        opacity: 0,
                        y: "100%",
                      },
                    }
                  : {
                      opacity: 0,
                      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                    }
              }
              style={{ color: product.color1 }}
            >
              {product.description}
            </motion.p>
          </div>
        </div>

        <div className="product">
          {newArray.map((item, index) => {
            return (
              <div className="product__item" key={item.id}>
                <div
                className="product__container"
                onClick={() => openPreview(index)}
              >
                <div className="product__content">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    ref={(el) => (imageRef.current[index] = el)}
                    priority
                    as="image"
                    className="product__image"
                  />
                </div>
                <div className="product__details">
                  <h3 style={{ color: product.color1, opacity: 0.6 }}>
                    {landingdata[0].paragraph}
                  </h3>
                  <h2 style={{ color: product.color1 }}>{item.title}</h2>
                  <div className="product__details__viewmore hidden">
                    <p style={{ color: product.color1 }}>Voir le produit</p>
                  </div>
                </div>
              </div>
              </div>
              
            );
          })}
        </div>

        <div className="overlay">
          {newArray.map((item, index) => {
            return (
              <div
                key={item.id}
                className="overlay__inner"
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
                    ? "preview__item preview__item--active " + item.name
                    : "preview__item " + item.name
                }
                key={item.id}
                ref={(el) => (previewItem.current[index] = el)}
              >
                <div className="preview__content">
                  <div className="preview__head">
                    <button className="preview__head__close" onClick={closePreview}>
                      <ArrowBack color={item.color2} />
                    </button>
                    <Logo color1={item.color1} color2={item.color2} />
                  </div>
                  <div className="preview__product">
                    <div className="preview__product__title hidden">
                      <h1
                        style={{
                          // background: item.gradient,
                          // backgroundClip: "text",
                          // WebkitBackgroundClip: "text",
                          // color: "transparent",
                          color: item.color1,
                        }}
                        ref={(el) => (productTitle.current[index] = el)}
                      >
                        {item.name}
                      </h1>
                    </div>
                    <div className="hidden">
                      <Image
                      className="preview__product__image"
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        ref={(el) => (imagePreview.current[index] = el)}
                        rel="preload"
                        as="image"
                      />
                    </div>
                  </div>

                  <div className="preview__product__information">
                    <div className="preview__product__description">
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
                    <div className="preview__product__ingredient">
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
      </motion.section>
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
