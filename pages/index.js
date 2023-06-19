import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Image from "next/image";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((resdata) => setData(resdata))
      .catch((err) => setErreur(err.message));
  }, []);

  return (
    <>
      <Head>
        <title>Accueil | AB Distribution</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header logocolor="#F35029" />

      <main className="category">
        <div
          className="landing"
          style={{
            "--color-primary": "#F35029",
            "--color-secondary": "#FAF7EE",
          }}
        >
          <div className="landing_inner">
            <h3>Explorez notre catalogue comprenant</h3>
            <h1>
              Une variété de produits <span>exceptionnels.</span>
            </h1>
          </div>
        </div>
        <ul className="category__list">
          {data.map((item) => (
            <li
              style={{
                backgroundColor: item.color1,
              }}
              key={item.id}
              className="category__items"
            >
              <Link href={`/products/${item.path}`}>
                <h1
                  style={{
                    color: item.color2,
                  }}
                >
                  {item.name}
                </h1>
                <Image
                  className="category__items__img"
                  src={item.preview}
                  alt={item.name}
                  width={100}
                  height={150}
                  priority
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
