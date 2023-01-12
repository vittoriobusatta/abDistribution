import Head from "next/head";
import Link from "next/link";

export default function Home(
  
) {
  return (
    <>
      <Head>
        <title>Accueil | Ab Distribution</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/perfume">
          <h1>Brumes Corporelles</h1>
        </Link>
        <Link href="/mist">
          <h1>Brumes Ambiance</h1>
        </Link>
        <Link href="/airfreshener">
          <h1>Désodorisants</h1>
        </Link>
        <Link href="/coffee">
          <h1>Cafés</h1>
        </Link>
        <Link href="/handwash">
          <h1>Laves Main</h1>
        </Link>
      </main>
    </>
  );
}
