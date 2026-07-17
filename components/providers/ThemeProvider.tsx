"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  isDark: boolean;
};

const ThemeContext =
  createContext<ThemeContextType>({
    isDark: false,
  });

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isDark, setIsDark] =
    useState(false);

  useEffect(() => {

    const media =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const updateTheme = () =>
      setIsDark(media.matches);

    updateTheme();

    media.addEventListener(
      "change",
      updateTheme
    );

    return () =>
      media.removeEventListener(
        "change",
        updateTheme
      );

  }, []);

  return (

    <ThemeContext.Provider
      value={{ isDark }}
    >

      {children}

    </ThemeContext.Provider>

  );

}

export function useTheme() {

  return useContext(
    ThemeContext
  );

}