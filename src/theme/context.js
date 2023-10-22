import { createContext, useContext } from "react";


export const ColorModeContext = createContext(
    undefined,
);

export const useColorModeContext = () => {
    const colorMode = useContext(ColorModeContext);
    if (colorMode === undefined) {
        throw new Error(
            "useColorModeContext must be used with a ColorModeContext",
        );
    }

    return colorMode;
};