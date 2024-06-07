import React, { createContext, useState, useEffect, useContext } from "react";

interface DarkModeContextProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  setDarkMode: () => {},
});

export const DarkModeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.add("light");
      body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
