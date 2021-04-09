const MAX_MINUTES_IN_HOUR = 59;
const MINUTES_IN_HOUR = 60;

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

export const convertArrayAccordingToRequirements = (array) => {
  const iterationsNumber = getRandomInteger(1, 5);
  const convertedArray = [];
  for (let i = 0; i < iterationsNumber; i++) {
    const elementToTranspileIndex = getRandomInteger(0, array.length - 1);
    convertedArray.push(array[elementToTranspileIndex]);
    array.slice(elementToTranspileIndex, 1);
  }
  return convertedArray.join('.');
};

export const getRandomItemFromArray = (array) => {
  const randomNumberIndex = getRandomInteger(0, array.length - 1);
  return array[randomNumberIndex];
};

export const getRandomBoolean = () => {
  return Math.random() < 0.5;
};

export const transpileMinutesToHour = (minutes) => {
  if (minutes > MAX_MINUTES_IN_HOUR) {
    return minutesDivisionToHours(minutes);
  }

  return `${minutes}m`;
};

const minutesDivisionToHours = (minutes) => {
  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  const remainsMinutesAfterDivision = minutes - hours * MINUTES_IN_HOUR;
  return `${hours}h ${remainsMinutesAfterDivision}m`;
};
