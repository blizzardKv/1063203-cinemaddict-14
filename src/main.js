import {createMenu} from './view/menu';
import {createFilmCard} from './view/filmCard';
import {createUserRank} from './view/userRank';
import {createFilmListContainer} from './view/filmListContainer';
import {createShowMoreButton} from './view/showMoreButton';
import {createExtraFilmsWrapper} from './view/extraFilmsWrapper';
import {createFooterStatistics} from './view/footerStatistics';
import {createPopup} from './view/popup';

const DEFAULT_CARDS_COUNT = 5;
const EXTRA_CARDS_COUNT = 2;

const renderComponent = (container, markup, insertPlace = 'beforeend') => {
  container.insertAdjacentHTML(insertPlace, markup);
};

const mainWrapper = document.querySelector('.main');
const header = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

renderComponent(header, createUserRank());
renderComponent(mainWrapper, createMenu());
renderComponent(mainWrapper, createFilmListContainer());

const filmsSection = mainWrapper.querySelector('.films');
const filmListWrapper = filmsSection.querySelector('.films-list__container');

const renderFilmCardMultipleTimes = () => {
  for (let i = 0; i < DEFAULT_CARDS_COUNT; i++) {
    renderComponent(filmListWrapper, createFilmCard());
  }
};

renderFilmCardMultipleTimes();

renderComponent(mainWrapper, createShowMoreButton());
renderComponent(filmsSection, createExtraFilmsWrapper('Top rated'));
renderComponent(filmsSection, createExtraFilmsWrapper('Most commented'));

const extraWrappers = mainWrapper.querySelectorAll('.films-list--extra');

extraWrappers.forEach((wrapper) => {
  const filmWrapper = wrapper.querySelector('.films-list__container');
  const renderFilmCardMultipleTimes = () => {
    for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
      renderComponent(filmWrapper, createFilmCard());
    }
  };
  renderFilmCardMultipleTimes();
});

renderComponent(footerStatistics, createFooterStatistics());

renderComponent(mainWrapper, createPopup());
