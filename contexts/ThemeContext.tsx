import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || "light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
