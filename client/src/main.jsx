import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";
import Send from "./pages/send";
import Stake from "./pages/stake";
import Investments from "./pages/investments";
import Create from "./pages/create";
import About from "./pages/about";

ReactDOM.render(
  <React.StrictMode>
  <MoralisProvider
    serverUrl="https://hpz4yq50hr8y.usemoralis.com:2053/server"
    appId="FaLY0U96izeaTHPkmvxHUq87YIejSYU0KMBiHS5M"
  >
  <BrowserRouter>

    <TransactionsProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="send" element={<Send />} />
        <Route path="stake" element={<Stake />} />
        <Route path="investments" element={<Investments />} />
        <Route path="about" element={<About />} />
        <Route path="create" element={<Create />} />
      </Routes>
    </TransactionsProvider>

  </BrowserRouter>,
  </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
