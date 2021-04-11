const countUserRank = (filmsCount) => {
  if (filmsCount >= 1 && filmsCount <= 10) {
    return 'novice';
  }

  if (filmsCount >= 11 && filmsCount <= 20) {
    return 'fan';
  }

  if (filmsCount >= 21) {
    return 'movie buff';
  }

  return '';
};

export const createUserRank = (moviesWatchedByUser) => {
  if (countUserRank(moviesWatchedByUser) === '') {
    return;
  }

  return `<section class="header__profile profile">
    <p class="profile__rating">${countUserRank(moviesWatchedByUser)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
