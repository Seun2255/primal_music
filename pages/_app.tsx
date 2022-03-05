import "../styles/globals.css";
import "react-responsive-modal/styles.css";
import "../styles/react-spinner-loader.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
