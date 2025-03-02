import { createContext, useState, useEffect } from "react";

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for the initial value
    const storedMode = localStorage.getItem("dailyDarkMode");
    return storedMode ? JSON.parse(storedMode) : false; // Default is dark mode
  });

  useEffect(() => {
    // Update `localStorage` and `document` class whenever `darkMode` changes
    localStorage.setItem("dailyDarkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ModeContext.Provider>
  );
};
