import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import themes from '../global/themeConfig';
import { numberOfCards } from '../global/Settings';
 
// Enum for different themes
export const ThemeEnum = Object.freeze({
    EGYPT: 'egypt',
    MYTHOLOGY: 'mythology',
    INTERNATIONAL: 'international',
    COWBOY: 'cowboy',
});

// Function to get a random theme from the ThemeEnum
const getRandomTheme = () => {
    const themeValues = Object.values(ThemeEnum);
    const randomIndex = Math.floor(Math.random() * themeValues.length);
    return themeValues[randomIndex];
};

// Function to get an array of random themes (for example, 10 cards)
const getRandomThemesArray = (numberOfCards) => {
    return Array.from({ length: numberOfCards }, () => getRandomTheme());
};

// Creating the theme context
const ThemeContext = createContext();

// The ThemeProvider component will manage and provide the theme data to its children
export const ThemeProvider = ({ children }) => {
    // State to keep track of the current theme sequence (array of themes)
    const [themeSequence, setThemeSequence] = useState(getRandomThemesArray(numberOfCards));
    //const [currentThemeSequence, setCurrentThemeSequence] = useState();

      // Log the themeSequence every time it changes
      useEffect(() => {
        console.log('Current themeSequence:', themeSequence);
    }, [themeSequence]); // This will log the themeSequence whenever it changes

    // State to track the current theme (by index)
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

    // Initialize gameCenterIcon and backgroundLoop based on the current theme
    const [gameCenterIcon, setGameCenterIcon] = useState(themes[themeSequence[currentThemeIndex]].gameCenterIcon);
    const [backgroundLoop, setBackgroundLoop] = useState(themes[themeSequence[currentThemeIndex]].backgroundLoop);
    const [backgroundScratchCard, setBackgroundScratchCard] = useState(themes[themeSequence[currentThemeIndex]].backgroundScratchCard);
    const [introChromeTheme, setIntroChromeTheme] = useState(themes[themeSequence[currentThemeIndex]].intro_chrome);
    const [introTheme, setIntroTheme] = useState(themes[themeSequence[currentThemeIndex]].intro);

    // Function to update the sequence of themes dynamically
    const updateThemeSequence = (numberOfCards) => {
        console.log(`Updating theme sequence with ${numberOfCards} cards`);
        const newThemeSequence = getRandomThemesArray(numberOfCards);
        setThemeSequence(newThemeSequence);
        setCurrentThemeIndex(0); // Reset to the first theme when the sequence is updated
    };

    // Function to set the current theme by index
    const setCurrentThemeByIndex = (index) => {
        if (index >= 0 && index < themeSequence.length) {
            setCurrentThemeIndex(index);
        } else {
            console.error("Invalid theme index");
        }
    };

    // Function to go to the next theme
    const goToNextTheme = () => {
        console.log("Going to the next theme");
        if (currentThemeIndex < themeSequence.length - 1) {
            setCurrentThemeIndex(currentThemeIndex + 1);
            console.log(`New theme index: ${currentThemeIndex + 1}`);
        } else {
            console.log("You are already on the last theme");
        }
    };

    // This effect runs every time the themeSequence or currentThemeIndex changes.
    // It updates the gameCenterIcon and backgroundLoop based on the current theme.
    useEffect(() => {
        if (themeSequence.length > 0) {
            setGameCenterIcon(themes[themeSequence[currentThemeIndex]].gameCenterIcon);
            setBackgroundLoop(themes[themeSequence[currentThemeIndex]].backgroundLoop);
            //setCurrentThemeSequence(themeSequence[currentThemeIndex]);
            setBackgroundScratchCard(themes[themeSequence[currentThemeIndex]].backgroundScratchCard);
            setIntroChromeTheme(themes[themeSequence[currentThemeIndex]].intro_chrome);
            setIntroTheme(themes[themeSequence[currentThemeIndex]].intro);
        }
    }, [currentThemeIndex, themeSequence]); // The effect depends on currentThemeIndex and themeSequence

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        themeSequence,
        currentTheme: themeSequence[currentThemeIndex], // Current theme from the sequence
        gameCenterIcon, // Current game center icon
        backgroundLoop, // Current background loop
        backgroundScratchCard,
        introChromeTheme,
        introTheme,
        introThemeNext: (currentThemeIndex + 1 < themeSequence.length) 
            ? themes[themeSequence[currentThemeIndex + 1]].intro_default 
            : null,
        introChromeThemeNext: (currentThemeIndex + 1 < themeSequence.length) 
            ? themes[themeSequence[currentThemeIndex + 1]].intro_chrome 
            : null,
        updateThemeSequence,
        setCurrentThemeByIndex,  // Function to change the current theme by index
        goToNextTheme,           // Function to go to the next theme
        currentThemeIndex         // Expose the current theme index
    }), [themeSequence, currentThemeIndex, gameCenterIcon, backgroundLoop, backgroundScratchCard, introChromeTheme, introTheme]);

    // The ThemeContext.Provider provides the current theme, sequence, assets, and update functions to all children
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to consume the ThemeContext
export const useTheme = () => {
    const context = useContext(ThemeContext);

    // If useTheme is used outside of ThemeProvider, throw an error
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
