
import {
  maxCountWin,
  maxOtherCount,
  columns,
  maxRepeatedIcons,
} from "../global/Settings";

export const isValidIcon = (
  count,
  index,
  columnIndex,
  iconWithMaxCount,
  winLuckySymbol,
  columnIconMap,
) => {
  return (
    count < maxCountWin &&
    count < maxRepeatedIcons &&
    (iconWithMaxCount === null ||
      count < maxOtherCount ||
      index === iconWithMaxCount) &&
    !columnIconMap[columnIndex].has(index) &&
    (winLuckySymbol === false || index !== 12)
  );
};

export const generateIconsArray = (totalIcons, totalPositions, maxCombinations, winLuckySymbol) => {
  let iconCounts = Array(totalIcons).fill(0);
  let resultArray = new Array(totalPositions).fill(null);
  let iconWithMaxCount = null;
  let columnIconMap = {};
  let combinationCount = 0;

  for (let i = 0; i < totalPositions; i++) {
    if (resultArray[i] !== null) { continue; }

    let columnIndex = i % columns;
    if (!columnIconMap[columnIndex]) {
      columnIconMap[columnIndex] = new Set();
    }

    let availableIcons = iconCounts
      .map((count, index) =>
        isValidIcon(
          count,
          index,
          columnIndex,
          iconWithMaxCount,
          winLuckySymbol,
          columnIconMap,
        )
          ? index
          : null,
      )
      .filter((index) => index !== null);

    if (availableIcons.length === 0) {
      break;
    }

    let selectedIcon;
    if (combinationCount < maxCombinations) {
      selectedIcon =
        availableIcons[Math.floor(Math.random() * availableIcons.length)];

      if (iconCounts[selectedIcon] === 2) {
        combinationCount++;
      }
    } else {
      let filteredIcons = availableIcons.filter(
        (icon) => iconCounts[icon] < 2,
      );

      if (filteredIcons.length > 0) {
        selectedIcon =
          filteredIcons[Math.floor(Math.random() * filteredIcons.length)];
      } else {
        selectedIcon =
          availableIcons[Math.floor(Math.random() * availableIcons.length)];
      }
    }

    resultArray[i] = selectedIcon;
    iconCounts[selectedIcon]++;
    columnIconMap[columnIndex].add(selectedIcon);

    if (iconCounts[selectedIcon] === maxCountWin) {
      iconWithMaxCount = selectedIcon;
    }
  }

  return resultArray;
};

export const findBoobleColor = (arr) => {
  const colors = [
    { color: "Blue", animation: "lottieScratchieBubbleBlue" },
    { color: "Green", animation: "lottieScratchieBubbleGreen" },
    { color: "Pink", animation: "lottieScratchieBubblePink" },
    { color: "Orange", animation: "lottieScratchieBubbleOrange" },
  ];

  let counter = {};
  let colorMap = {};
  let animationMap = {};
  let colorIndex = 0;

  arr.forEach((num) => {
    if (counter[num]) {
      counter[num]++;
    } else {
      counter[num] = 1;
    }
  });

  Object.keys(counter).filter((num) => {
    if (counter[num] === 3) {
      colorMap[num] = colors[colorIndex].color;
      animationMap[num] = colors[colorIndex].animation;
      colorIndex = (colorIndex + 1) % colors.length;
    }
  });

  const animationArray = arr.map((num) => {
    return animationMap[num] || null;
  });

  return animationArray;
};

export const checkWinCondition = (array, totalIcons) => {
  const iconCounts = Array(totalIcons).fill(0);
  array.forEach((icon) => {
    if (icon !== null) {
      iconCounts[icon]++;
    }
  });

  const winners = [];
  iconCounts.forEach((count, index) => {
    if (count === maxCountWin) {
      winners.push(index);
    }
  });
  return winners;
};