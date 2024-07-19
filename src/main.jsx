import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { ContextoProvider } from "./context/Contexto.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextoProvider>
  </React.StrictMode>
);
