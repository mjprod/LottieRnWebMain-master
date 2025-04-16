const audioCache = {}; 

export const preloadAudio = (fileName) => {
    if (!audioCache[fileName]) {
        const audio = new Audio(fileName);
        audio.load();
        audioCache[fileName] = audio;
    }
};

export const playSound = (fileName) => {
    let audio = audioCache[fileName];

    if (!audio) {
      console.log('Playing sound:', fileName);

        audio = new Audio(fileName);
        audioCache[fileName] = audio;
    }
    console.log('Playing sound cached:', fileName);

    audio.currentTime = 0;
    audio.play().then(() => {
        console.log('Sound played!');
    }).catch(error => {
        console.error('Error playing sound:', error);
    });
};

export const preloadSounds = (fileNames) => {
    fileNames.forEach(fileName => {
        preloadAudio(fileName);
    });
};
