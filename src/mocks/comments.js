import {
  convertArrayAccordingToRequirements,
  getRandomItemFromArray,
  splitStringBySeparator,
  getRandomInteger
} from '../utils/utils';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import {AVAILABLE_EMOTIONS} from '../const';

dayjs.extend(dayjsRandom);

const COMMENT = 'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow\'s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters. Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to. Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow\'s nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits.';
const SPLITTED_COMMENT_STRING = splitStringBySeparator(COMMENT, '. ');
const COMMENTS_AUTHORS = ['David Fletcher', 'Victor Gomes', 'Ilph Serphine', 'Nicholas Dumpp', 'Visse Treat'];

export const generateFilmComments = () => {
  return {
    commentId: getRandomInteger(0, 3),
    author: getRandomItemFromArray(COMMENTS_AUTHORS),
    comment: convertArrayAccordingToRequirements(SPLITTED_COMMENT_STRING, '.', 2),
    date: dayjs.between('1970-01-01', '2021-03-02').format('DD MMMM YYYY HH:MM'),
    emotion: getRandomItemFromArray(AVAILABLE_EMOTIONS),
  };
};
