import { useState, useMemo } from "react";
import { createTheme } from "@mui/material";
import { darkModePalette, lightModePalette } from "./palette";


export const colors = {
    primaryDarkTheme: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000",
    },
    primaryWhiteTheme: {
        100: "#fefefe",
        200: "#fefefe",
        300: "#fdfdfd",
        400: "#fdfdfd",
        500: "#fcfcfc",
        600: "#cacaca",
        700: "#979797",
        800: "#656565",
        900: "#323232",
    },
    secondary: {
        100: "#e5e5e5",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#969696",
        500: "#7c7c7c",
        600: "#636363",
        700: "#3c3c3c",
        800: "#232323",
        900: "#0F0E0E",
    },
    blueAccent: {
        100: "#d1ccf7",
        200: "#a399ee",
        300: "#7566e6",
        400: "#351de6 ",
        500: "#1900d5",
        600: "#1400aa",
        700: "#0f0080",
        800: "#0a0055",
        900: "#05002b",
    },

    redAccent: {
        100: "#e3cccc",
        200: "#FFA7A7",
        300: "#FC3B3B",
        400: "#903333",
        500: "#740000",
        600: "#5d0000",
        700: "#460000",
        800: "#2e0000",
        900: "#170000",
    },

    greenAccent: {
        100: "#cde3cc",
        200: "#A9FFA7",
        300: "#36D92A",
        400: "#359033",
        500: "#037400",
        600: "#025d00",
        700: "#024600",
        800: "#012e00",
        900: "#011700",
    },
};

export const themeSettings = (mode) => {
    return {
        palette: {
            mode,
            ...(mode === "light"
                ? lightModePalette(colors)
                : darkModePalette(colors)),
        },
        typography: {
            fontFamily: ["Poppins", "sans-serif"].join(","),
            fontSize: 14,
            h1: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 40,
                fontWeight: 600,
            },
            h2: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 35,
                fontWeight: 600,
            },
            h3: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 30,
                fontWeight: 500,
            },
            h4: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 25,
                fontWeight: 500,
            },
            p: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 20,
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: (theme) => {
                        return {
                            backgroundColor: `${theme.palette.primary.main}`,
                            backgroundImage: "none",
                            boxShadow: "none",
                        };
                    },
                },
            },
        },
    };
};

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        [],
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};