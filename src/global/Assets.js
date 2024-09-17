import themes from './themeConfig';

export const ThemeEnum = Object.freeze({
    EGYPT: 'egypt',
    MYTHOLOGY: 'mythology',
    INTERNATIONAL: 'international',
    COWBOY: 'cowboy',
});

export const getRandomTheme = () => {
    const themeValues = Object.values(ThemeEnum);
    const randomIndex = Math.floor(Math.random() * themeValues.length);
    return themeValues[randomIndex];
};

export let currentTheme = getRandomTheme();

// Variables for gameCenterIcon and backgroundLoop, to be updated when theme changes
let gameCenterIcon = themes[currentTheme].gameCenterIcon;
let backgroundLoop = themes[currentTheme].backgroundLoop;

export const updateCurrentTheme = () => {
    // Update the current theme
    currentTheme = getRandomTheme();

    // Reassign gameCenterIcon and backgroundLoop based on the new currentTheme
    gameCenterIcon = themes[currentTheme].gameCenterIcon;
    backgroundLoop = themes[currentTheme].backgroundLoop;
};

// Export the assets so other parts of the app can use them
export { gameCenterIcon, backgroundLoop };
