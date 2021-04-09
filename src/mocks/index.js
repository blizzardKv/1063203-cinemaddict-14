import { splitStringBySeparator,
  convertArrayAccordingToRequirements,
  getRandomItemFromArray,
  getRandomInteger,
  transpileMinutesToHour,
  getRandomBoolean
} from '../utils';

const MOSCING_TITLES = ['Shawshank Redemption', 'Green Mile', 'Lord of the Rings: The Return of the King', 'Interstellar', 'Lord of the Rings: The Fellowship of the Ring', 'Lord of the Rings: The Two Towers', 'Schindler List', 'Forrest Gump', 'Lion King', 'Back to the Future'];
const MOSCING_DESCRIPTIONS = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const MOSCING_GENRES = ['musical', 'western', 'action', 'comedy', 'drama', 'documental', 'sci-fi'];
const MOSCING_POSTERS = ['images/posters/made-for-each-other.png', 'images/posters/popeye-meets-sinbad.png', 'images/posters/sagebrush-trail.jpg', 'images/posters/santa-claus-conquers-the-martians.jpg', 'images/posters/the-dance-of-life.jpg', 'images/posters/the-great-flamarion.jpg', 'images/posters/the-man-with-the-golden-arm.jpg'];
const SPLITTED_DESCRIPTIONS_STRING = splitStringBySeparator(MOSCING_DESCRIPTIONS, '. ');
let initialId = 0;

const generateId = () => {
  return initialId++;
};

export const generateFilmMocksData = () => {
  return {
    poster: getRandomItemFromArray(MOSCING_POSTERS),
    title: getRandomItemFromArray(MOSCING_TITLES),
    rating: getRandomInteger(0, 9, true).toFixed(1),
    yearOfManufacture: getRandomInteger(1900, 2021),
    duration: transpileMinutesToHour(getRandomInteger(50, 200)),
    genre: getRandomItemFromArray(MOSCING_GENRES),
    description: convertArrayAccordingToRequirements(SPLITTED_DESCRIPTIONS_STRING),
    comments: getRandomInteger(0, 200),
    isInWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    cardId: generateId(),
  };
};

export const generateFilmPopupMocksData = () => {
  return {
    title: 'A Little Pony Without The Carpet',
    alternative_title: 'Laziness Who Sold Themselves',
    total_rating: 5.3,
    poster: 'images/posters/blue-blazes.jpg',
    age_rating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano',
    ],
    actors: [
      'Morgan Freeman',
    ],
    release: {
      'date': '2019-05-11T00:00:00.000Z',
      'release_country': 'Finland',
    },
    runtime: 77,
    genre: [
      'Comedy',
    ],
    description: convertArrayAccordingToRequirements(SPLITTED_DESCRIPTIONS_STRING),
  };
};

export const generateFilmComments = () => {
  return {
    id: '42',
    author: 'Ilya O`Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '2019-05-11T16:12:32.554Z',
    emotion: 'smile',
  };
};
