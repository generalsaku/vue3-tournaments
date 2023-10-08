type theme = { [key: string]: string }

const themes: Record<string, theme> = {
    light: {
        '--color-primary': '#648880',
        '--color-ternary': '#607c85',
        '--color-bg-1': '#648880',
        '--color-bg-2': '#35465f',
        '--color-shadow': 'rgba(0,0,0,0.2)'
    },
    dark: {
        '--color-primary': '#ffffff80',
        '--color-ternary': '#ffffff12',
        '--color-bg-1': '#252526',
        '--color-bg-2': '#041323',
        '--color-shadow': 'rgba(0,0,0,0.2)'
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

