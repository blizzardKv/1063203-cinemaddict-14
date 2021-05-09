import FooterStatisticsView from './view/footer-statistics';
import {generateFilmMocksData} from './mocks/film';
import {render, RenderPosition} from './utils/render';
import MoviesListPresenter from './presenter/movies-list';

const MAX_CARDS_COUNT = 20;
const filmCards = new Array(MAX_CARDS_COUNT).fill().map(generateFilmMocksData);
const footerStatistics = document.querySelector('.footer__statistics');

render(footerStatistics, new FooterStatisticsView(MAX_CARDS_COUNT).getElement(), RenderPosition.BEFOREEND);
new MoviesListPresenter(filmCards).init();
