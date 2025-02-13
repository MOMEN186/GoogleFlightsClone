import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

const ThemeContext = createContext();
const cookies = new Cookies(); 
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#ffffff" },
    background: { default: "white", paper: "white" },
    text: { primary: "#000000" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    background: { default: "#121212", paper: "#1e1e1e" },
  },
});

export function ThemeProviderWrapper({ children }) {
  const storedTheme = cookies.get("mode"); // ✅ Use the cookies instance
  const [mode, setMode] = useState(storedTheme === "dark" ? "dark" : "light");

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    cookies.set("mode", newMode, { path: "/", expires: new Date(2147483647 * 1000) }); // ✅ Save it globally
  };

  // useEffect(() => {
  //   console.log("Theme changed:", mode);
  // }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
