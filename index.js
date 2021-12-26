'use strict';

import 'regenerator-runtime/runtime';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getImages, getBlobData } from './api/api-helper.js';

const form = document.getElementById('search-form');
const submitButton = document.getElementById('submit-button');
const input = document.querySelector('input');
const galleryList = document.getElementById('image-list');
const loadMoreButton = document.getElementById('load-more');
loadMoreButton.style.display = 'none';

const loadMoreButtonDetails = {
  page: 1,
};

submitButton.addEventListener('click', () => (loadMoreButtonDetails.page = 1));

const submitHandler = async event => {
  event.preventDefault();
  loadMoreButton.style.display = 'none';
  const searchPhrase = input.value;
  const images = await getImages(searchPhrase, loadMoreButtonDetails.page);
  if (loadMoreButtonDetails.page === 1) {
    galleryList.innerHTML = '';
    if (images.hits.length) Notify.success(`Hooray! We found ${images.totalHits} images.`);
    else Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } else {
    if (!images.hits.length) {
      Notify.failure(`We're sorry, but you've reached the end of search results.`);
    }
  }
  loadMoreButtonDetails.page++;
  for (const image of images.hits) {
    const blob = await getBlobData(image.webformatURL);
    const url = URL.createObjectURL(blob);
    galleryList.innerHTML += `
      <li class="image-item">
        <div class="photo-card">
          <img src="${url}" alt="${image.tags}" loading="lazy" width="369.8" height="254" />
          <div class="info">
            <div class="info-item">
              <b class="label">Likes</b>
              <p class="value">${image.likes}</p>
            </div>
            <div class="info-item">
              <b class="label">Views</b>
              <p class="value">${image.views}</p>
            </div>
            <div class="info-item">
              <b class="label">Comments</b>
              <p class="value">${image.comments}</p>
            </div>
            <div class="info-item">
              <b class="label">Downloads</b>
              <p class="value">${image.downloads}</p>
            </div>
          </div>
        </div>
      </li>
    `;
  }
  if (images.hits.length) loadMoreButton.style.display = 'block';
};

loadMoreButton.addEventListener('click', submitHandler);

form.addEventListener('submit', submitHandler);
