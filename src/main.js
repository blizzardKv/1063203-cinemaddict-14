import {createSiteMenuTemplate} from './view/menu';
import {createFilmCard} from './view/filmCard';
import {createUserRank} from './view/userRank';
import {createFilmListContainer} from './view/filmListContainer';
import {createShowMoreButton} from './view/showMoreButton';
import {createExtraFilmsWrapper} from './view/extraFilmsWrapper';
import {createFooterStatistics} from './view/footerStatistics';
import {createPopup} from './view/popup';

const renderComponent = (container, markup, insertPlace = 'beforeend') => {
  container.insertAdjacentHTML(insertPlace, markup);
};

const mainWrapper = document.querySelector('.main');
const header = document.querySelector('.header');

const DEFAULT_CARDS_COUNT = 5;

renderComponent(header, createUserRank());
renderComponent(mainWrapper, createSiteMenuTemplate());

renderComponent(mainWrapper, createFilmListContainer());

const filmListWrapper = document.querySelector('.films-list__container');
const filmsSection = document.querySelector('.films');

for (let i = 0; i < DEFAULT_CARDS_COUNT; i++) {
  renderComponent(filmListWrapper, createFilmCard());
}

renderComponent(mainWrapper, createShowMoreButton());
renderComponent(filmsSection, createExtraFilmsWrapper('Top rated'));
renderComponent(filmsSection, createExtraFilmsWrapper('Most commented'));

const extraWrappers = document.querySelectorAll('.films-list--extra');
const EXTRA_CARDS_COUNT = 2;

extraWrappers.forEach((wrapper) => {
  const filmWrapper = wrapper.querySelector('.films-list__container');
  for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
    renderComponent(filmWrapper, createFilmCard());
  }
});

const footerStatistics = document.querySelector('.footer__statistics');

renderComponent(footerStatistics, createFooterStatistics());

// должен рендерится динамически.
renderComponent(mainWrapper, createPopup());
