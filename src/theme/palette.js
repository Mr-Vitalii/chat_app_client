
export const darkModePalette = (colors) => {
    return {
        primary: {
            main: colors.primaryDarkTheme[500],
        },
        secondary: {
            main: colors.secondary[500],
        },
        neutral: {
            main: colors.secondary[700],
            dark: colors.secondary[800],
            darker: colors.secondary[900],
        },
        borderColor: {
            main: colors.secondary[700],
        },
        background: {
            default: colors.secondary[900],
            paper: colors.primaryDarkTheme[500],
        },
        secondaryBackground: {
            main: colors.secondary[800],
        },
    };
};

export const lightModePalette = (colors) => {
    return {
        primary: {
            main: colors.primaryWhiteTheme[500],
        },
        secondary: {
            main: colors.secondary[500],
        },
        neutral: {
            main: colors.secondary[700],
            dark: colors.secondary[800],
            darker: colors.secondary[900],
        },
        borderColor: {
            main: colors.secondary[200],
        },
        background: {
            default: colors.secondary[100],
            paper: colors.primaryWhiteTheme[500],
        },
        secondaryBackground: {
            main: colors.primaryWhiteTheme[500],
        },
    };
};