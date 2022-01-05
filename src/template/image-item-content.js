const getImageItemContent = details => {
  const { webformatURL, tags, likes, views, comments, downloads } = details;
  return `
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="369.8" height="254" />
      <div class="info">
        <div class="info-item">
          <b class="label">Likes</b>
          <p class="value">${likes}</p>
        </div>
        <div class="info-item">
          <b class="label">Views</b>
          <p class="value">${views}</p>
        </div>
        <div class="info-item">
          <b class="label">Comments</b>
          <p class="value">${comments}</p>
        </div>
        <div class="info-item">
          <b class="label">Downloads</b>
          <p class="value">${downloads}</p>
        </div>
      </div>
    </div>
  `;
};

export default getImageItemContent;
