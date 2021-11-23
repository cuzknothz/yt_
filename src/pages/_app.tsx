import { Layout } from "@/layouts/Layout";
import { persistor, store } from "@/store";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
