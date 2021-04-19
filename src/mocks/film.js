import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import { splitStringBySeparator,
  convertArrayAccordingToRequirements,
  getRandomItemFromArray,
  getRandomInteger,
  transpileMinutesToHours,
  getRandomBoolean,
  getRandomNumberOfElementsFromArray
} from '../utils';

dayjs.extend(dayjsRandom);

const TITLES = ['Shawshank Redemption', 'Green Mile', 'Lord of the Rings: The Return of the King', 'Interstellar', 'Lord of the Rings: The Fellowship of the Ring', 'Lord of the Rings: The Two Towers', 'Schindler List', 'Forrest Gump', 'Lion King', 'Back to the Future'];
const DESCRIPTIONS = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const GENRES = ['musical', 'western', 'action', 'comedy', 'drama', 'documental', 'sci-fi'];
const POSTERS = ['images/posters/made-for-each-other.png', 'images/posters/popeye-meets-sinbad.png', 'images/posters/sagebrush-trail.jpg', 'images/posters/santa-claus-conquers-the-martians.jpg', 'images/posters/the-dance-of-life.jpg', 'images/posters/the-great-flamarion.jpg', 'images/posters/the-man-with-the-golden-arm.jpg'];
const WRITERS = ['Djoele Cohen', 'Fransis Ford Coppola', 'Charlie Caufmann', 'Woody Allen', 'Nora Effron', 'Oliver Stone', 'George Lukas'];
const ACTORS = ['Alan Rickman', 'Benedict Cumberbatch', 'Benicio del Toro', ' Vincent Cassel', 'Viggo Mortensen', 'James McAvoy', 'Jake Gyllenhaal', 'Daniel Day-Lewis'];
const COUNTRIES = ['Russia', 'USA', 'France', 'Germany', 'England', 'Wales', 'Denmark'];
const DIRECTORS = ['James Cameron', 'Peter Jackson', 'Cristopher Nolan', 'Steven Splielberg', 'Quentin Tarantino', 'Guy Ritchie', 'David Fincher'];
const SPLITTED_DESCRIPTIONS_STRING = splitStringBySeparator(DESCRIPTIONS, '. ');
let initialId = 0;

const generateId = () => {
  return initialId++;
};

export const generateFilmMocksData = () => {
  return {
    poster: getRandomItemFromArray(POSTERS),
    title: getRandomItemFromArray(TITLES),
    rating: getRandomInteger(0, 9, true).toFixed(1),
    yearOfManufacture: getRandomInteger(1900, 2021),
    duration: transpileMinutesToHours(getRandomInteger(50, 200)),
    genres: getRandomNumberOfElementsFromArray(GENRES, 3),
    description: convertArrayAccordingToRequirements(SPLITTED_DESCRIPTIONS_STRING, '.', 5),
    comments: getRandomInteger(0, 200),
    isInWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    cardId: generateId(),
    alternativeTitle: getRandomItemFromArray(TITLES),
    ageRating: getRandomInteger(0, 18),
    releaseDate: dayjs.between('1970-01-01', '2021-03-02').format('DD MMMM YYYY'),
    director: getRandomItemFromArray(DIRECTORS),
    writers: convertArrayAccordingToRequirements(WRITERS, ', ', 4),
    actors: convertArrayAccordingToRequirements(ACTORS, ', ', 2),
    country: getRandomItemFromArray(COUNTRIES),
  };
};
