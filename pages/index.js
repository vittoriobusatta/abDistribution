import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Header from "../components/Header";
import Image from "next/image";
import Footer from "../components/Footer";

export async function getStaticProps() {
  const data = fs.readFileSync(path.join(process.cwd(), "/public/db.json"));

  const appData = JSON.parse(data);

  let newArray = Object.entries(appData[0]).map(([key, value]) => value);

  return {
    props: {
      newArray,
    },
  };
}

export default function Home({ newArray }) {
  console.log(" Designed and built by Vittorio - 2023 ");

  return (
    <>
      <Head>
        <title>Accueil | AB Distribution</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header logocolor1="#000" logocolor2="#000" />

      <main className="category">
        <h1 className="category__title">Catalogue</h1>
        <ul className="category__list">
          {newArray.map((item) => (
            <li
              style={{
                backgroundColor: item.color1,
              }}
              key={item.id}
              className="category__items"
            >
              <Link
                href={`/products/${item.id}`}
              >
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
