import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.tsx";

import "./services/authInterceptor.ts"

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
);
