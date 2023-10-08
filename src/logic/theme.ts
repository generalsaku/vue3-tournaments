type theme = { [key: string]: string }

const themes: Record<string, theme> = {
    light: {
        '--color-bg-1': '#648880',
        '--color-bg-2': '#35465f',
        '--color-ternary': '#607c85'
    },
    dark: {
        '--color-bg-1': '#333333',
        '--color-bg-2': '#252526',
        '--color-ternary': '#252526'
    }
}

const darkThemeKey = "is-dark-theme"

export const isDarkTheme = () => {
    return window.localStorage.getItem(darkThemeKey) === "true";
}

export const toggleToDarkTheme = () => {
    window.localStorage.setItem(darkThemeKey, "true");
    setDarkTheme();
}

export const toggleToLightTheme = () => {
    window.localStorage.removeItem(darkThemeKey);
    setLightTheme();
}

export const setDarkTheme = () => setTheme(themes.dark);
export const setLightTheme = () => setTheme(themes.light);

const setTheme = (theme: theme) => {
    for (const propName of Object.keys(theme)) {
        document.documentElement.style.setProperty(propName, theme[propName]);
    }
}

