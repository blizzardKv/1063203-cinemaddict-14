import FilterPresenter from './presenter/filter.js';
import StatsPresenter from './presenter/stats.js';
import ProfilePresenter from './presenter/profile.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import StatisticsView from './view/statistics.js';
import { FilterType, UpdateType } from './const.js';
import Api from './api.js';
import { render, remove } from './utils/render.js';
import { makeWord } from './utils/common.js';
import Store from './store.js';
import Provider from './provider.js';

const AUTHORIZATION = `Basic ${makeWord()}`;
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';
const STORE_PREFIX = 'cinemaddict-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteMainElement = document.querySelector('.main');
const header = document.querySelector('.header');
const statistics = document.querySelector('.footer__statistics');
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();
const emptyFilmCountView = new StatisticsView(0);

const profilePresenter = new ProfilePresenter(header, filmsModel);
const filmsListPresenter = new MovieListPresenter(siteMainElement, filmsModel, filterModel, commentsModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const statsPresenter = new StatsPresenter(siteMainElement, filmsModel, profilePresenter);

const renderApi = () => {
  remove(emptyFilmCountView);
  const filmsCountView = new StatisticsView(filmsModel.get().length);
  render(statistics, filmsCountView);
  profilePresenter.init();
  filterPresenter.setMenuClickHandler(handleSiteMenuClick);
};

const handleSiteMenuClick = (filterType) => {
  switch (filterType) {
    case FilterType.STATISTICS:
      filmsListPresenter.hide();
      statsPresenter.init();
      statsPresenter.show();
      break;
    case FilterType.ALL_MOVIES:
    case FilterType.WATHCLIST:
    case FilterType.FAVORITES:
    case FilterType.HISTORY:
      filmsListPresenter.show();
      statsPresenter.hide();
      break;
  }
};

filterPresenter.init();
filmsListPresenter.init();
statsPresenter.init();
statsPresenter.hide();
render(statistics, emptyFilmCountView);

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.set(UpdateType.INIT, films);
    renderApi();
  })
  .catch(() => {
    filmsModel.set(UpdateType.INIT, []);
    renderApi();
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
