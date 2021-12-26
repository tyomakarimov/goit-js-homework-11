'use strict';
import 'regenerator-runtime/runtime';

import { getImages, getBlobData } from './api/api-helper.js';

const form = document.getElementById('search-form');
const input = document.querySelector('input');
const galleryList = document.getElementById('image-list');

form.addEventListener('submit', async event => {
  event.preventDefault();
  galleryList.innerHTML = '';
  const searchPhrase = input.value;
  const images = await getImages(searchPhrase, 1);
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
});
