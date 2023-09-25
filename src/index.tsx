import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "~/redux/index.ts";

import App from "./App.tsx";
import CustomConfigProvider from "~/components/CustomConfigProvider/CustomConfigProvider.tsx";

import "normalize.css";
import "~/styles/index.scss";
import "~/assets/font/iconfont.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={Store}>
    {/* <React.StrictMode> */}
    <CustomConfigProvider>
      <App />
    </CustomConfigProvider>
    {/* </React.StrictMode> */}
  </Provider>
);
