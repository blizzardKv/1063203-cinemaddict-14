export const createComments = (data) => {
  return `<h3 class="film-details__comments-title">Comments
        <span class="film-details__comments-count">12</span>
        </h3>
        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${data.emotion}.png" width="55" height="55" alt="emoji-${data.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${data.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${data.author}</span>
                <span class="film-details__comment-day">${data.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>`;
};
