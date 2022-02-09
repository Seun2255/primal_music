import { async } from "@firebase/util";
import urls from "../../config";

const search = async (query) => {
  const url = urls.search + query;
  const response = await fetch(url);
  const results = await response.json();
  console.log(results);
  return results.data;
};

const getTracks = async () => {
  const url = urls.tracks;
  const response = await fetch(url);
  const results = await response.json();
  return results.data;
};

const getAlbums = async () => {
  const url = urls.albums;
  const response = await fetch(url);
  const results = await response.json();
  return results.data;
};

const deezerAPI = { search: search, tracks: getTracks, albums: getAlbums };

export default deezerAPI;
