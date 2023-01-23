import "../styles/styles.scss";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router  }) {
  return (
    <>
      <AnimatePresence initial={false} mode={"wait"}>
        
        <Component key={router.pathname} {...pageProps} />
      </AnimatePresence>
    </>
  );
}
