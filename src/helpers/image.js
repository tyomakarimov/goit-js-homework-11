import { getBlobArray } from '../api/api-helper';

const getImagesUrls = async array => {
  const images = array.map(value => value.webformatURL);
  const blobArray = await getBlobArray(images);
  const urls = blobArray.map(value => URL.createObjectURL(value.data));
  return urls;
};

export default getImagesUrls;
