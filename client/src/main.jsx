import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext.jsx";
import { ModeProvider } from "./context/ModeContext.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ModeProvider>
        <Toaster />
        <App />
      </ModeProvider>
    </UserProvider>
  </StrictMode>
);
