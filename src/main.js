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

// четыре операнда, наверно, слишком много для функции.
const renderComponentCyclically = (iterationNumber, container, markup, insertPlace = 'beforeend') => {
  for (let i = 0; i < iterationNumber; i++) {
    renderComponent(container, markup, insertPlace);
  }
};

const mainWrapper = document.querySelector('.main');
const header = document.querySelector('.header');
const filmsSection = mainWrapper.querySelector('.films');
const filmListWrapper = filmsSection.querySelector('.films-list__container');
const footerStatistics = document.querySelector('.footer__statistics');

const DEFAULT_CARDS_COUNT = 5;
const EXTRA_CARDS_COUNT = 2;

renderComponent(header, createUserRank());
renderComponent(mainWrapper, createSiteMenuTemplate());
renderComponent(mainWrapper, createFilmListContainer());

renderComponentCyclically(DEFAULT_CARDS_COUNT, filmListWrapper, createFilmCard());

renderComponent(mainWrapper, createShowMoreButton());
renderComponent(filmsSection, createExtraFilmsWrapper('Top rated'));
renderComponent(filmsSection, createExtraFilmsWrapper('Most commented'));

// зависимый выбор селекторов, т.к. появляется возможность выбрать только после рендера компонентов с разметкой createExtraFilmsWrapper.
// можно рендерить сразу и обертки, и карточку - добавить опциональный аргумент для createFilmCard().
const extraWrappers = mainWrapper.querySelectorAll('.films-list--extra');

extraWrappers.forEach((wrapper) => {
  const filmWrapper = wrapper.querySelector('.films-list__container');
  renderComponentCyclically(filmWrapper, EXTRA_CARDS_COUNT);
});

renderComponent(footerStatistics, createFooterStatistics());

// должен рендерится динамически.
renderComponent(mainWrapper, createPopup());
