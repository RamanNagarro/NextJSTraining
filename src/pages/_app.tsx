import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SWRProvider from "@/components/swr-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRProvider>
      <Component {...pageProps} />
    </SWRProvider>
  );
}
