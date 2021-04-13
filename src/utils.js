import {MAX_MINUTES_IN_HOUR, MINUTES_IN_HOUR} from './const';

export const getRandomInteger = (a = 0, b = 1, notNeedToRound = false) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  if (notNeedToRound) {
    return (lower + Math.random() * (upper - lower + 1));
  }

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const splitStringBySeparator = (string, separator) => {
  return string.split(separator);
};

export const getRandomNumberOfElementsFromArray = (array, MAX_COUNT) => {
  const iterationsNumber = getRandomInteger(1, MAX_COUNT);
  const convertedArray = [];
  for (let i = 0; i < iterationsNumber; i++) {
    const elementToTranspileIndex = getRandomInteger(0, array.length - 1);
    convertedArray.push(array[elementToTranspileIndex]);
    array.slice(elementToTranspileIndex, 1);
  }

  return convertedArray;
};

export const convertArrayAccordingToRequirements = (array, joinSymbol, MAX_COUNT) => {
  const convertedArray = getRandomNumberOfElementsFromArray(array, MAX_COUNT);
  return convertedArray.join(joinSymbol);
};

export const getRandomItemFromArray = (array) => {
  const randomNumberIndex = getRandomInteger(0, array.length - 1);
  return array[randomNumberIndex];
};

export const getRandomBoolean = () => {
  return Math.random() < 0.5;
};

export const transpileMinutesToHours = (minutes) => {
  if (minutes > MAX_MINUTES_IN_HOUR) {
    return divideMinutesToHours(minutes);
  }

  return `${minutes}m`;
};

export const countWatchedFilms = (data) => {
  return data.filter((film) => film.isWatched).length;
};

export const countFavoritesFilms = (data) => {
  return data.filter((film) => film.isFavorite).length;
};

export const countAddedToWatchlistFilms = (data) => {
  return data.filter((film) => film.isInWatchlist).length;
};

export const findArrayElement = (array, id) => {
  return array.find((item) => item.cardId === parseInt(id, 10));
};

const divideMinutesToHours = (minutes) => {
  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  const remainsMinutesAfterDivision = minutes - hours * MINUTES_IN_HOUR;
  return `${hours}h ${remainsMinutesAfterDivision}m`;
};
