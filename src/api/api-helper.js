'use strict';

import axios from 'axios';

import { API_URL, PER_PAGE } from '../constants';

export const getImages = async (searchPhrase, page = 1) => {
  const response = await axios.get(
    `${API_URL}&q=${searchPhrase}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`
  );
  return response.data;
};
