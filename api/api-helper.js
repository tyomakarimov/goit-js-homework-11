'use strict';

import axios from 'axios';

const API_URL = 'https://pixabay.com/api/?key=24986164-41561c298af901420416e8846';

export const getImages = async (searchPhrase, page = 1) => {
  const response = await axios.get(
    `${API_URL}&q=${searchPhrase}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return response.data;
};

export const getBlobData = async url => {
  const response = await axios.get(url, {
    responseType: 'blob',
  });
  const blob = response.data;
  return blob;
};
